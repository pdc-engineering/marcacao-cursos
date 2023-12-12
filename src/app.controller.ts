// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { MongoDbService } from './services/mongo-db.service';

@Controller('progress')
export class AppController {
  constructor(private readonly mongoDbService: MongoDbService) {}

  @Get()
  async pingMongoDB(): Promise<string> {
    const client = this.mongoDbService.getClient();
    const result = await client.db('admin').command({ ping: 1 });
    return `MongoDB Ping Result: ${JSON.stringify(result)}`;
  }
}
