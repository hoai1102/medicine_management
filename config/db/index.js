const mongoose = require('mongoose');
const dotenv = require('dotenv');
const config = require('../config');
dotenv.config();

const mongodbUrl = config.MONGODB_URL;

async function connect() {
  try {
    await mongoose.connect(mongodbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connected successfully');
  } catch (error) {
    console.log('connected failure');
  }
}
module.exports = { connect };
