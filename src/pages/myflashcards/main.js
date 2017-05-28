import React, { Component } from 'react'
import { Card, Segment, Icon, Image, Search, Popup, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const searchGoogle = (word) => {
  window.open('http://www.google.com/search?q=' + word, '_blank')
}

const CardsMaker = ({ deleteWord, wordsArray, multipleSelect, select }) =>
  <Card.Group itemsPerRow={4}>
    {wordsArray.map((element, index) =>
      <Card key={index} className='animated fadeIn' link={multipleSelect} >
        <Card.Content onClick={() => { multipleSelect && select(index)}}>
          <Image floated='right'>
            <Popup
              trigger={<Icon link name='google' onClick={() => searchGoogle(element.word)} />}
              content='Search this word on Google' />
            <Popup
              trigger={<Icon link name='close' onClick={() => deleteWord(element._id)} />}
              content='Delete Flashcard from your saved collection' />
          </Image>
          <Card.Header>
            {element.word.word}
          </Card.Header>
          <Card.Meta>
            {element.word.meaning}
          </Card.Meta>
          <Card.Description>
            {element.word.example}
          </Card.Description>
        </Card.Content>
      </Card>)}
  </Card.Group>

export default class MyFlashcards extends Component {
  componentDidMount () {
    this.props.initState()
  }
  handleSearchChange (e, value, t) { t.props.filterWords(value) }
  render () {
    return (
      <div className='main-container'>
        <Search
          size='big'
          onSearchChange={(e,v) => this.handleSearchChange(e, v, this)}
          open={false}
          icon='filter'
          placeholder='Search your words..'
          value={this.props.searchString}
          className='animated fadeIn'
        />
        { this.props.isLoading && <Icon loading size='huge' name='rocket' /> }
        <Segment basic>
          <CardsMaker wordsArray={this.props.filteredArray} />
        </Segment>
      </div>

    )
  }
}

MyFlashcards.propTypes = {
  initState: PropTypes.func
}
