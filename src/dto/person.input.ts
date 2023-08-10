import {Field,InputType} from '@nestjs/graphql';
import { CarConnection } from "src/person/entities/car.connection";

@InputType()
export class PersonInput{

    @Field ({ description: 'person input' })
    name: string;

    @Field ({ description: 'car input' })
    carId: string
}