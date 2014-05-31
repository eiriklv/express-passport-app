#!/bin/sh
# Variables set up by this script:
# PORT                        Port exposed by this component.
# SERVICE_NAME                The name of your fantastic service/platform!
# DEBUG                       Debugging (* for all)
# NODE_ENV                    Environment ('development', 'staging', 'production')
# CLIENT_API_URL              Path to the client REST api (root - as resources should be relative)
# MONGO_URL                   MongoDB url
# APPSECRET                   Application session secret
# FACEBOOK_CLIENT_ID          Facebook application client id
# FACEBOOK_CLIENT_SECRET      Facebook application client secret
# FACEBOOK_CALLBACK_URL       Facebook application callback url (http://yourdomain.com/auth/facebook/callback)
# GOOGLE_CLIENT_ID            Google application client id
# GOOGLE_CLIENT_SECRET        Google application client secret
# GOOGLE_CALLBACK_URL         Google application callback url (http://yourdomain.com/auth/google/callback)
# INSTAGRAM_CLIENT_ID         Instagram application client id
# INSTAGRAM_CLIENT_SECRET     Instagram application client secret
# INSTAGRAM_CALLBACK_URL      Instagram application callback url (http://yourdomain.com/auth/instagram/callback)
# MANDRILL_API_KEY            Mandrill API key
# MANDRILL_SENDER             Mandrill email sender address (John Doe <john@doe.com>)
# EMAIL_VERIFICATION_ROUTE    Email verification route (http://yourdomain.com/auth/local/verify)

export PORT=3000 \
export SERVICE_NAME="Express Passport Example App" \
export DEBUG="*" \
export NODE_ENV="development" \
export CLIENT_API_URL="/api" \
export MONGO_URL="mongodb://localhost/express-passport-app" \
export REDIS_URL="redis://localhost:6379" \
export REDIS_DB=1 \
export REDIS_SESSION_PREFIX="sess:" \
export APPSECRET="somecrazyhash" \
export FACEBOOK_CLIENT_ID="00000000000000" \
export FACEBOOK_CLIENT_SECRET="00000000000000" \
export FACEBOOK_CALLBACK_URL="http://localhost:3000/auth/facebook/callback" \
export GOOGLE_CLIENT_ID="00000000000000" \
export GOOGLE_CLIENT_SECRET="00000000000000" \
export GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback" \
export INSTAGRAM_CLIENT_ID="00000000000000" \
export INSTAGRAM_CLIENT_SECRET="00000000000000" \
export INSTAGRAM_CALLBACK_URL="http://localhost:3000/auth/instagram/callback" \
export MANDRILL_API_KEY="00000000000000" \
export MANDRILL_SENDER="John Doe <john@doe.com>" \
export EMAIL_VERIFICATION_ROUTE="http://localhost:3000/auth/local/verify" \

# Run process
gulp