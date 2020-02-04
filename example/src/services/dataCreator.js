import faker from 'faker';
faker.locale = 'en';

const createPerson = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
    job: faker.name.jobType(),
    birthDate: faker.date.between('1940-01-01', '1999-12-31'),
    points: faker.random.number({ min: 0, max: 1000 }),
  };
};

export default function dataCreator(length) {
  const array = [];
  for (let i = 0; i < length; i++) {
    array.push(createPerson());
  }
  return array;
}
