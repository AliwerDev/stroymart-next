#!/bin/bash

# Usage: ./deploy.sh dev | prod

STAGE=$1

if [ "$STAGE" == "dev" ]; then
  BRANCH="dev"
  PM2_NAME="stroymart-dev"
elif [ "$STAGE" == "prod" ]; then
  BRANCH="main"
  PM2_NAME="stroymart"
else
  echo "Usage: $0 dev|prod"
  exit 1
fi

echo "=============================="
echo "Deploying $STAGE environment"
echo "Branch: $BRANCH"
echo "PM2 process: $PM2_NAME"
echo "=============================="

# Go to project directory
cd /var/www/stroymart-next || { echo "Directory not found!"; exit 1; }

# Ensure proper permissions
sudo chown -R $(whoami):$(whoami) .

# Switch to the correct branch
git fetch origin
git checkout $BRANCH || { echo "Failed to checkout $BRANCH"; exit 1; }
git pull origin $BRANCH || { echo "Git pull failed"; exit 1; }

# Install dependencies
npm install -f || { echo "npm install failed"; exit 1; }

# Build the project
npm run build || { echo "npm run build failed"; exit 1; }

# PM2 restart or start if not exists
if pm2 list | grep -q "$PM2_NAME"; then
  echo "Restarting PM2 process: $PM2_NAME"
  pm2 restart "$PM2_NAME" --update-env
else
  echo "Starting new PM2 process: $PM2_NAME"
  pm2 start npm --name "$PM2_NAME" -- run start
fi

# Save PM2 process list
pm2 save

echo "Deployment finished successfully!"
