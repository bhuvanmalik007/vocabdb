import React, { Component } from 'react'
import Box from 'grommet/components/Box'
import TestCard from '../test/testcard'
import { ColoredMeter } from '../test/main'
import Value from 'grommet/components/Value'
import { TestPercentageLens } from './lenses'

const sampleWords = [
  {
    word: 'Eldritch',
    meaning: 'weird and sinister or ghostly',
    example: 'an eldritch screech'
  },
  {
    word: 'magnanimous',
    meaning: 'generous or forgiving, especially towards a rival or less powerful person',
    example: 'she should be magnanimous in victory'
  },
  {
    word: 'incredulous',
    meaning: '(of a person or their manner) unwilling or unable to believe something',
    example: 'an incredulous gasp'
  },
  {
    word: 'squeamish',
    meaning: 'having fastidious moral views; scrupulous',
    example: 'she was not squeamish about using her social influence in support of her son'
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
      <Box direction='column' justify='center'
        pad={{ horizontal: 'large', vertical: 'medium' }} >
        <Value value={this.state.correctCount}
          label='Correct' />
        <ColoredMeter color='#8cc800'
          percentComplete={TestPercentageLens(this.state, 'correctCount')} />
        <Value value={this.state.incorrectCount} label='Incorrect' />
        <ColoredMeter color='#ff324d'
          percentComplete={TestPercentageLens(this.state, 'incorrectCount')} />
        <Value value={this.state.totalWords} label='Remaining' />
        <ColoredMeter color='#0a64a0'
          percentComplete={TestPercentageLens(this.state, 'totalWords')} />
      </Box>
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
