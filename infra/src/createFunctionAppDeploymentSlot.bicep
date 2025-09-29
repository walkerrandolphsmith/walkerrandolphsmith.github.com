param functionAppName string
param deploymentSlotName string
param location string
param storageAccountName string
param appServicePlanName string
param communicationServicesName string

module appServivePlanModule './appServicePlan.bicep' = {
  name: 'app_service_plan_module'
  params: {
    location: location
    appServicePlanName: appServicePlanName
  }
}

resource functionAppDeploymentSlotResource 'Microsoft.Web/sites/slots@2021-02-01' = {
  name: '${functionAppName}/${deploymentSlotName}'
  location: location
  properties: {
    serverFarmId: appServivePlanModule.outputs.id
  }
  identity: {
    type: 'SystemAssigned'
  }
}

module assignRolesToAzureFunctionApp './roleAssignments/assignRolesToAzureFunctionApp.bicep' = {
  name: 'assignRolesToAzureFunctionApp'
  scope: resourceGroup()
  params: {
    communicationServicesName: communicationServicesName
    storageAccountName: storageAccountName
    principalId: functionAppDeploymentSlotResource.identity.principalId
  }
}
