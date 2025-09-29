param CommunicationServices_acs_portfolio_name string = 'acs-portfolio'

resource CommunicationServices_acs_portfolio_name_resource 'Microsoft.Communication/CommunicationServices@2024-09-01-preview' = {
  name: CommunicationServices_acs_portfolio_name
  location: 'global'
  properties: {
    dataLocation: 'United States'
  }
}
