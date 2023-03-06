import { City, Drug, Weapon, EventTypes } from './Enums';
import { CityState } from './reducers/CityReducer';
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

export interface LocationEvent {
  drug: DrugForSale,
  message: string,
  event: EventTypes 
}

export type DrugMap = {
  [id in Drug]: number;
};

export interface RootState {
  dopeState: DopeState;
  cityState: CityState;
}
