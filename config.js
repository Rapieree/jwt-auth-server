require(`dotenv`).config();

const {
  PORT,
  MONGODB_CONNECTION_URL,
} = (process || {}).env;

module.exports = {
  PORT,
  MONGODB_CONNECTION_URL,
};
