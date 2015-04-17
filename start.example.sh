#!/bin/sh
export PORT=3000 \
export SERVICE_NAME="Express Passport Application" \
export DEBUG="*,-engine:polling" \
export NODE_ENV="development" \
export CLIENT_DOMAIN="localhost" \
export CLIENT_API_PATH="/api" \
export REDIS_URL="redis://localhost:6379" \
export REDIS_DB=0 \
export REDIS_SESSION_PREFIX="sess:" \
export APPSECRET="somecrazyhash" \
export SESSION_KEY="express.sid" \
export FACEBOOK_CLIENT_ID="000000000000000" \
export FACEBOOK_CLIENT_SECRET="000000000000000000000000000000000000000000000" \
export FACEBOOK_CALLBACK_URL="http://localhost:3000/auth/facebook/callback" \
export GOOGLE_CLIENT_ID="000000000000000000000000000000.apps.googleusercontent.com" \
export GOOGLE_CLIENT_SECRET="000000000000000000000000000000" \
export GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback" \
export INSTAGRAM_CLIENT_ID="000000000000000000000000000000" \
export INSTAGRAM_CLIENT_SECRET="000000000000000000000000000000" \
export INSTAGRAM_CALLBACK_URL="http://localhost:3000/auth/instagram/callback" \
export EMAIL_VERIFICATION_ROUTE="http://localhost:3000/auth/local/verify"
node app.js