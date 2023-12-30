// logger.js
const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
  level: 'info', // default level
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.MongoDB({
      db: 'mongodb+srv://Akanksha:12345@cluster1.5uq5q4b.mongodb.net/?retryWrites=true&w=majority/logingeator', // replace with your MongoDB connection string and log database name
      options: { useUnifiedTopology: true },
      collection: 'test', // replace with the desired collection name
    }),
  ],
});

module.exports = logger;
