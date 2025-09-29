import { EmailClient } from "@azure/communication-email";
import {
  DefaultAzureCredential,
  ManagedIdentityCredential,
} from "@azure/identity";
import azureResources from "infra";

const emailClientFactory = async () => {
  const credential =
    process.env.NODE_ENV === "production"
      ? new ManagedIdentityCredential(process.env["MSI"])
      : new DefaultAzureCredential();

  return new EmailClient(
    `https://${azureResources.communicationServicesName}.communication.azure.com`,
    credential
  );
};

export default emailClientFactory;
