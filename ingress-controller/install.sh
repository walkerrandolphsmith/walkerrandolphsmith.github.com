helm upgrade ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --set controller.service.externalTrafficPolicy=Local \
  --set controller.watchNamespace=\"\"