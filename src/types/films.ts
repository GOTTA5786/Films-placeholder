export interface Film {
    id: number,
    title: string,
    rating: string,
    userRating?: number,
    comments: string[],
    description: string,
    poster: string,
    length: string,
    appendDate: number,
}

export type MappedFilms = Map<number, Film>

export interface FilmState {
    items: MappedFilms
}

export enum FilmsActionTypes {
    UPLOAD_FILM = 'UPLOAD_FILM',
    SET_RATING = 'SET_RATING',
    ADD_COMMENT = 'ADD_COMMENT'
}

interface AddCommentAction{
    type: FilmsActionTypes.ADD_COMMENT,
    payload:{
        filmId: number,
        comment: string
    }
}

interface UploadFilmsAction {
    type: FilmsActionTypes.UPLOAD_FILM,
    payload: Film
}

interface SetRatingAction {
    type: FilmsActionTypes.SET_RATING,
    payload:{
        filmId: number,
        rating: number
    }
}

export type FilmsActions = UploadFilmsAction | SetRatingAction | AddCommentAction