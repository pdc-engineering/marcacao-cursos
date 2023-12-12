// mongo-db.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { MongoClient, ServerApiVersion } from 'mongodb';

@Injectable()
export class MongoDbService implements OnModuleInit, OnModuleDestroy {
  private client: MongoClient;

  async onModuleInit() {
    // Ao iniciar o módulo, conecte-se ao MongoDB
    await this.connect();
  }

  async onModuleDestroy() {
    // Ao desligar o módulo, desconecte-se do MongoDB
    await this.disconnect();
  }

  async connect() {
    const uri =
      'mongodb+srv://pdc:mdpgCUv2U4MEHyW@primary-database-pdc.fbuc4.mongodb.net/progress-prd?retryWrites=true&w=majority';

    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await this.client.connect();
    console.log('Connected to MongoDB');
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      console.log('Disconnected from MongoDB');
    }
  }

  getClient(): MongoClient {
    return this.client;
  }
}
