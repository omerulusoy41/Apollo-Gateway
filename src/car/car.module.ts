import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarResolver } from './car.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from  '@nestjs/typeorm';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Car } from './entities/car.entity';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';

@Module({
  imports:[
    TypeOrmModule.forFeature([Car]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
        driver: ApolloFederationDriver,
        autoSchemaFile: true,
        plugins:[ApolloServerPluginInlineTrace()],
        
    })
  ],
  providers: [CarResolver, CarService],
})
export class CarModule {}
