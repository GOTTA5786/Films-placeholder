import { legacy_createStore, combineReducers } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { filmsReducer } from "../reducers/filmsReducer";


const rootReducer = combineReducers({
    films: filmsReducer,
})

export const store = legacy_createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>

export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector


