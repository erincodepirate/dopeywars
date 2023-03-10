import _ from 'lodash';
import { createReducer } from '@reduxjs/toolkit';
import { HighScore } from '../Interfaces';
import { clearScores, newScore } from '../actions/ScoreActions';

export interface ScoreState {
    scores: HighScore[]
}

const dummyscores = []

const INITIAL_STATE: ScoreState = {
    scores: []
};

export const scoreReducer = createReducer(
    INITIAL_STATE,
    (builder) => {
        builder
        .addCase(newScore, (state, action) => {
            let s = _.cloneDeep(state);
            // add a new score, sort the scores by cash, remove lowest if more than 5
            s.scores.push(action.payload);
            s.scores = _.orderBy(s.scores, "cash", "desc");
            if (s.scores.length > 5) {
                s.scores.pop();
            }
            return s;
        })
        .addCase(clearScores, (state, action) => {
            let s = _.cloneDeep(state);
            s.scores = [];
            return s;
        })
    }
)