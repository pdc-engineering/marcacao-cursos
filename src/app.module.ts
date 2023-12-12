// app.module.ts
import { Module } from '@nestjs/common';
import { AccountsController } from './account.controller';
import { AccountsService } from './account.service';
import { MongoDbService } from './services/mongo-db.service';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, MongoDbService],
})
export class AppModule {}
