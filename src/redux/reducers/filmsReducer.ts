import { mockFilms } from "../../mock/films/mockFilms"
import { FilmState, FilmsActionTypes, FilmsActions } from "../../types/films"


const initialState:FilmState = {
    items: mockFilms,
}

export function filmsReducer (state: FilmState = initialState, action: FilmsActions): FilmState{
    switch (action.type){
        case FilmsActionTypes.UPLOAD_FILM:
            return {items: new Map([...state.items, [action.payload.id, action.payload]]) }

        case FilmsActionTypes.SET_RATING:
            const newFilm = state.items.get(action.payload.filmId)

            if (!newFilm) return state

            newFilm.userRating = action.payload.rating

            const newState = state.items.set(newFilm.id, newFilm)

            return {items: newState}
        
        case FilmsActionTypes.ADD_COMMENT:
            const filmWithComments = state.items.get(action.payload.filmId)

            if (!filmWithComments) return state
            
            filmWithComments.comments.unshift(action.payload.comment)

            const newFilmsWithComments =  state.items.set(filmWithComments.id, filmWithComments)

            return {items: newFilmsWithComments}
            
        default:
            return state
    }
}