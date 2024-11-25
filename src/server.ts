import app from './app';
import config from './app/config'
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Connected to the database');

    const server = app.listen(5000, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
    return server
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}

main().catch((err) => console.error('Main function error:', err));
