param keyVaultName string
param principalId string

resource keyVault 'Microsoft.KeyVault/vaults@2023-02-01' existing = {
  name: keyVaultName
}

var keyVautSecretsUserRoleId = '4633458b-17de-408a-b874-0445c86b69e6'

resource storageAccountAppRoleAssignment 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = {
  name: guid(keyVault.id, keyVautSecretsUserRoleId, principalId)
  scope: keyVault
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', keyVautSecretsUserRoleId)
    principalId: principalId
  }
}
