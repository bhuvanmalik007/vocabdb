import React, { Component } from 'react'
import { Card, Segment, Icon, Image, Search, Popup, Button, Dropdown } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import ReduxModal from '../../connectors/reduxmodal'
import AddList from '../../connectors/addlist'
import SelectListForm from '../../connectors/addwordlistselect'

const searchGoogle = (word) => {
  window.open('http://www.google.com/search?q=' + word, '_blank')
}

const audio = (index) => {
  document.getElementById('audio' + index).play()
}

const CardsMaker = ({ deleteWords, filteredArray, multipleSelect, select }) =>
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
        <div className='menu-items'>
          <ReduxModal triggerButton={<Button icon='add square' onClick={this.props.toggleModalVisibility} />}
            header='CREATE NEW LIST' content={<AddList />}
          />
          {this.props.multipleSelect && <ReduxModal
            triggerButton={<Button content='ADD TO A LIST'
              onClick={this.props.toggleModalVisibility} />}
            header='SELECT A LIST TO ADD WORDS TO'
            content={<SelectListForm />}
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
          {this.props.multipleSelect && <Button onClick={this.props.multipleDeleteTransformer}
            content='DELETE' />}
          <Button toggle active={this.props.sorted} content='A-Z' onClick={this.props.sort} />
        </div>
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
  select: PropTypes.func,
  lists: PropTypes.array,
  onListChange: PropTypes.func,
  fetchAll: PropTypes.func,
  toggleModalVisibility: PropTypes.func
}
