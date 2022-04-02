const express = require(`express`);
const cors = require(`cors`);
const cookieParser = require(`cookie-parser`);
const envs = require(`./config`);
const mongoose = require(`mongoose`);
const {MONGODB_CONNECTION_URL} = require(`./config`);

const PORT = envs.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors);

const start = async () => {
  try {
    await mongoose.connect(MONGODB_CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server listen on ${PORT} port`));
  } catch (error) {
    console.log(error);
  }
};

start();
