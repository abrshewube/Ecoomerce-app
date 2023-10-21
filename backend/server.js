require('dotenv').config({ path: './data/config.env' });
const app = require('./app');
const cloudinary = require('cloudinary');
const Stripe = require('stripe');
const db = require('./db/db');
db();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const stripe = new Stripe(process.env.STRIPE_API_SECRET);
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(
    `server running on port ${process.env.PORT} in ${process.env.NODE_ENV}Mode.`
  );
});

// for handling promise rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('shutting down the server due to unhandled promise rejection');
  server.close(() => {
    process.exit(1);
  });
});
