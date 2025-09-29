param serviceBusNamespace string
param principalId string

resource serviceBus 'Microsoft.ServiceBus/namespaces@2022-10-01-preview' existing = {
  name: serviceBusNamespace
}

var azureServiceBusDataOwnerRoleId = '090c5cfd-751d-490a-894a-3ce6f1109419'

resource storageAccountAppRoleAssignment 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = {
  name: guid(serviceBus.id, azureServiceBusDataOwnerRoleId, principalId)
  scope: serviceBus
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', azureServiceBusDataOwnerRoleId)
    principalId: principalId
  }
}
