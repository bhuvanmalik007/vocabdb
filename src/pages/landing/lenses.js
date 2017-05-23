import { lensProp, view, set } from 'ramda'

const moviesLens = lensProp('movies')
export const setMovies = (association, value) => set(moviesLens, value, association)
export const getMovies = association => view(moviesLens, association)
