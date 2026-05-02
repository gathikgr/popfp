import dotenv from 'dotenv';

dotenv.config();

const required = ['MONGO_URI', 'JWT_SECRET'];

export const validateEnv = () => {
  const missing = required.filter((key) => !process.env[key] || !String(process.env[key]).trim());
  if (missing.length) {
    const message = `Missing required environment variables: ${missing.join(', ')}. Copy backend/.env.example to backend/.env and fill values.`;
    throw new Error(message);
  }
};
