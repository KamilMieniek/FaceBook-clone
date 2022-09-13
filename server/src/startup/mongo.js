import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const db = mongoose.connection;
const MONGO_URL = process.env.MONGO;

db.once('open', () => {
  console.log('Mongoose connection ready!');
});

db.on('error', (err) => {
  console.error(err);
  console.log(
    '%s MongoDB connection error. Please make sure MongoDB is running.'
  );
  process.exit();
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
async function mongoDisconnect() {
  await mongoose.disconnect();
}
// ========================================================
// Exports
// ========================================================
export { mongoConnect, mongoDisconnect };
