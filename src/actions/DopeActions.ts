import { createAction } from "@reduxjs/toolkit";
import { DrugSale, DrugForSale, NewBag } from "../Interfaces";

export const buyDrug = createAction<DrugSale>('BUY_DRUG');
export const sellDrug = createAction<DrugSale>('SELL_DRUG');
export const decrementDay = createAction('DECREMENT_DAY');
export const freeDrug = createAction<DrugForSale>('FREE_DRUG');
export const payLoan = createAction<number>('PAY_LOAN');
export const borrowMoney = createAction<number>('BORROW_MONEY');
export const depositMoney = createAction<number>('DEPOSIT_MONEY');
export const withdrawMoney = createAction<number>('WITHDRAW_MONEY');
export const newGame = createAction('NEW_GAME');
export const upgradeBag = createAction<NewBag>('UPGRADE_BAG');
export const caughtByPolice = createAction('CAUGHT_BY_POLICE');
