export class InvalidCredentialsError extends Error {
  constructor() {
    super('E-mail and/or password invalid(s).')
  }
}
