import { Drug, Weapon } from './Enums';

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

export interface DopeState {
  drugs: DrugMap,
  cash: number,
  bank: number,
  loan: number,
  health: number,
  weapon: Weapon,
}

export interface RootState {
  dope: DopeState
}