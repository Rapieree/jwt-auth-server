require(`dotenv`).config();

const {
  PORT,
  MONGODB_CONNECTION_URL,
  JWT_ACCESS_KEY,
  JWT_REFRESH_KEY,
  SMTP_PORT,
  SMTP_HOST,
  SMTP_LOGIN,
  SMTP_PASSWORD,
  API_URL,
  CLIENT_URL,
} = (process || {}).env;

module.exports = {
  PORT,
  MONGODB_CONNECTION_URL,
  JWT_ACCESS_KEY,
  JWT_REFRESH_KEY,
  SMTP_PORT,
  SMTP_HOST,
  SMTP_LOGIN,
  SMTP_PASSWORD,
  API_URL,
  CLIENT_URL,
};
