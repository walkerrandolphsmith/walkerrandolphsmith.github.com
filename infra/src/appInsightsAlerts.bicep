param location string
param applicationInsightsName string
param logAnalyticsWorkspaceName string

module applicationInsightsModule './appInsights.bicep' = {
  name: 'applicationInsightsModule'
  params: {
    location: location
    applicationInsightsName: applicationInsightsName
    logAnalyticsWorkspaceName: logAnalyticsWorkspaceName
  }
}

var failureAnomaliesResourceName = 'alert-http-failure-anomalies'

resource failureAnomaliesResource 'microsoft.alertsmanagement/smartdetectoralertrules@2021-04-01' = {
  name: failureAnomaliesResourceName
  location: 'global'
  properties: {
    description: 'Failure Anomalies notifies you of an unusual rise in the rate of failed HTTP requests or dependency calls.'
    state: 'Enabled'
    severity: 'Sev3'
    frequency: 'PT1M'
    detector: {
      id: 'FailureAnomaliesDetector'
    }
    scope: [
      applicationInsightsModule.outputs.id
    ]
    actionGroups: {
      groupIds: []
    }
  }
}
