import { getPersonalAccessTokenHandler, WebApi } from "azure-devops-node-api";
import {
  GitPullRequest,
  PullRequestStatus,
} from "azure-devops-node-api/interfaces/GitInterfaces";
import azureResources from "infra";
import exec from "exec";
import getStaticWebAppSlots from "./getStaticWebAppSlots";
import getFunctionSlots from "./getFunctionSlots";

const azureDevOpsOrganizationURL = process.env[
  "SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"
] as string;
const azureDevOpsProjectName = process.env["SYSTEM_TEAMPROJECT"] as string;
const azureDevOpsPersonalAccessToken = process.env[
  "SYSTEM_ACCESSTOKEN"
] as string;
const repositoryID = process.env["BUILD_REPOSITORY_ID"] as string;

const getFunctionSlotServicePrincipalId = async (
  stalePullRequest: GitPullRequest
): Promise<null | string> => {
  const { stdout } = await exec(
    `az ad sp list --display-name ${azureResources.functionAppName}`
  );
  const applications = JSON.parse(stdout);
  const application = applications.find(
    (app: any) =>
      app.displayName ===
      `${azureResources.functionAppName}/slots/${stalePullRequest.pullRequestId}`
  );
  return application ? application.objectId : null;
};

const getRoleAssignmentIdsFrom = async (
  servicePrincipalId: string
): Promise<string[]> => {
  const { stdout } = await exec(
    `az role assignment list --assignee "${servicePrincipalId}" --all`
  );
  const roleAssignments = JSON.parse(stdout);
  return roleAssignments.map((roleAssignment: any) => roleAssignment.id);
};

const removeStaticAppSlot = (stalePullRequest: GitPullRequest) =>
  exec(
    `az staticwebapp environment delete --name ${azureResources.staticWebAppName} --subscription ${azureResources.subscriptionId} --environment-name ${stalePullRequest.pullRequestId} --yes`
  );

const removeFunctionSlot = async (stalePullRequest: GitPullRequest) => {
  // const servicePrincipalId = await getFunctionSlotServicePrincipalId(
  //   stalePullRequest
  // );
  // if (!servicePrincipalId) return;
  // const roleAssignmentIds = await getRoleAssignmentIdsFrom(servicePrincipalId);
  // console.log(`az role assignment delete --ids ${roleAssignmentIds.join(",")}`);
  // await exec(`az role assignment delete --ids ${roleAssignmentIds.join(",")}`);
  return exec(
    `az functionapp  deployment slot delete --name ${azureResources.functionAppName} --resource-group ${azureResources.resourceGroupName} --slot ${stalePullRequest.pullRequestId}`
  );
};

const getStaleStaticWebAppSlots = async (
  stalePullRequests: GitPullRequest[]
) => {
  let staticWebAppSlots: {
    name: string;
  }[] = [];
  try {
    staticWebAppSlots = await getStaticWebAppSlots();
  } catch {}
  return stalePullRequests.filter((pullRequest) =>
    staticWebAppSlots.some(
      (slot) => `${pullRequest.pullRequestId}` === slot.name
    )
  );
};

const getStaleFunctionAppSlots = async (
  stalePullRequests: GitPullRequest[]
) => {
  let functionAppSlots: {
    id: string;
    name: string;
  }[] = [];

  try {
    functionAppSlots = await getFunctionSlots();
  } catch {}

  return stalePullRequests.filter((pullRequest) =>
    functionAppSlots.some(
      (slot) => `${pullRequest.pullRequestId}` === slot.name
    )
  );
};

const run = async () => {
  console.log(
    `Cleanup outdated deployments`,
    azureDevOpsOrganizationURL,
    azureDevOpsProjectName,
    repositoryID,
    azureResources.staticWebAppName
  );

  const authHandler = getPersonalAccessTokenHandler(
    azureDevOpsPersonalAccessToken
  );
  const connection = new WebApi(azureDevOpsOrganizationURL, authHandler);

  await connection.connect();

  const gitApi = await connection.getGitApi(
    `${azureDevOpsOrganizationURL}/${azureDevOpsProjectName}`
  );

  const [completedPullRequests, abandonedPullRequests] = await Promise.all([
    gitApi.getPullRequests(repositoryID, {
      status: PullRequestStatus.Completed,
    }),
    gitApi.getPullRequests(repositoryID, {
      status: PullRequestStatus.Abandoned,
    }),
  ]);

  const stalePullRequests = [
    ...completedPullRequests,
    ...abandonedPullRequests,
  ];

  console.log(
    "completed pull requests",
    JSON.stringify(stalePullRequests, null, 2)
  );

  const staleStaticWebAppSlots = await getStaleStaticWebAppSlots(
    stalePullRequests
  );
  console.log("staleStaticWebAppSlots", staleStaticWebAppSlots);
  const staleFunctionAppSlots = await getStaleFunctionAppSlots(
    stalePullRequests
  );
  console.log("staleFunctionAppSlots", staleFunctionAppSlots);

  const promises = await Promise.allSettled([
    ...staleStaticWebAppSlots.map(removeStaticAppSlot),
    ...staleFunctionAppSlots.map(removeFunctionSlot),
  ]);

  const rejectionReasons = promises
    .map((promise) => promise.status === "rejected" && promise.reason)
    .filter((reason) => reason);

  rejectionReasons.forEach(console.log);
  if (rejectionReasons.length > 0) {
    throw new Error("Failed to clean up resources");
  }
};

run()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
