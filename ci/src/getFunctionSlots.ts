import azureResources from "infra";
import exec from "exec";

const getFunctionSlots = async (): Promise<
  {
    id: string;
    name: string;
  }[]
> => {
  const { stdout } = await exec(
    `az functionapp deployment slot list --name ${azureResources.functionAppName} --resource-group ${azureResources.resourceGroupName}`,
    false
  );

  return JSON.parse(stdout);
};

export default getFunctionSlots;
