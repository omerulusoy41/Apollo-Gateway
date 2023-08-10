import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CrudModule } from './person/person.module';
import { Person } from './person/entities/person.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`config/${process.env.NODE_ENV}.env`],
    }),
    TypeOrmModule.forRootAsync ({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService:ConfigService) => {
        const mongoUrl =
        'mongodb+srv://' +
        configService.get('MONGO_USERNAME') +
        ':' +
        configService.get('MONGO_PASSWORD') +
        '@' +
        configService.get('MONGO_URI');

          return {
            type: 'mongodb',
            url: mongoUrl,
            database: configService.get('MONGO_DATABASE'),
            synchronize: true,
            useUnifiedTopology: true,
            entities: [Person],
          };
      },
    }),
    CrudModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
