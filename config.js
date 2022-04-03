require(`dotenv`).config();

const {
  PORT,
  MONGODB_CONNECTION_URL,
  JWT_ACCESS_KEY,
  JWT_REFRESH_KEY,
} = (process || {}).env;

module.exports = {
  PORT,
  MONGODB_CONNECTION_URL,
  JWT_ACCESS_KEY,
  JWT_REFRESH_KEY,
};
