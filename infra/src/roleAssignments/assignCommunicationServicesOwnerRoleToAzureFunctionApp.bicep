param communicationServicesName string
param principalId string

resource communicationServicesResource 'Microsoft.Communication/CommunicationServices@2023-03-31' existing = {
  name: communicationServicesName
}

var ownerRoleId = '8e3af657-a8ff-443c-a75c-2fe8c4bcb635'

resource storageAccountAppRoleAssignment 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = {
  name: guid(communicationServicesResource.id, ownerRoleId, principalId)
  scope: communicationServicesResource
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', ownerRoleId)
    principalId: principalId
  }
}
