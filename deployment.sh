#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/thotsparkz"
RELEASE_DIR="$APP_DIR/dist"
NGINX_SITE="/etc/nginx/nginx.conf"

npm ci
npm run build

sudo mkdir -p "$RELEASE_DIR"
sudo rsync -a --delete dist/ "$RELEASE_DIR/"
sudo cp nginx.conf "$NGINX_SITE"

if command -v nginx >/dev/null 2>&1; then
  sudo nginx -t
  sudo systemctl reload nginx
fi

if command -v pm2 >/dev/null 2>&1; then
  pm2 startOrReload ecosystem.config.js --env production
  pm2 save
fi

echo "THOTH SPARKZ deployed to $RELEASE_DIR"
