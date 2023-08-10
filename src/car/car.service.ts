import { Injectable } from '@nestjs/common';
import { Car, CarConnection, CarEdge } from './entities/car.entity';
import { InjectRepository } from  '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarInput } from './dto/car.input';
import { v4 as uuid } from 'uuid';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { gql } from 'graphql-tag';

@Injectable()
export class CarService {
  
  constructor(@InjectRepository(Car) private readonly repo:Repository<Car>){}

  async findAll():Promise<CarConnection>{
    var cars = await this.repo.find()
    var carConnection:CarConnection ={
        edges: []
    } 
    cars.forEach((car) => {
      const edge: CarEdge = {
        node: car,
      };
      carConnection.edges.push(edge);
    });

    return carConnection
  }

  async findOne(id:string):Promise<CarConnection>{
    var car = await this.repo.findOneBy({id})
    const httpLink = createHttpLink({
      uri: 'http://localhost:3002/graphql',
    });
  
    const client = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
    });
   const query = gql`
      query FindOnePerson {
        findOnePerson(input: "d1fc8683-0d03-432f-8bc1-9adfac61fa59") {
            edges {
                node {
                    id
                    name
                }
            }
        }
    }
      `;
    car.person = (await client.query({ query })).data.findOnePerson
    var carConnection:CarConnection ={
        edges: []
    } 
    const edge: CarEdge = {
      node: car,
    };


    carConnection.edges.push(edge);
    return carConnection
  }

  async create(input:CarInput):Promise<CarConnection>{
    var car = new Car()
    car.id = uuid()
    car.model = input.model
    var carEdge: CarEdge ={
      node :car
    }
    var CarConnection : CarConnection = {
      edges: []
    }
    CarConnection.edges[0] = carEdge
    await this.repo.save(car)
    return CarConnection
  }
}
