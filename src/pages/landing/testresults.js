import Meter from 'grommet/components/Meter'
import React, { Component } from 'react'
import { CreateGameStatSeries } from '../../pages/test/main'
import Box from 'grommet/components/Box'
import TestCard from '../test/testcard'

const sampleWords = [
  {
    word: 'Eldritch',
    meaning: 'weird and sinister or ghostly',
    example: 'an eldritch screech'
  },
  {
    word: 'Eldritch',
    meaning: 'weird and sinister or ghostly',
    example: 'an eldritch screech'
  },
  {
    word: 'Eldritch',
    meaning: 'weird and sinister or ghostly',
    example: 'an eldritch screech'
  }
]

export default class SampleTest extends Component {
  constructor () {
    super()
    this.state = {
      wordIndex: 0,
      correctCount: 0,
      incorrectCount: 0,
      totalWords: sampleWords.length
    }
  }

  upWord () {
    if (this.state.wordIndex < (sampleWords.length - 1)) {
      this.setState({
        totalWords: this.state.totalWords - 1,
        wordIndex: this.state.wordIndex + 1,
        correctCount: this.state.correctCount + 1
      })
    } else {
      this.setState({
        wordIndex: 0,
        correctCount: 0,
        incorrectCount: 0,
        totalWords: sampleWords.length
      })
    }
  }

  downWord () {
    if (this.state.wordIndex < (sampleWords.length - 1)) {
      this.setState({
        totalWords: this.state.totalWords - 1,
        wordIndex: this.state.wordIndex + 1,
        incorrectCount: this.state.incorrectCount + 1
      })
    } else {
      this.setState({
        wordIndex: 0,
        incorrectCount: 0,
        correctCount: 0,
        totalWords: sampleWords.length
      })
    }
  }

  render () {
    return <Box justify='between' direction='row' align='center'>
      <Meter
        series={CreateGameStatSeries(this.state.correctCount, this.state.incorrectCount, this.state.totalWords)}
        size='medium'
        type='spiral' />
      <TestCard word={sampleWords[this.state.wordIndex].word}
        meaning={sampleWords[this.state.wordIndex].meaning}
        example={sampleWords[this.state.wordIndex].example}
        hiddenCondition={false}
        revealedCondition
        completedCondition={false}
        revealFn={() => null}
        onCorrect={() => this.upWord()}
        onIncorrect={() => this.downWord()}
      />
    </Box>
  }
}
