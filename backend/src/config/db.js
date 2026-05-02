import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri || !uri.trim()) {
    throw new Error('MONGO_URI is not set. Add it to backend/.env');
  }

  await mongoose.connect(uri);
  console.log('MongoDB connected');
};
