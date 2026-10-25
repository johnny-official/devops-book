#!/usr/bin/env bash

set -e

su app-user -s /bin/bash <<'EOF'
set -e
cd /home/app-user/sample-app

TOKEN=$(curl --fail --silent --show-error --noproxy '*' --connect-timeout 2 --max-time 5 \
  -X PUT -H 'X-aws-ec2-metadata-token-ttl-seconds: 60' \
  http://169.254.169.254/latest/api/token)
INSTANCE_ID=$(curl --fail --silent --show-error --noproxy '*' --connect-timeout 2 --max-time 5 \
  -H "X-aws-ec2-metadata-token: $TOKEN" \
  http://169.254.169.254/latest/meta-data/instance-id)
[[ "$INSTANCE_ID" =~ ^i-[0-9a-f]+$ ]] || { echo 'Invalid EC2 instance ID' >&2; exit 1; }
export INSTANCE_ID

pm2 start app.config.js --update-env
pm2 save
EOF
