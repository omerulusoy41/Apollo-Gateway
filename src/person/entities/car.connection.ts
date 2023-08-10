import { Directive, Field, ID, InputType, ObjectType } from "@nestjs/graphql"

@ObjectType("Car")
@Directive("@extends")
@Directive('@key(fields: "id")')
export class Car{
  
  @Directive("@external")
  @Field(() => ID)
  id: string
}

@ObjectType("CarEdge")
export class CarEdge{
  
  @Field(()=> Car)
  node: Car
}


@ObjectType("CarConnection")
export class CarConnection{

  @Field(()=>[CarEdge])
  edges: CarEdge[]
}
