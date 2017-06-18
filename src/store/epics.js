import { combineEpics } from 'redux-observable'
import coreEpics from '../core/coreepics'
import myFlashcardsEpics from '../pages/myflashcards/epics'
import exploreEpics from '../pages/explore/epics'
import testEpics from '../pages/test/epics'

export default function createRootEpic () {
  return combineEpics(...coreEpics, ...myFlashcardsEpics, ...exploreEpics, ...testEpics)
}
