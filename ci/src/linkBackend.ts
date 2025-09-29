import azureResources from "infra";
import exec from "exec";

const run = async () => {
  console.log("linking backend...");
  const pullRequestId = process.env[
    "SYSTEM_PULLREQUEST_PULLREQUESTID"
  ] as string;
  console.log("pull request id", pullRequestId);

  const backendID = `/subscriptions/${azureResources.subscriptionId}/resourceGroups/${azureResources.resourceGroupName}/providers/Microsoft.Web/sites/${azureResources.functionAppName}/slots/${pullRequestId}`;
  console.log("backend id", backendID);
  await exec(
    `az staticwebapp backends link --name ${azureResources.staticWebAppName} --resource-group ${azureResources.resourceGroupName} --environment-name ${pullRequestId} --backend-resource-id ${backendID} --backend-region eastus2`
  );
};

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("exiting with error", error);
    process.exit(1);
  });
