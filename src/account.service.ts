import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { MongoDbService } from './services/mongo-db.service';
import * as json2csv from 'json2csv';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AccountsService {
  constructor(private readonly mongoDbService: MongoDbService) {}

  async getCollectionsByAccountIds(
    accountIds: number[],
    fileName: string = 'output.csv',
  ) {
    try {
      const client: MongoClient = this.mongoDbService.getClient();
      const database = client.db('progress-prd');
      const collection = await database.collection('courses');

      const countedCourses = [];

      for (const accountId of accountIds) {
        const query = {
          accountId: +accountId,
        };

        const result = await collection.find(query).toArray();

        result.forEach((entry) => {
          const accountId = entry.accountId;
          const courses = entry.courses || [];

          courses.forEach((course) => {
            const courseId = course.courseId;
            const courseLessons = course.lessons ? course.lessons.length : 0;

            countedCourses.push({
              accountId,
              courseId,
              courseLessons,
            });
          });
        });
      }

      // Converter para CSV
      const csv = json2csv.parse(countedCourses);

      // Obter o caminho absoluto para o diretório desejado
      const outputPath = path.resolve(__dirname, '..', 'csv', fileName);

      // Certificar-se de que o diretório existe, se não, criá-lo
      const outputDirectory = path.dirname(outputPath);
      if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory, { recursive: true });
      }

      // Salvar o CSV em um arquivo no caminho especificado
      fs.writeFileSync(outputPath, csv, 'utf-8');

      console.log(`Arquivo CSV salvo com sucesso em: ${outputPath}`);

      return countedCourses;
    } catch (error) {
      console.error('Erro ao obter coleções por conta:', error);
      throw error;
    }
  }
}
