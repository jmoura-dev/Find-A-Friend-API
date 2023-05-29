import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchListPetOnCity } from '../pets/fetch-list-pets-by-characteristics'

export function makeFetchListPetOnCity() {
  const petsRepository = new PrismaPetsRepository()
  const fetchListPetOnCity = new FetchListPetOnCity(petsRepository)

  return fetchListPetOnCity
}
