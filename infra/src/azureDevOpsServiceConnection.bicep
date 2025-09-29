param storageAccountName string

resource azureDevOpsConnectionServicePrinipalResource 'Microsoft.AzureAD/servicePrincipals@2021-08-01' = {
  name: guid('azure-dev-ops-connector')
  location: 'global'
  properties: {
    displayName: 'azure-dev-ops-connector'
  }
}

module assignBlobStorageDataOwnerRoleToAzureFunctionApp './roleAssignments/assignBlobStorageDataOwnerRoleToAzureFunctionApp.bicep' = {
  name: 'assignBlobStorageDataOwnerRoleToAzureFunctionApp'
  scope: resourceGroup()
  params: {
    storageAccountName: storageAccountName
    principalId: azureDevOpsConnectionServicePrinipalResource.identity.principalId
  }
}

module assignTableStorageDataContributorRoleToAzureFunctionApp './roleAssignments/assignTableStorageDataContributorRoleToAzureFunctionApp.bicep' = {
  name: 'assignTableStorageDataContributorRoleToAzureFunctionApp'
  scope: resourceGroup()
  params: {
    storageAccountName: storageAccountName
    principalId: azureDevOpsConnectionServicePrinipalResource.identity.principalId
  }
}
