import mongoose from 'mongoose';
const db = mongoose.connection;
const MONGO_URL = process.env.MONGO;

db.once('open', () => {
  console.log('Mongoose connection ready!');
});

db.on('error', (err) => {
  console.log(err);
});

export async function mongoConnect() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export async function mongoDisconnect() {
  await mongoose.disconnect();
}
