import React from 'react'
import { Card, Segment, Icon, Image, Search, Popup } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import Columns from 'grommet/components/Columns'

const audio = () => {
  document.getElementById('audio').play()
}

const CardsMaker = props =>
  <Columns size='medium' justify='center' masonry
    maxCount={3} responsive>
    {props.searchResults.map((element, index) =>
      <Card
        key={index}
        textSize='small'
        colorIndex='light-1'
        margin='small'
        contentPad='medium'
        direction='column'>
        <Card.Content>
          <Image floated='right'>
            <Popup trigger={
              <Icon link name='plus'
                onClick={() => props.addWord({ ...element, pronounciation: props.pronounciation })}
              />}
              content='Add to My Flashcards' />
          </Image>
          <Card.Header>
            {props.searchString}
          </Card.Header>
          <Card.Meta>
            {element.meaning}
          </Card.Meta>
          <Card.Description>
            {element.example}
          </Card.Description>
        </Card.Content>
      </Card>)}
  </Columns>

CardsMaker.propTypes = {
  searchResults: PropTypes.array,
  searchString: PropTypes.string,
  addWord: PropTypes.func,
  filterWords: PropTypes.func,
  pronounciation: PropTypes.string
}

const ExploreSenses = ({
  search,
  results,
  searchString,
  addWord,
  filterWords,
  updateSearchString,
  isLoading,
  setLoader
}) => {
  const handleSearchChange = (e, value) => {
    setLoader()
    updateSearchString(value)
    search(value)
  }
  return (
    <div className='main-container'>
      <audio id='audio' src={results.pronounciation} />
      <Search
        size='big'
        onSearchChange={handleSearchChange}
        open={false}
        icon='search'
        value={searchString}
        placeholder='Explore new words..'
        className='animated fadeIn' />
      {results.words.length !== 0 && !isLoading && results.pronounciation &&
        <Popup position='right center' trigger={<Icon inverted link name='volume up' size='huge'
          onClick={audio} />} content='Click to hear pronounciation' />
      }
      {isLoading && <Icon loading size='huge' name='rocket' />}
      {results.words.length !== 0 && !isLoading && <Segment basic>
        <CardsMaker searchResults={results.words} searchString={searchString}
          addWord={addWord} filterWords={filterWords} pronounciation={results.pronounciation} />
      </Segment>}
      {((results.words.length === 0 && searchString.trim() !== '') && !isLoading) && <h1>No results found</h1>}
    </div>
  )
}

ExploreSenses.propTypes = {
  search: PropTypes.string,
  results: PropTypes.object,
  searchString: PropTypes.string,
  filterWords: PropTypes.func,
  updateSearchString: PropTypes.func,
  isLoading: PropTypes.boolean,
  setLoader: PropTypes.func,
  addWord: PropTypes.func
}

export default ExploreSenses
