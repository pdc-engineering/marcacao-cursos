import { Injectable } from '@nestjs/common';
import { MongoDbService } from './services/mongo-db.service';
import { MongoClient } from 'mongodb';

@Injectable()
export class AppService {
  constructor(private readonly mongoDbService: MongoDbService) {}

  async getCollectionsByAccountId(accountId: number) {
    const client: MongoClient = this.mongoDbService.getClient();
    const database = client.db('progress-prd');
    const collection = await database.collection('courses');

    // Alteração: Executando o cursor usando toArray
    const result = await collection
      .find({
        'courses.accountId.$numberInt': accountId,
      })
      .toArray();
    console.info(result);
    return result;
  }
}
