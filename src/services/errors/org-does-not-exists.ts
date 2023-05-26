export class OrgDoesNotExists extends Error {
  constructor() {
    super('This org does not exists or do not find')
  }
}
