import React, { Component } from 'react'
import { Card, Segment, Icon, Image, Search, Popup, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const searchGoogle = (word) => {
  window.open('http://www.google.com/search?q=' + word, '_blank')
}

const CardsMaker = ({ deleteWords, filteredArray, multipleSelect, select }) =>
  <Card.Group itemsPerRow={4}>
    {filteredArray.map((element, index) =>
      <Card key={index} className='animated fadeIn' link={multipleSelect} >
        <Card.Content onClick={() => { multipleSelect && select(index) }}>
          <Image floated='right'>
            {!multipleSelect && <div>
              <Popup
                trigger={<Icon link name='google' onClick={() => searchGoogle(element.word)} />}
                content='Search this word on Google' />
              <Popup
                trigger={<Icon link name='close' onClick={() => deleteWords([element.word.id])} />}
                content='Delete Flashcard from your saved collection' />
            </div>}
            {multipleSelect && element.hasOwnProperty('selected') && element.selected && <Icon link name='checkmark' />}
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

CardsMaker.propTypes = {
  deleteWords: PropTypes.func,
  filteredArray: PropTypes.array,
  multipleSelect: PropTypes.bool,
  select: PropTypes.func
}

export default class MyFlashcards extends Component {
  componentDidMount () {
    this.props.initState()
  }
  handleSearchChange (e, value, t) { t.props.filterWords(value) }
  render () {
    return (
      <div className='main-container'>
        <Button toggle active={this.props.multipleSelect} onClick={this.props.toggleMultipleSelect}>
          Select Multiple
        </Button>
        {!this.props.multipleSelect && <Button toggle active={this.props.sorted} onClick={this.props.sort}>
          A-Z
        </Button>}
        {this.props.multipleSelect && <Button onClick={this.props.multipleDeleteTransformer}>
          Delete
        </Button>}
        <Search
          size='big'
          onSearchChange={(e, v) => this.handleSearchChange(e, v, this)}
          open={false}
          icon='filter'
          placeholder='Search your words..'
          value={this.props.searchString}
          className='animated fadeIn'
        />
        { this.props.isLoading && <Icon loading size='huge' name='rocket' /> }
        <Segment basic>
          <CardsMaker filteredArray={this.props.filteredArray} deleteWords={this.props.deleteWords}
            multipleSelect={this.props.multipleSelect} select={this.props.select} />
        </Segment>
      </div>
    )
  }
}

MyFlashcards.propTypes = {
  initState: PropTypes.func,
  multipleSelect: PropTypes.bool,
  toggleMultipleSelect: PropTypes.func,
  sorted: PropTypes.bool,
  sort: PropTypes.func,
  multipleDeleteTransformer: PropTypes.func,
  searchString: PropTypes.string,
  isLoading: PropTypes.bool,
  filteredArray: PropTypes.array,
  deleteWords: PropTypes.func,
  select: PropTypes.func
}
