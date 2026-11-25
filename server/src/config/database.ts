import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer: MongoMemoryServer | null = null;

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/noire-cafe';
  
  try {
    // Set connection options with sensible timeouts
    mongoose.set('strictQuery', false);
    
    // Try primary URI first with a 4s serverSelectionTimeout
    console.log(`[Database] Attempting connection to MongoDB: ${uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@')}`);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 5000,
    });
    console.log('[Database] Connected successfully to MongoDB host:', mongoose.connection.host);
  } catch (primaryError: any) {
    console.warn(`[Database] Primary MongoDB unreachable (${primaryError.message}). Initializing embedded development MongoDB...`);
    
    try {
      mongoMemoryServer = await MongoMemoryServer.create({
        instance: {
          dbName: 'noire-cafe-dev',
        },
      });
      const memUri = mongoMemoryServer.getUri();
      console.log(`[Database] Embedded MongoDB Memory Server started at: ${memUri}`);
      await mongoose.connect(memUri);
      console.log('[Database] Connected successfully to embedded development database.');
    } catch (memError: any) {
      console.error('[Database] Failed to initialize embedded MongoDB:', memError.message);
      throw memError;
    }
  }

  mongoose.connection.on('error', (err) => {
    console.error('[Database] MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('[Database] MongoDB disconnected.');
  });
};

export const disconnectDB = async (): Promise<void> => {
  await mongoose.disconnect();
  if (mongoMemoryServer) {
    await mongoMemoryServer.stop();
  }
};
