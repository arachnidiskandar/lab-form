import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.NODE_ENV === 'test' ? process.env.PORT_TEST : process.env.PORT;

const MONGO_OPTIONS = { // Mudar para firebase
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 50,
  autoIndex: false,
  retryWrites: false,
};
const MONGO = { // Mudar para firebase
  uri: process.env.NODE_ENV === 'test' ? process.env.MONGODB_TEST_URI : process.env.MONGODB_URI,
  options: MONGO_OPTIONS,
};
const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const config = {
  server: SERVER,
  mongo: MONGO, // Mudar para firebase
};

export default config;
