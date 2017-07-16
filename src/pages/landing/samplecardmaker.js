import React, { Component } from 'react'
import Animate from 'grommet/components/Animate'
import Box from 'grommet/components/Box'
import { Hovercard } from '../myflashcards/localcomponents'
import Columns from 'grommet/components/Columns'
import Status from 'grommet/components/icons/Status'
import Paragraph from 'grommet/components/Paragraph'
import Heading from 'grommet/components/Heading'
import TextInput from 'grommet/components/TextInput'
import styled from 'styled-components'

const SampleTextInput = styled(TextInput)`
  margin-left: 10px;
  border-radius: 0px;
  &:focus{
    border-color: #865cd6 !important;
  }
`

const superFilteredArray = [
  {
    word: 'mordant',
    meaning: 'bitingly sarcastic',
    selected: false
  },
  {
    word: 'purism',
    meaning: 'strict observance of or insistence on traditional correctness',
    selected: false
  },
  {
    word: 'orison',
    meaning: 'prayer',
    selected: false
  }
]

export default class SampleCardMaker extends Component {
  constructor () {
    super()
    this.state = {
      filteredArray: superFilteredArray,
      searchText: ''
    }
  }

  onCardClick (index) {
    let filteredArray = this.state.filteredArray
    filteredArray[index].selected = !filteredArray[index].selected // yuck
    this.setState({
      filteredArray
    })
  }

  // yuck
  onSearch (searchText) {
    let filteredArray =
    searchText ? this.state.filteredArray.filter(element => element.word.search(searchText) > -1) : superFilteredArray
    this.setState({
      filteredArray,
      searchText
    })
  }

  render () {
    return <Box pad='small'>
      <Animate enter={{ 'animation': 'slide-up', 'duration': 1000, 'delay': 100 }}
        keep visible='scroll'>
        <SampleTextInput
          value={this.state.searchText}
          placeHolder='Search Words'
          onDOMChange={(e) => this.onSearch(e.target.value)} />
        <Columns size='small' justify='start' pad='none'
          maxCount={2} masonry>
          {this.state.filteredArray.map((element, index) =>
            <Box pad='none' key={index}>
              <Hovercard
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
