import app from './app';
import config from './app/config'
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Connected to the database');

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}

main().catch((err) => console.error('Main function error:', err));
