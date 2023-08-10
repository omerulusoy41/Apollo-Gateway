import { ObjectType, Field, Int, Directive, ID } from '@nestjs/graphql';
import{Entity,PrimaryColumn,Column,BaseEntity,ObjectIdColumn} from "typeorm"
import { PersonConnection } from './person.connection';

@ObjectType("Car")
@Entity()
@Directive('@key(fields: "id")')
export class Car extends BaseEntity {

  @ObjectIdColumn()
  _id:string

  @PrimaryColumn()
  @Field(()=>ID,{ description: 'Example field (placeholder)' })
  id: string;

  @Field( { description: 'Example field (placeholder)' })
  @Column()
  model: string;

  @Field(() => PersonConnection, { description: 'Example field (placeholder)', nullable:true})
  @Column()
  person: PersonConnection;
}

@ObjectType("CarEdge")
export class CarEdge {
  @Field(()=> Car,{nullable:true})
  node: Car
}

@ObjectType("CarConnection")
export class CarConnection {
  
  @Field(()=> [CarEdge],{nullable:true})
  edges: CarEdge[]
}