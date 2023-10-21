
import { Film, FilmsActionTypes, FilmsActions } from "../../types/films";


export function uploadFilm(film: Film):FilmsActions{
    return {type:FilmsActionTypes.UPLOAD_FILM, payload: film}
}

export function setUserRating(filmId: number, rating: number):FilmsActions{
    return {type:FilmsActionTypes.SET_RATING, payload: { filmId:filmId, rating: rating }}
}

export function addComment(filmId: number, comment: string):FilmsActions{
    return {type:FilmsActionTypes.ADD_COMMENT, payload: { filmId:filmId, comment: comment }}
}