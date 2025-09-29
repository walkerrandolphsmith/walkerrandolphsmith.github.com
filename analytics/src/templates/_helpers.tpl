{{/*
Generate a full name for resources
*/}}
{{- define "plausible.fullname" -}}
{{- printf "%s-%s" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end }}

{{/*
Generate standard labels
*/}}
{{- define "plausible.labels" -}}
app.kubernetes.io/name: {{ include "plausible.fullname" . }}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}