import azureResources from "infra";
import path from "path";
import exec from "exec";
import getFunctionSlots from "./getFunctionSlots";

async function run(): Promise<void> {
  const repositoryRoot = process.env[
    "SYSTEM_DEFAULTWORKINGDIRECTORY"
  ] as string;
  const pullRequestId = process.env["SYSTEM_PULLREQUEST_PULLREQUESTID"];
  const ephemeralEnvironmentURL = process.env["EPHEMERAL_ENVIRONMENT_URL"];
  const slotName = pullRequestId || "fallback";

  const functionApps = await getFunctionSlots();

  console.log(JSON.stringify(functionApps, null, 2));

  const exists = functionApps.some(
    (functionApp) => functionApp.name === azureResources.functionAppName
  );

  if (exists) return;

  await exec(
    `az functionapp config appsettings list --name ${azureResources.functionAppName} --resource-group ${azureResources.resourceGroupName} --output json > ./appsettings.json`
  );
  const templatePath = path.resolve(
    repositoryRoot,
    "infra",
    "src",
    "createFunctionAppDeploymentSlot.bicep"
  );
  console.log("arm file paths", templatePath);
  const params = Object.entries({
    functionAppName: azureResources.functionAppName,
    deploymentSlotName: pullRequestId,
    location: azureResources.location,
    storageAccountName: azureResources.storageAccountName,
    appServicePlanName: azureResources.appServicePlanName,
    serviceBusNamespace: azureResources.serviceBusNamespace,
    keyVaultName: azureResources.keyVaultName,
    communicationServicesName: azureResources.communicationServicesName,
  }).reduce(
    (params, [name, value]) => `${params} ${name}=${value}`,
    "--parameters "
  );
  await exec(
    `az deployment group create --resource-group ${azureResources.resourceGroupName} --template-file ${templatePath} ${params}`
  );
  await exec(
    `az functionapp config appsettings set --name ${azureResources.functionAppName} --resource-group ${azureResources.resourceGroupName} --slot ${slotName} --settings @appsettings.json`
  );
  await exec(
    `az functionapp config appsettings set --name ${azureResources.functionAppName} --resource-group ${azureResources.resourceGroupName} --slot ${slotName} --settings "WEB_ORIGIN=${ephemeralEnvironmentURL}"`
  );
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
