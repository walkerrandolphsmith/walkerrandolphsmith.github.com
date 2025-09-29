param location string = 'east-us'
param keyVaultCIName string = 'kv-portfolio-ci'
param azureDevOpsServiceConnectionId string = '56d43626-78e0-4ebf-80d8-723a32f22314'
param tenantId string = '5211b316-a257-4728-980b-e6d793f3c8f6'

resource keyVaultCIResource 'Microsoft.KeyVault/vaults@2023-02-01' = {
  name: keyVaultCIName
  location: location
  properties: {
    sku: {
      family: 'A'
      name: 'standard'
    }
    tenantId: tenantId
    accessPolicies: [
      {
        tenantId: tenantId
        objectId: azureDevOpsServiceConnectionId
        permissions: {
          keys: []
          secrets: [
            'Get'
            'List'
          ]
          certificates: []
        }
      }
    ]
    enabledForDeployment: false
    enabledForDiskEncryption: false
    enabledForTemplateDeployment: false
    enableSoftDelete: true
    softDeleteRetentionInDays: 90
    enableRbacAuthorization: false
    vaultUri: 'https://${keyVaultCIName}.vault.azure.net/'
    provisioningState: 'Succeeded'
    publicNetworkAccess: 'Enabled'
  }
}

resource keyVaultCINameStaticWebAppDeploymentApiToken 'Microsoft.KeyVault/vaults/secrets@2023-02-01' = {
  parent: keyVaultCIResource
  name: 'staticWebAppDeploymentApiToken'
  properties: {
    value: '39622c2825e2a59279476aea30be51e423fa822272a0ae865d1d56073cde277206-2e21a4f6-82c6-4ba4-b80f-906e39ac573a00f26130bb518e0f'
    attributes: {
      enabled: true
    }
  }
}
