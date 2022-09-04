import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const server = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, '..', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'cert.pem')),
  },
  app
);
function startServer() {
  mongoConnect();
  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
  });
}

startServer();
