param location string
param storageAccountName string

resource storageAccountResource 'Microsoft.Storage/storageAccounts@2022-09-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'Storage'
  properties: {
    defaultToOAuthAuthentication: true
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: true
    networkAcls: {
      bypass: 'AzureServices'
      virtualNetworkRules: []
      ipRules: []
      defaultAction: 'Allow'
    }
    supportsHttpsTrafficOnly: true
    encryption: {
      services: {
        file: {
          keyType: 'Account'
          enabled: true
        }
        blob: {
          keyType: 'Account'
          enabled: true
        }
      }
      keySource: 'Microsoft.Storage'
    }
  }
}

resource blobServices 'Microsoft.Storage/storageAccounts/blobServices@2022-09-01' = {
  parent: storageAccountResource
  name: 'default'
  properties: {
    deleteRetentionPolicy: {
      allowPermanentDelete: false
      enabled: false
    }
  }
}

resource fileServices 'Microsoft.Storage/storageAccounts/fileServices@2022-09-01' = {
  parent: storageAccountResource
  name: 'default'
  properties: {
    shareDeleteRetentionPolicy: {
      allowPermanentDelete: true
      enabled: true
      days: 7
    }
  }
  dependsOn: [
    blobServices
  ]
}

resource queueServices 'Microsoft.Storage/storageAccounts/queueServices@2022-09-01' = {
  parent: storageAccountResource
  name: 'default'
}

resource tableServices 'Microsoft.Storage/storageAccounts/tableServices@2022-09-01' = {
  parent: storageAccountResource
  name: 'default'
}

resource table_outBox 'Microsoft.Storage/storageAccounts/tableServices/tables@2022-09-01' = {
  name: 'outBox'
  parent: tableServices
}

resource webjobHostsServices 'Microsoft.Storage/storageAccounts/blobServices/containers@2022-09-01' = {
  name: 'azure-webjobs-hosts'
  parent: blobServices
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
}

resource webjobHostsSecrets 'Microsoft.Storage/storageAccounts/blobServices/containers@2022-09-01' = {
  name: 'azure-webjobs-secrets'
  parent: blobServices
  properties: {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
}

output id string = storageAccountResource.id
output name string = storageAccountResource.name
