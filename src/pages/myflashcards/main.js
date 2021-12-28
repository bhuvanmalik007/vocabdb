import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { selectedCountReducer, reduceToSenseIds } from '../../utils/selectionreducers'
import Box from 'grommet/components/Box'
import Paragraph from 'grommet/components/Paragraph'
import Heading from 'grommet/components/Heading'
import Columns from 'grommet/components/Columns'
import GrommetButton from 'grommet/components/Button'
import AddIcon from 'grommet/components/icons/base/Add'
import Multiple from 'grommet/components/icons/base/Multiple'
import Select from 'grommet/components/Select'
import GrommetSearch from 'grommet/components/Search'
import Volume from 'grommet/components/icons/base/Volume'
import PlatformGoogle from 'grommet/components/icons/base/PlatformGoogle'
import Close from 'grommet/components/icons/base/Close'
import Status from 'grommet/components/icons/Status'
import PlayIcon from 'grommet/components/icons/base/Play'
import Animate from 'grommet/components/Animate'
import { FoldingCube } from 'better-react-spinkit'
import SettingsOption from 'grommet/components/icons/base/SettingsOption'
import { ShadowBox, DashButton, IconButton, Hovercard, HelloCard } from './localcomponents'
import Label from 'grommet/components/Label'
import { Origin, Tooltip } from 'redux-tooltip'
import styled from 'styled-components'
import supportV2 from '../../utils/supportV2Api'

const PaddedTooltip = styled(Tooltip)`
  top: 170px !important;
`

const searchGoogle = word => {
  window.open('http://www.google.com/search?q=' + word, '_blank')
}

const audio = (index) => {
  document.getElementById('audio' + index).play()
}

const CardsMaker = ({ deleteFromAll, filteredArray, multipleSelect, select, currentListId,
  currentListMaster, deleteFromList }) => {
  if (!filteredArray.length) return <HelloCard />
  return <Animate enter={{ 'animation': 'fade', 'duration': 1000, 'delay': 0 }}
    keep={false} visible>
    <Box pad='medium' full='horizontal'>
      <Columns size='medium' justify='center'
        maxCount={3} masonry>
        {filteredArray.length && filteredArray.map((element, index) =>
          <Box onClick={() => { multipleSelect && select(index) }} pad='none' key={index}>
            <Hovercard
              selecting={multipleSelect}
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
              {element.word.lexicalCategory && <Label margin='none'>({supportV2(element.word.lexicalCategory)})</Label>}
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
                  {!currentListMaster && <GrommetButton onClick={() => currentListId === 'all'
                    ? deleteFromAll({ senseIds: [element.word.id] })
                    : deleteFromList({ listId: currentListId, senseIds: [element.word.id] })}
                    icon={<Close />} />}
                </div>}
              </Box>
            </Hovercard>
          </Box>) || <div />}
      </Columns>
    </Box>
  </Animate>
}

CardsMaker.propTypes = {
  deleteFromAll: PropTypes.func,
  deleteFromList: PropTypes.func,
  filteredArray: PropTypes.array,
  multipleSelect: PropTypes.bool,
  select: PropTypes.func,
  currentListId: PropTypes.string,
  currentListMaster: PropTypes.bool
}

export default class MyFlashcards extends Component {

  componentDidMount () {
    this.props.initState()
  }

  handleSearchChange (e, value, t) { t.props.filterWords(value) }

  render () {
    return (
      <div className='main-container'>
        <ShadowBox justify='center' align='center' direction='row' pad='small' flex='grow'>

          <PaddedTooltip name='tooltip' place='bottom' />
          <Origin name='tooltip' place='left' content='Create new list' delay={1000} delayOn='show' >
            <IconButton icon={<AddIcon />} onClick={() =>
              this.props.showModal({ header: 'CREATE NEW LIST', content: 'ADD_LIST' })}
            />
          </Origin>

          {this.props.multipleSelect &&
            <DashButton label='ADD TO A LIST'
              disabled={selectedCountReducer(this.props.filteredArray) === 0}
              onClick={() =>
                this.props.showModal({ header: 'SELECT A LIST TO ADD WORDS TO', content: 'SELECT_LIST' })}
            />
          }

          {!this.props.multipleSelect &&
            <Select stretch
              placeHolder='Select List'
              className='icon'
              icon='list layout'
              value={this.props.currentListName}
              onChange={(e) => e.value.value === 'all'
                ? this.props.fetchAll() : this.props.onListChange({
                  listId: e.value.value, listName: e.value.label, master: e.value.master
                })}
              options={
                this.props.lists.map((list, index) =>
                  ({ key: index, label: list.listName, value: list.listId, master: list.master || false }))
              }
            />
          }

          {!this.props.multipleSelect && this.props.currentListId !== 'all' && !this.props.currentListMaster &&
            <Box pad='small'>
              <IconButton icon={<SettingsOption />}
                onClick={() =>
                  this.props.showModal({ header: 'LIST SETTINGS', content: 'LIST_SETTINGS' })} />
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

          <Origin name='tooltip' place='left' content='Multiple select' delay={1000} delayOn='show' >
            <IconButton icon={<Multiple />} primary={this.props.multipleSelect}
              onClick={this.props.toggleMultipleSelect} />
          </Origin>

          {this.props.multipleSelect && !this.props.currentListMaster &&
            <DashButton onClick={() => this.props.currentListId === 'all'
              ? this.props.deleteFromAll({ senseIds: reduceToSenseIds(this.props.filteredArray) })
              : this.props.deleteFromList({ listId: this.props.currentListId,
                senseIds: reduceToSenseIds(this.props.filteredArray) })}
              label='DELETE' disabled={selectedCountReducer(this.props.filteredArray) === 0} />
          }

          <DashButton primary={this.props.sorted} onClick={this.props.sort} label='A-Z' />

          {!this.props.multipleSelect &&
            <IconButton icon={<PlayIcon />} onClick={() =>
              this.props.showModal({ content: 'SLIDESHOW', size: 'fullscreen' })}
            />
          }

        </ShadowBox>

        { this.props.isLoading && <Box full justify='center' align='center'>
          <FoldingCube size={100} color='#865cd6' />
        </Box> }

        {!this.props.isLoading &&
          <Box full>
            <CardsMaker filteredArray={this.props.filteredArray} deleteFromAll={this.props.deleteFromAll}
              multipleSelect={this.props.multipleSelect} select={this.props.select}
              currentListId={this.props.currentListId} deleteFromList={this.props.deleteFromList}
              currentListMaster={this.props.currentListMaster} />
          </Box>}
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
  currentListId: PropTypes.string,
  currentListName: PropTypes.string,
  currentListMaster: PropTypes.bool
}
