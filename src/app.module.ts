import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriverConfig,ApolloGatewayDriver } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';

@Module({
  imports: [ 
    ConfigModule.forRoot({
    envFilePath: [`config/${process.env.NODE_ENV}.env`],
  }),
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver : ApolloGatewayDriver,
      useFactory: async (configService:ConfigService) => {
          return {
            gateway:{
              supergraphSdl:new IntrospectAndCompose({
                subgraphs:[
                  {
                    name: 'car',
                    url: `http://${configService.get('CAR_URI')}:${configService.get('CAR_PORT')}/graphql`,
                  },

                  {
                    name: 'person',
                    url: `http://${configService.get('PERSON_URI')}:${configService.get('PERSON_PORT')}/graphql`,
                  },
                ]
              })
            }
          }
      }
    })

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
