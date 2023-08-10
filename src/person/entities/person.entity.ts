import { ObjectType, Field, Int, Directive, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { Entity,BaseEntity,PrimaryColumn,Column, ObjectIdColumn } from "typeorm"
import { CarConnection } from './car.connection';

@Entity()
@ObjectType("Person")
@Directive('@key(fields: "id")')
export class Person extends BaseEntity{

  @ObjectIdColumn()
  _id:string

  @Field(()=>ID,{ description: 'id' })
  @PrimaryColumn()
  id: string;

  @Field({ description: 'name' })
  @Column()
  name: string;

  @Field(()=> CarConnection, {nullable:true})
  @Column()
  car: CarConnection
}

@ObjectType("PersonEdge")
export class PersonEdge {
  @Field(()=> Person)
  node: Person
}

@ObjectType("PersonConnection")
export class PersonConnection {
  
  @Field(()=> [PersonEdge])
  edges: PersonEdge[]
}
