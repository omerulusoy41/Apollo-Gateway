import { Resolver, Query, Mutation, Args, Int, ResolveReference, ResolveField, Parent } from '@nestjs/graphql';
import { CarService } from './car.service';
import { Car, CarConnection } from './entities/car.entity';
import { CarInput } from './dto/car.input';
import { Person } from './entities/person.connection';


@Resolver(() => Car)
export class CarResolver {
  constructor(private readonly carService: CarService) {}

  @Query(() => CarConnection, { name: 'findAllCar' })
  findAll() {
    return this.carService.findAll();
  }

  @Query(() => CarConnection, { name: 'findOneCar' })
  findOne(@Args("input") input:string) {
    return this.carService.findOne(input);
  }

  @Mutation(() => CarConnection, { name: 'createCar' })
  create(@Args('input') input:CarInput) {
    return this.carService.create(input);
  }
 
}
