import { getPersonalAccessTokenHandler, WebApi } from "azure-devops-node-api";
import {
  CommentThreadStatus,
  CommentType,
} from "azure-devops-node-api/interfaces/GitInterfaces";

const azureDevOpsOrganizationURL = process.env[
  "SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"
] as string;
const azureDevOpsProjectName = process.env["SYSTEM_TEAMPROJECT"] as string;
const azureDevOpsPersonalAccessToken = process.env[
  "SYSTEM_ACCESSTOKEN"
] as string;
const pullRequestId = process.env["SYSTEM_PULLREQUEST_PULLREQUESTID"] as string;
const repositoryID = process.env["BUILD_REPOSITORY_ID"] as string;
const ephemeralEnvironmentUrl = process.env[
  "EPHEMERAL_ENVIRONMENT_URL"
] as string;

const run = async () => {
  console.log(
    `Post Link`,
    JSON.stringify(
      {
        azureDevOpsOrganizationURL,
        azureDevOpsProjectName,
        repositoryID,
        pullRequestId,
        pullRequestIdInt: parseInt(pullRequestId),
        ephemeralEnvironmentUrl,
      },
      null,
      2
    )
  );

  const authHandler = getPersonalAccessTokenHandler(
    azureDevOpsPersonalAccessToken
  );
  const connection = new WebApi(azureDevOpsOrganizationURL, authHandler);

  await connection.connect();

  const gitApi = await connection.getGitApi(
    `${azureDevOpsOrganizationURL}/${azureDevOpsProjectName}`
  );

  await gitApi.createThread(
    {
      status: CommentThreadStatus.Closed,
      comments: [
        {
          parentCommentId: 0,
          commentType: CommentType.System,
          content: `Created ephemeral environment for PR ${ephemeralEnvironmentUrl}`,
        },
      ],
    },
    repositoryID,
    parseInt(pullRequestId),
    azureDevOpsProjectName
  );

  console.log("Outdated deployments cleared!");
};

run()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
