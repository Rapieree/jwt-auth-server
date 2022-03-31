const express = require(`express`);
const cors = require(`cors`);
const cookieParser = require(`cookie-parser`);
const envs = require(`./config`);

const PORT = envs.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server listen on ${PORT} port`));
  } catch (error) {
    console.log(error);
  }
};

start();
