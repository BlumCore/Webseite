# upgrade brew, yarn and dependencies

echo "brew gets updated..."
brew update

echo "yarn gets upgraded..."
brew upgrade yarn

echo "Caution: dependencies get upgraded potentially across major versions"
yarn upgrade --latest
