import { Field, InputType, Int } from "@nestjs/graphql";
import { PersonConnection } from "../entities/person.connection";

@InputType("CarInput")
export class CarInput {

    @Field( { description: 'Example field (placeholder)' })
    model: string;

    @Field({ description: 'Example field (placeholder)' })
    personId:string
}