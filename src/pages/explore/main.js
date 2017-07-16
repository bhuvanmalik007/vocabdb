import React from 'react'
import PropTypes from 'prop-types'
import Columns from 'grommet/components/Columns'
import Card from 'grommet/components/Card'
import Paragraph from 'grommet/components/Paragraph'
import Heading from 'grommet/components/Heading'
import styled from 'styled-components'
import Box from 'grommet/components/Box'
import GrommetSearch from 'grommet/components/Search'
import FormAdd from 'grommet/components/icons/base/FormAdd'
import GrommetButton from 'grommet/components/Button'
import Status from 'grommet/components/icons/Status'
import Animate from 'grommet/components/Animate'
import { FoldingCube } from 'better-react-spinkit'

const ShadowBox = styled(Box)`
  background-color: #ffffff;
  z-index: 3;
  width: 100%;
  box-shadow: 0 3px 4px 0 rgba(0,0,0,0.14), 0 3px 3px -2px rgba(0,0,0,0.12), 0 1px 8px 0 rgba(0,0,0,0.2);
  -webkit-box-shadow: 0 3px 4px 0 rgba(0,0,0,0.14), 0 3px 3px -2px rgba(0,0,0,0.12), 0 1px 8px 0 rgba(0,0,0,0.2);
`

const LowPadButton = styled(GrommetButton)`
  border-radius: 0px;
  span {
    padding: 10px !important;
  }
`

const IconButton = props =>
  <Box pad='none'>
    <LowPadButton {...props} />
  </Box>

const CardsMaker = props =>
  <Animate enter={{ 'animation': 'fade', 'duration': 1000, 'delay': 100 }}
    keep={false} visible>
    <Columns size='medium' justify='center'
      maxCount={3} masonry>
      {props.searchResults.map((element, index) =>
        <Card
          key={index}
          textSize='small'
          colorIndex='light-1'
          margin='small'
          contentPad='medium'
          direction='column'>
          <Box align='end'>
            {!element.selected ? <IconButton icon={<FormAdd />}
              onClick={() => props.addWord({ ...element, pronounciation: props.pronounciation, index })} />
              : <Status value='ok' />}
          </Box>
          <Heading>
            {element.word}
          </Heading>
          <Paragraph margin='small' size='large'>
            {element.meaning}
          </Paragraph>
          <Paragraph margin='small'>
            {element.example}
          </Paragraph>
        </Card>)}
    </Columns>
  </Animate>

CardsMaker.propTypes = {
  searchResults: PropTypes.array,
  searchString: PropTypes.string,
  addWord: PropTypes.func,
  filterWords: PropTypes.func,
  pronounciation: PropTypes.string
}

const ExploreSenses = ({
  search,
  words,
  pronounciation,
  searchString,
  addWord,
  filterWords,
  updateSearchString,
  isLoading,
  setLoader
}) => {
  const handleSearchChange = e => {
    updateSearchString(e.target.value)
  }
  return (
    <div className='main-container'>
      <ShadowBox justify='center' align='center' direction='row' pad='medium'>
        <GrommetSearch
          inline
          fill
          iconAlign='start'
          onDOMChange={handleSearchChange}
          placeholder='Explore new words..'
          value={searchString} />
      </ShadowBox>

      {isLoading && <Box full justify='center' align='center'>
        <FoldingCube size={100} color='#865cd6' />
      </Box>}

      {words.length !== 0 && !isLoading && <Box full>
        <CardsMaker searchResults={words} searchString={searchString}
          addWord={addWord} filterWords={filterWords} pronounciation={pronounciation} />
      </Box>}

      {((words.length === 0 && searchString.trim() !== '') && !isLoading) && <h1>No results found</h1>}
    </div>
  )
}

ExploreSenses.propTypes = {
  search: PropTypes.func,
  words: PropTypes.array,
  pronounciation: PropTypes.string,
  searchString: PropTypes.string,
  filterWords: PropTypes.func,
  updateSearchString: PropTypes.func,
  isLoading: PropTypes.bool,
  setLoader: PropTypes.func,
  addWord: PropTypes.func
}

export default ExploreSenses
