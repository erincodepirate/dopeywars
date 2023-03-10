import { createAction } from "@reduxjs/toolkit";
import { HighScore } from "../Interfaces";

export const newScore = createAction<HighScore>('NEW_SCORE');
export const clearScores = createAction('CLEAR_SCORES');