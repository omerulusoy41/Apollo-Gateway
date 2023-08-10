import { Injectable } from '@nestjs/common';
import { Person, PersonConnection, PersonEdge } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonInput } from 'src/dto/person.input';
import { v4 as uuid } from 'uuid';


@Injectable()
export class CrudService {
  
    constructor(@InjectRepository(Person) private readonly repo:Repository<Person>){}

    async findAll():Promise<PersonConnection>{
     var people = await this.repo.find()
     
     var personConnection : PersonConnection = {
      edges :[]
     }

     people.forEach((person)=> {
        var edge : PersonEdge = {
          node : person
        }
        personConnection.edges.push(edge)
     }
     )
      return personConnection
    }

    async findOne(id:string):Promise<PersonConnection>{
     var person = await this.repo.findOneBy({id})
     
     var personConnection : PersonConnection = {
      edges :[]
     }
      var edge : PersonEdge = {
        node : person
      }
      personConnection.edges.push(edge)

      return personConnection
    }

    async findOneRef(id:string):Promise<Person>{
      return await this.repo.findOneBy({id})
    }
  
    async create(input:PersonInput):Promise<PersonConnection>{
      var person = new Person()
      person.id = uuid()
      person.name = input.name
      person.car = null
      var edge : PersonEdge = {
        node : person
      } 
      var personConnection : PersonConnection = {
        edges:[]
      }
      personConnection.edges.push(edge)
      await this.repo.save(person)
      return personConnection
    }

}
