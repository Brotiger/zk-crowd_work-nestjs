export const configuration = () => ({
  production: process.env.NODE_ENV == 'production' ? true : false,
  twilio_account_sid: process.env.TWILIO_ACCOUNT_SID,
  twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
  twilio_phone_from: process.env.TWILIO_PHONE_FROM,
  jwt_private_key: process.env.JWT_PRIVATE_KEY,
  jwt_expires_in: process.env.JWT_EXPIRES_IN,
  code_ttl: process.env.CODE_TTL,
  sms_ttl: process.env.SMS_TTL
});