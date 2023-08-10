import { Directive, Field, ID, ObjectType } from "@nestjs/graphql"

@ObjectType("Person")
@Directive("@extends")
@Directive('@key(fields: "id")')
export class Person{

    @Directive("@external")
    @Field(() => ID)
    id:string
}

@ObjectType("PersonEdge")
export class PersonEdge{
  
  @Field(()=> Person)
  node: Person
}

@ObjectType("PersonConnection")
export class PersonConnection{

  @Field(()=>[PersonEdge])
  edges: PersonEdge[]
}