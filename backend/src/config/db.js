const mongoose = require('mongoose');
const env = require('./env');

async function connectDb() {
  if (!env.mongoUri) throw new Error('MONGO_URI is not configured');
  await mongoose.connect(env.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

module.exports = { connectDb };
