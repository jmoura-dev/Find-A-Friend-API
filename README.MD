# App

- Find a Friend (API);

## FRs (Functional rules)

- [x] It should be possible to register;
- [ ] It should be possible to list all pets available for adoption in the city;
- [ ] It should be possible to filter pets by your characteristics;
- [ ] It should be possible to view details a pet for adoption;
- [ ] It should be possible to register as an ORG;
- [ ] It should be possible to done login as an ORG;

## BRs (Business rules)

- [ ] To list pets, we must inform the city;
- [ ] An ORG needs to have an address and WhatsApp number;
- [ ] A pet must be linked to an ORG;
- [ ] The user who wants to adopt will contact with ORG from WhatsApp;
- [ ] All filters other than city are optional;
- [ ] For an ORG to access the application as admin, it needs to be logged in;
- [x] The user must not be able to register with a duplicate e-mail;

## About

### Techs:
- **Nodejs**, **Fastify**, **Docker**, **Typescript**, **Zod**, **Dependency inversion**, **Design Patterns**, **JWT Authenticate**, **CI**;

### Database:
- **PrismaORM**, **Postgres**;

### Tests:
- **Vitest**, **In-memory-databases**, **Unit tests**, **Tests e2e**, **TDD**;