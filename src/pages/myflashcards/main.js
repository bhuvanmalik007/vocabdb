import React, { Component } from 'react'
import { Card, Segment, Icon, Image, Search, Popup, Button, Dropdown } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { selectedCountReducer, reduceToSenseIds } from '../../futils/selectionreducers'

const searchGoogle = (word) => {
  window.open('http://www.google.com/search?q=' + word, '_blank')
}

const audio = (index) => {
  document.getElementById('audio' + index).play()
}

const CardsMaker = ({ deleteFromAll, filteredArray, multipleSelect, select, currentListId, deleteFromList }) =>
  <Card.Group itemsPerRow={4} >
    {filteredArray.map((element, index) =>
      <Card key={index} className='animated fadeIn' link={multipleSelect} >
        <Card.Content onClick={() => { multipleSelect && select(index) }}>
          <Image floated='right'>
            {!multipleSelect && <div>
              <audio id={'audio' + index} src={element.word.pronounciation} />
              <Popup
                trigger={<Icon link name='volume up' onClick={() => audio(index)} />}
                content='Click to hear pronounciation' />
              <Popup
                trigger={<Icon link name='google' onClick={() => searchGoogle(element.word)} />}
                content='Search this word on Google' />
              <Popup
                trigger={<Icon link name='close'
                  onClick={() => currentListId === 'all'
                    ? deleteFromAll({ senseIds: [element.word.id] })
                    : deleteFromList({ listId: currentListId, senseIds: [element.word.id] })} />}
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
  deleteFromAll: PropTypes.func,
  deleteFromList: PropTypes.func,
  filteredArray: PropTypes.array,
  multipleSelect: PropTypes.bool,
  select: PropTypes.func,
  currentListId: PropTypes.string
}

export default class MyFlashcards extends Component {
  componentDidMount () {
    this.props.initState()
  }
  handleSearchChange (e, value, t) { t.props.filterWords(value) }
  render () {
    return (
      <div className='main-container'>
        <div className='menu-items'>
          <Button icon='add square' onClick={() =>
            this.props.showModal({ header:'CREATE NEW LIST', content: 'ADD_LIST' })}
          />
          {this.props.multipleSelect && <Button content='ADD TO A LIST'
            disabled={selectedCountReducer(this.props.filteredArray) === 0}
            onClick={() =>
              this.props.showModal({ header:'SELECT A LIST TO ADD WORDS TO', content: 'SELECT_LIST' })}
                                        />}
          {!this.props.multipleSelect && <Dropdown
            text='Select List'
            closeOnChange
            floating
            labeled
            button
            selection
            selectOnBlur={false}
            className='icon'
            icon='list layout'
            onChange={(e, obj) => obj.value === 'all' ? this.props.fetchAll() : this.props.onListChange(obj.value)}
            options={this.props.lists.map((list, index) => ({ key: index, text: list.listName, value: list.listId }))}
                                         />}
          {!this.props.multipleSelect && this.props.currentListId !== 'all' && <Button icon='setting'
            onClick={() =>
              this.props.showModal({ header:'LIST SETTINGS', content: 'LIST_SETTINGS' })}
                                                                               />}
          {!this.props.multipleSelect && <Search
            size='big'
            onSearchChange={(e, v) => this.handleSearchChange(e, v, this)}
            open={false}
            icon='filter'
            placeholder='Search your words..'
            value={this.props.searchString}
            className='animated fadeIn align-center' />
          }
          <Button toggle active={this.props.multipleSelect} content='Select Multiple'
            onClick={this.props.toggleMultipleSelect} />
          {this.props.multipleSelect && <Button onClick={() => this.props.currentListId === 'all'
            ? this.props.deleteFromAll({ senseIds: reduceToSenseIds(this.props.filteredArray) })
            : this.props.deleteFromList({ listId: this.props.currentListId,
              senseIds: reduceToSenseIds(this.props.filteredArray) })}
            content='DELETE' disabled={selectedCountReducer(this.props.filteredArray) === 0} />}
          <Button toggle active={this.props.sorted} content='A-Z' onClick={this.props.sort} />
        </div>
        { this.props.isLoading && <Icon loading size='huge' name='rocket' /> }
        <Segment basic>
          <CardsMaker filteredArray={this.props.filteredArray} deleteFromAll={this.props.deleteFromAll}
            multipleSelect={this.props.multipleSelect} select={this.props.select}
            currentListId={this.props.currentListId} deleteFromList={this.props.deleteFromList} />
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
  searchString: PropTypes.string,
  isLoading: PropTypes.bool,
  filteredArray: PropTypes.array,
  deleteFromAll: PropTypes.func,
  deleteFromList: PropTypes.func,
  select: PropTypes.func,
  lists: PropTypes.array,
  onListChange: PropTypes.func,
  fetchAll: PropTypes.func,
  showModal: PropTypes.func,
  currentListId: PropTypes.string
}
