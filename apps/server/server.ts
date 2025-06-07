import createApp from './src/app/createApp';
import { env } from './src/schemas/env';

const app = createApp();
const PORT = env.NODE_ENV == 'production' ? 8080 : 3000;

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}. Cors set to ${process.env.CLIENT_HOST}`,
  );
});
