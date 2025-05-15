import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (_, res) => {
  res.send('Hello from Express running on Bun!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
