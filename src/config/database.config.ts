import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  const host = process.env.MONGO_DB_HOST;
  const port = process.env.MONGO_DB_PORT || 27017;
  const user = process.env.MONGO_ROOT_USERNAME;
  const pass = process.env.MONGO_ROOT_PASSWORD;
  const name = process.env.MONGO_DB_NAME;

  const mongoURI =
    process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod'
      ? `mongodb://${host}:${port}/${name}?retryWrites=false`
      : `mongodb://${user}:${pass}@${host}:${port}/${name}?retryWrites=false&authSource=admin`;

  return {
    host,
    port,
    user,
    pass,
    name,
    uri: mongoURI,
  };
});
