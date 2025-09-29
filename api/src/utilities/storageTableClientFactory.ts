import { TableClient } from "@azure/data-tables";
import {
  DefaultAzureCredential,
  ManagedIdentityCredential,
} from "@azure/identity";
import azureResources from "infra";

const storageTableClientFactory = async () => {
  console.log(
    `Managed identity ${azureResources.userManagedIdentityClientId} connecting to https://${azureResources.storageAccountName}.table.core.windows.net`
  );
  const credential =
    process.env.NODE_ENV === "production"
      ? new ManagedIdentityCredential(process.env["MSI"])
      : new DefaultAzureCredential();

  const tableName = "outBox";

  return new TableClient(
    `https://${azureResources.storageAccountName}.table.core.windows.net`,
    tableName,
    credential
  );
};

export default storageTableClientFactory;
