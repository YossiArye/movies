
// import { Action } from '@ngrx/store'
import { Movie } from '../models/movie.model'
import * as MovieActions from '../actions/movie.actions'

// Section 1
const initialState: Movie = {
    Id: 1,
    Title: "Dog Day Afternoon",
    Year: 1975,
    Runtime: 125,
    Genre: "Drama",
    Director: "Sidney Lumet"
}

// Section 2
export function reducer(state: Movie[] = [initialState], action: MovieActions.Actions) {

    // Section 3
    switch (action.type) {
        case MovieActions.ADD_MOVIE:
            return [...state, action.payload];

        case MovieActions.REMOVE_MOVIE:
            state.splice(action.payload, 1)
            return state;

        case MovieActions.UPDATE_MOVIE:
            state.splice(action.payload.index, 1 , action.payload.movie)
            return state;

        default:
            return state;
    }
}