kubectl apply --validate=false -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.4/cert-manager.crds.yaml

kubectl label deployment cert-manager -n cert-manager azure.workload.identity/use=true

kubectl annotate serviceaccount cert-manager \
  -n cert-manager \
  azure.workload.identity/client-id=940f07d0-3e49-4caf-97d4-b16507315af0

kubectl apply -f cluster-issuer.yaml