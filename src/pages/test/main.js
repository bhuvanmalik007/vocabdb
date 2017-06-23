import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Sidebar from 'grommet/components/Sidebar'
import Header from 'grommet/components/Header'
import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import Footer from 'grommet/components/Footer'
import Paragraph from 'grommet/components/Paragraph'
import Heading from 'grommet/components/Heading'
import Tiles from 'grommet/components/Tiles'
import Tile from 'grommet/components/Tile'
import Card from 'grommet/components/Card'
import Label from 'grommet/components/Label'
import Anchor from 'grommet/components/Anchor'
import ChapterAddIcon from 'grommet/components/icons/base/ChapterAdd'
import CaretBackIcon from 'grommet/components/icons/base/CaretBack'
import CloseIcon from 'grommet/components/icons/base/Close'
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark'
import Split from 'grommet/components/Split'
import RefreshIcon from 'grommet/components/icons/base/Refresh'
import TrashIcon from 'grommet/components/icons/base/Trash' //eslint-disable-line
import Meter from 'grommet/components/Meter'
import Value from 'grommet/components/Value'
import { Hovercard } from '../myflashcards/main'
import { TestWordsLens, TotalWordsLens } from './lenses'
import styled from 'styled-components'

const QuickSilverSidebar = styled(Sidebar)`
  background-color: #fff;
`
const SidebarActions = styled(Box)`
  font-size: 18px;
  background-color: #1B998B;
  transition: background-color 0.5s ease;
  color: #fff;
  &:hover{
    background-color: #44ABA0;
  }
`

export default class MyFlashcards extends Component {

  componentDidMount () {
    this.props.initTestState()
  }

  render () {
    return (
      <Split flex='right' priority='left' separator={false} showOnResponsive='both'>
        <QuickSilverSidebar colorIndex='neutral-4' size='medium'>
          {
              !this.props.ongoingTest &&
                <SidebarActions
                  colorIndex='grey-4'
                  size='large'
                  pad='medium'
                  justify='center'
                  align='center'
                  onClick={() =>
                    this.props.showModal({ header: 'SELECT A LIST FOR THE TEST', content: 'TEST_LIST_SELECT' })}>
                  Create New Game
                </SidebarActions>
          }
          {
            this.props.ongoingTest && <Box>{this.props.listName}</Box>
          }
          {/* {
            !this.props.ongoingTest && <Box>
              {
                this.props.savedTests.map((test, index) =>
                  <Hovercard key={index}
                    colorIndex='light-1' onClick={() => this.props.getTest({ index, listId: test.listId })}>
                    <Heading>{test.listName}</Heading>
                    <Label>Remaining Words : {test.wordsToPlay}</Label>
                    <Paragraph>Correct Words : {test.correctWords}</Paragraph>
                    <Paragraph>Incorrect Words : {test.incorrectWords}</Paragraph>
                  </Hovercard>
                  // <Button icon={<TrashIcon size='large' />}
                  // onClick={() => this.props.delete({ index, listId: test.listId })} />
                )
              }
            </Box>
          } */}
          {
            this.props.ongoingTest &&
              <Box justify='center' pad={{ horizontal: 'large' }} alignContent='center'>
                <Value value={TestWordsLens(this.props, 'correctWords')}
                  units='words' label='Correct' />
                <Meter colorIndex='ok' value={TestWordsLens(this.props, 'correctWords')} onActive={() => null}
                  max={TotalWordsLens(this.props)} />
                <Value value={TestWordsLens(this.props, 'incorrectWords')}
                  units='words' label='Incorrect' />
                <Meter colorIndex='critical' value={TestWordsLens(this.props, 'incorrectWords')} onActive={() => null}
                  max={TotalWordsLens(this.props)} />
                <Value value={TestWordsLens(this.props, 'wordsToPlay')}
                  units='words' label='Remaining' />
                <Meter value={TestWordsLens(this.props, 'wordsToPlay')} onActive={() => null}
                  max={TotalWordsLens(this.props)} />
              </Box>
          }
          {
            this.props.ongoingTest && <Footer pad='medium'>
              <Button icon={<CaretBackIcon size='large' />} onClick={this.props.goBack} />
              {this.props.testWordsCounter === this.props.testWordsArray.length &&
                <Button icon={<RefreshIcon size='large' />} onClick={() => this.props.reset(this.props.listId)} />
              }
            </Footer>
          }
        </QuickSilverSidebar>

        { !this.props.ongoingTest &&
          <Box
            justify='center'
            align='center'
            pad='medium'>
            <Heading size='large'>Choose a test</Heading>
          </Box>
        }
        { this.props.ongoingTest &&
          <Box
            justify='center'
            align='center'
            pad='medium'>
            { !this.props.revealed && this.props.testWordsCounter < this.props.testWordsArray.length &&
              <Card heading={this.props.testWordsArray[this.props.testWordsCounter].word}
                contentPad='large' textSize='xlarge' description='Tap to see meaning'
                onClick={this.props.reveal} />
            }
            { this.props.revealed && this.props.testWordsCounter < this.props.testWordsArray.length &&
              <Hovercard
                textSize='small'
                colorIndex='light-1'
                margin='small'
                contentPad='medium'
                direction='column'>
                <Heading>
                  {this.props.testWordsArray[this.props.testWordsCounter].word}
                </Heading>
                <Paragraph margin='small' size='large'>
                  {this.props.testWordsArray[this.props.testWordsCounter].meaning}
                </Paragraph>
                <Paragraph margin='small'>
                  {this.props.testWordsArray[this.props.testWordsCounter].example}
                </Paragraph>
                <Paragraph>
                  <Button icon={<CloseIcon />}
                    label={'I didn\'t know this word'}
                    onClick={() =>
                      this.props.setStatus({
                        status: -1, wordObj: this.props.testWordsArray[this.props.testWordsCounter]
                      })}
                    accent />
                  <Button icon={<CheckmarkIcon />}
                    label='I knew this word'
                    onClick={() =>
                      this.props.setStatus({
                        status: 1, wordObj: this.props.testWordsArray[this.props.testWordsCounter]
                      })} />
                </Paragraph>
              </Hovercard>
            }
            {
              this.props.testWordsCounter === this.props.testWordsArray.length &&
                <Heading>
                  COMPLETED!
                </Heading>
            }
          </Box>
        }
      </Split>
    )
  }
}

MyFlashcards.propTypes = {
  initTestState: PropTypes.func,
  savedTests: PropTypes.array,
  ongoingTest: PropTypes.bool,
  goBack: PropTypes.func,
  listName: PropTypes.string,
  getTest: PropTypes.func,
  showModal: PropTypes.func,
  revealed: PropTypes.bool,
  reveal: PropTypes.func,
  testWordsArray: PropTypes.array,
  testWordsCounter: PropTypes.number,
  setStatus: PropTypes.func,
  listId: PropTypes.string,
  reset: PropTypes.func,
  testIndex: PropTypes.number,
  delete: PropTypes.func
}
