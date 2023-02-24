import { City, Drug, Weapon } from './Enums';
import { CitiesState } from './reducers/CityReducer';
import { DopeState } from './reducers/DopeReducer';

export interface DrugForSale {
  drug: Drug;
  price: number;
}

export interface DrugSale {
  drug: Drug;
  price: number;
  amount: number;
}

export interface DrugHeld {
  drug: Drug;
  held: number;
}

export type DrugMap = {
  [id in Drug]: number;
};

export interface RootState {
  dopeState: DopeState;
  citiesState: CitiesState;
}