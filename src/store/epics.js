import { combineEpics } from 'redux-observable'
import coreEpics from '../core/coreepics'
import myFlashcardsEpics from '../pages/myflashcards/epics'
import exploreEpics from '../pages/explore/epics'
import locationEpic from '../core/locationepic'

export default function createRootEpic () {
  return combineEpics(...coreEpics, ...myFlashcardsEpics, ...exploreEpics, ...locationEpic)
}
