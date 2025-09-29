param location string
param staticWebAppName string
param repositoryURL string
param customDomainName string

resource staticWebAppResource 'Microsoft.Web/staticSites@2022-09-01' = {
  name: staticWebAppName
  location: location
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }
  properties: {
    repositoryUrl: repositoryURL
    branch: 'main'
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    provider: 'DevOps'
    enterpriseGradeCdnStatus: 'Disabled'
  }
}

resource custom_domains 'Microsoft.Web/staticSites/customDomains@2022-09-01' = {
  parent: staticWebAppResource
  name: customDomainName
  properties: {}
}
