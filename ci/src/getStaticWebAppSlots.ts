import azureResources from "infra";
import exec from "exec";

const getStaticWebAppSlots = async (): Promise<
  { name: string; sourceBranch: string; hostname: string }[]
> => {
  const { stdout } = await exec(
    `az staticwebapp environment list --name ${azureResources.staticWebAppName} --subscription ${azureResources.subscriptionId}`
  );

  return JSON.parse(stdout);
};

export default getStaticWebAppSlots;
