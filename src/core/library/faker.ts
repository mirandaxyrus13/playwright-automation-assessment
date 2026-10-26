import { faker } from '@faker-js/faker';

export class Faker {

    public setRandomFirstName(){
        return faker.person.firstName();
    }

    public setRandomLastName(){
        return faker.person.lastName();
    }

    public setRandomPrice(){
        return faker.number.int({ min: 100, max: 5000 });
    }

}
