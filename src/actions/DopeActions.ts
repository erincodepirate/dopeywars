import { AnyAction } from "redux";
import { DrugSale } from "../Interfaces";

export enum Actions {
    BUY_DRUG = 'BUY_DRUG',
    SELL_DRUG = 'SELL_DRUG'
}

export interface DopeAction extends AnyAction {
    type: Actions,
    payload?: DrugSale
}

export const buyDrug = (drugSale:DrugSale) => (
    {
      type: Actions.BUY_DRUG,
      payload: drugSale,
    }
);

export const sellDrug = (drugSale:DrugSale) => (
    {
      type: Actions.SELL_DRUG,
      payload: drugSale,
    }
);
  