import mongoose from 'mongoose';

export async function connectToMongo(url: string | undefined): Promise<void> {
  try {
    if (!url) throw new Error('URL cannot be read');

    mongoose.set('strictQuery', true);
    await mongoose.connect(url);
    mongoose.connection.on('connection', () => console.log('MONGO: success'));
  } catch (err) {
    console.log(`MONGO: failure, ${err}`);
    process.exit(1);
  }
}
