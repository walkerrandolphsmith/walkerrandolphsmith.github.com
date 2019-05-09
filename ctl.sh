command=$1


function validate() {
  npx amphtml-validator http://localhost:8080/amp.html
}

function build() {
  cp -R ./src/. ./public
  npx html-minifier \
    --collapse-whitespace \
    --remove-comments \
    --remove-optional-tags \
    --remove-redundant-attributes \
    --remove-script-type-attributes \
    --remove-tag-whitespace \
    --minify-css true \
    --minify-js true \
    --input-dir ./src \
    --output-dir ./public
}

function up() {
  environment="./src"
  if [ $1 == "prod" ]; then
    environment="./public"
  fi
  npx http-server $environment
}

function deploy() {
  git push origin `git subtree split --prefix public develop`:master --force
}

function release() {
  while true; do
      read -p "Do you wish to deploy? y/n" yn
      case $yn in
          [Yy]* ) deploy; break;;
          [Nn]* ) exit;;
          * ) echo "Please answer yes or no.";;
      esac
  done
}

case $command in
    up)
        up $2
        ;;
    build)
        build
        ;;
    release)
        release
        ;;
    validate)
      validate $2
      ;;
    *)
        echo "Option not recognized."
        exit 1
esac