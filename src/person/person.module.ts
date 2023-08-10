import { Module } from '@nestjs/common';
import { CrudService } from './person.service';
import { CrudResolver } from './person.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Person } from './entities/person.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Person]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
        driver: ApolloFederationDriver,
        autoSchemaFile: true,
        plugins:[ApolloServerPluginInlineTrace()],
        
    })
  ],
  providers: [CrudResolver, CrudService],
})
export class CrudModule {}
