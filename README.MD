# App

- Find a Friend (API);

## FRs (Functional rules)

- [x] It should be possible to register;
- [x] It must be possible to register a pet
- [x] It should be possible to list all pets available for adoption in the city;
- [x] It should be possible to filter pets by your characteristics;
- [x] It should be possible to view details a pet for adoption;
- [x] It should be possible to register as an ORG;
- [x] It should be possible to done login as an ORG;

## BRs (Business rules)

- [x] To list pets, we must inform the city;
- [x] An ORG needs to have an address and WhatsApp number;
- [x] A pet must be linked to an ORG;
- [x] The user who wants to adopt will contact with ORG from WhatsApp;
- [x] All filters other than city are optional;
- [x] For an ORG to access the application as admin, it needs to be logged in;
- [x] The user must not be able to register with a duplicate e-mail;

## About

### Techs:
- **Nodejs**, **Fastify**, **Docker**, **Typescript**, **Zod**, **Dependency inversion**, **Design Patterns**, **JWT Authenticate**, **CI**;

### Database:
- **PrismaORM**, **Postgres**;

### Tests:
- **Vitest**, **In-memory-databases**, **Unit tests**, **Tests e2e**, **TDD**;