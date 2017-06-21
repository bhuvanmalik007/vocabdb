import React, { Component } from 'react'
import Animate from 'grommet/components/Animate'
import Box from 'grommet/components/Box'
import { Hovercard } from '../myflashcards/main'
import Columns from 'grommet/components/Columns'
import Status from 'grommet/components/icons/Status'
import Paragraph from 'grommet/components/Paragraph'
import Heading from 'grommet/components/Heading'

let filteredArray = [
  {
    word: 'mordant',
    meaning: 'bitingly sarcastic',
    selected:false
  },
  {
    word: 'orison',
    meaning: 'prayer',
    selected:true
  }
]

export default class SampleCardMaker extends Component {
  constructor () {
    super()
    this.state = {
      filteredArray
    }
  }

  onCardClick (index) {
    filteredArray = this.state.filteredArray
    filteredArray[index].selected = !filteredArray[index].selected // yuck
    this.setState({
      filteredArray
    })
  }

  render () {
    return <Box pad='small'>
      <Animate enter={{ 'animation': 'slide-up', 'duration': 1000, 'delay': 0 }}
        keep={false} visible='scroll'>
        <Columns size='small' justify='start'
          maxCount={2} masonry>
          {filteredArray.map((element, index) =>
            <Box onClick={() => this.onCardClick(index)} pad='none' key={index}>
              <Hovercard
                selecting
                size='small'
                textSize='small'
                colorIndex='light-1'
                margin='small'
                contentPad='medium'
                direction='column'>
                <Box align='end'>
                  {element.hasOwnProperty('selected') && element.selected &&
                    <Status value='ok' />}
                </Box>
                <Heading tag='h2'>
                  {element.word}
                </Heading>
                <Paragraph margin='small' size='large'>
                  {element.meaning}
                </Paragraph>
              </Hovercard>
            </Box>)}
        </Columns>
      </Animate>
    </Box>
  }
}
