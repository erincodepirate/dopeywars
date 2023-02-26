import { AnyAction } from "redux";
import { Drug } from "../Enums";
import { DrugSale } from "../Interfaces";

export enum Actions {
  BUY_DRUG = 'BUY_DRUG',
  SELL_DRUG = 'SELL_DRUG',
  DUMP_DRUG = 'DUMP_DRUG',
  DECREMENT_DAY = 'DECREMENT_DAY',
}

export interface DopeAction extends AnyAction {
  type: Actions,
  payload?: DrugSale
}

export const buyDrug = (drugSale: DrugSale) => (
  {
    type: Actions.BUY_DRUG,
    payload: drugSale,
  }
);

export const sellDrug = (drugSale: DrugSale) => (
  {
    type: Actions.SELL_DRUG,
    payload: drugSale,
  }
);

export const decrementDay = () => (
  {
    type: Actions.DECREMENT_DAY,
  }
);
