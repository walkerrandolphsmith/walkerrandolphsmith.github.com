param principalId string
param storageAccountName string
param communicationServicesName string

module assignBlobStorageDataOwnerRoleToAzureFunctionApp './assignBlobStorageDataOwnerRoleToAzureFunctionApp.bicep' = {
  name: 'assignBlobStorageDataOwnerRoleToAzureFunctionApp'
  scope: resourceGroup()
  params: {
    storageAccountName: storageAccountName
    principalId: principalId
  }
}

module assignTableStorageDataContributorRoleToAzureFunctionApp './assignTableStorageDataContributorRoleToAzureFunctionApp.bicep' = {
  name: 'assignTableStorageDataContributorRoleToAzureFunctionApp'
  scope: resourceGroup()
  params: {
    storageAccountName: storageAccountName
    principalId: principalId
  }
}

module assignCommunicationServicesOwnerRoleToAzureFunctionApp './assignCommunicationServicesOwnerRoleToAzureFunctionApp.bicep' = {
  name: 'assignCommunicationServicesOwnerRoleToAzureFunctionApp'
  scope: resourceGroup()
  params: {
    communicationServicesName: communicationServicesName
    principalId: principalId
  }
}
