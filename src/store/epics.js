import { combineEpics } from 'redux-observable'
import coreEpics from '../core/coreepics'

export default function createRootEpic () {
  return combineEpics(...coreEpics)
}
