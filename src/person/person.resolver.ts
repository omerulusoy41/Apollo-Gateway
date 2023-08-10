import { Resolver, Query, Mutation, Args, Int, ResolveField, ResolveReference } from '@nestjs/graphql';
import { CrudService } from './person.service';
import {  Person, PersonConnection } from './entities/person.entity';
import { PersonInput } from 'src/dto/person.input';


@Resolver(() => Person)
export class CrudResolver {
  constructor(private readonly crudService: CrudService) {}


  @Query(()=> PersonConnection,{name:"findAllPerson"})
  findAll(){
      return this.crudService.findAll()
  }

  @Query(()=> PersonConnection,{name:"findOnePerson"})
  findOne(@Args("input") input:string){
      return this.crudService.findOne(input)
  }

  @Mutation(()=> PersonConnection,{name:"CreatePerson"})
  create(@Args('input') input:PersonInput){
      return this.crudService.create(input)
  }

}
