import React, { Component } from 'react'
import { Segment, Icon, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { selectedCountReducer, reduceToSenseIds } from '../../futils/selectionreducers'
import Box from 'grommet/components/Box'
import Card from 'grommet/components/Card'
import Paragraph from 'grommet/components/Paragraph'
import Heading from 'grommet/components/Heading'
import Columns from 'grommet/components/Columns'
import GrommetButton from 'grommet/components/Button'
import AddIcon from 'grommet/components/icons/base/Add'
import Multiple from 'grommet/components/icons/base/Multiple'
import Select from 'grommet/components/Select'
import GrommetSearch from 'grommet/components/Search'
import styled from 'styled-components'
import Volume from 'grommet/components/icons/base/Volume'
import PlatformGoogle from 'grommet/components/icons/base/PlatformGoogle'
import Close from 'grommet/components/icons/base/Close'
import Status from 'grommet/components/icons/Status'

const StyledSelect = styled(Select)`
  input {
    border-radius: 0px;
    padding: 12px;
  }
`
const SharpButton = styled(GrommetButton)`
  border-radius: 0px;
`

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

const DashButton = props =>
  <Box pad='medium'>
    <SharpButton {...props} />
  </Box>

const IconButton = props =>
  <Box pad='medium'>
    <LowPadButton {...props} />
  </Box>

const searchGoogle = word => {
  window.open('http://www.google.com/search?q=' + word, '_blank')
}

const audio = (index) => {
  document.getElementById('audio' + index).play()
}

const CardsMaker = ({ deleteFromAll, filteredArray, multipleSelect, select, currentListId, deleteFromList }) =>
  <Box pad='medium' full='horizontal'>
    <Columns size='medium' justify='center'
      maxCount={3} masonry>
      {filteredArray.length && filteredArray.map((element, index) =>
        <Box onClick={() => { multipleSelect && select(index) }} pad='none' key={index}>
          <Card
            textSize='small'
            colorIndex='light-1'
            margin='small'
            contentPad='medium'
            direction='column'>
            <Box align='end'>
              {multipleSelect && element.hasOwnProperty('selected') && element.selected &&
                <Status value='ok' />}
            </Box>
            <Heading>
              {element.word.word}
            </Heading>
            <Paragraph margin='small' size='large'>
              {element.word.meaning}
            </Paragraph>
            <Paragraph margin='small'>
              {element.word.example}
            </Paragraph>
            <Box align='end'>
              {!multipleSelect && <div>
                <GrommetButton icon={<Volume />} onClick={() => audio(index)} id='VolumeUp' />
                <audio id={'audio' + index} src={element.word.pronounciation} />
                <GrommetButton icon={<PlatformGoogle />} onClick={() => searchGoogle(element.word.word)} />
                <GrommetButton onClick={() => currentListId === 'all'
                  ? deleteFromAll({ senseIds: [element.word.id] })
                  : deleteFromList({ listId: currentListId, senseIds: [element.word.id] })}
                  icon={<Close />} />
              </div>}
            </Box>
          </Card>
        </Box>) || <div />}
    </Columns>
  </Box>

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
        <ShadowBox justify='center' align='center' direction='row' pad='medium'>

          <IconButton icon={<AddIcon />} onClick={() =>
            this.props.showModal({ header: 'CREATE NEW LIST', content: 'ADD_LIST' })}
          />

          {this.props.multipleSelect &&
            <DashButton label='ADD TO A LIST'
              disabled={selectedCountReducer(this.props.filteredArray) === 0}
              onClick={() =>
                this.props.showModal({ header: 'SELECT A LIST TO ADD WORDS TO', content: 'SELECT_LIST' })}
            />
          }

          {!this.props.multipleSelect &&
            <StyledSelect
              placeHolder='Select List'
              className='icon'
              icon='list layout'
              onChange={(e, obj) => obj.value === 'all' ? this.props.fetchAll() : this.props.onListChange(obj.value)}
              options={
                this.props.lists.map((list, index) => ({ key: index, text: list.listName, value: list.listId }))
              }
            />
          }

          {!this.props.multipleSelect && this.props.currentListId !== 'all' &&
            <Box pad='small'>
              <Button icon='setting'
                onClick={() =>
                  this.props.showModal({ header: 'LIST SETTINGS', content: 'LIST_SETTINGS' })}
              />
            </Box>
          }

          {!this.props.multipleSelect &&
            <Box pad='small'>
              <GrommetSearch
                inline
                iconAlign='start'
                onDOMChange={(e) => this.props.filterWords(e.target.value)}
                placeholder='Search your words..'
                value={this.props.searchString} />
            </Box>
          }

          <IconButton icon={<Multiple />} primary={this.props.multipleSelect}
            onClick={this.props.toggleMultipleSelect} />

          {this.props.multipleSelect &&
            <DashButton onClick={() => this.props.currentListId === 'all'
              ? this.props.deleteFromAll({ senseIds: reduceToSenseIds(this.props.filteredArray) })
              : this.props.deleteFromList({ listId: this.props.currentListId,
                senseIds: reduceToSenseIds(this.props.filteredArray) })}
              label='DELETE' disabled={selectedCountReducer(this.props.filteredArray) === 0} />
          }

          <DashButton primary={this.props.sorted} onClick={this.props.sort} label='A-Z' />

        </ShadowBox>

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
  filterWords: PropTypes.func,
  lists: PropTypes.array,
  onListChange: PropTypes.func,
  fetchAll: PropTypes.func,
  showModal: PropTypes.func,
  currentListId: PropTypes.string
}
