import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Sidebar from 'grommet/components/Sidebar'
import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import Paragraph from 'grommet/components/Paragraph'
import Heading from 'grommet/components/Heading'
import Card from 'grommet/components/Card'
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
import IdentityComponent from '../../futils/identitycomponent'
import GamePad from 'grommet/components/icons/base/Gamepad'
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious'
import Animate from 'grommet/components/Animate'
import { FoldingCube } from 'better-react-spinkit'
import ComposeR from 'compose-r'
import EitherComponent from '../../futils/eithercomponent'

const SidebarActions = () => styled(Box)`
  font-size: 18px;
  background-color: #E8C547;
  transition: background-color 0.5s ease;
  color: #fff;
  &:hover{
    background-color: #EACA57;
  }
`
const FlameSidebarAction = x => styled(x)`
  background-color: #D34E24;
`

const LightGreyTestArea = styled(Box)`
  background-color: #ebeced;
`

const CreateGameStatSeries = (correctWords, incorrectWords, totalWords) => [
  {
    label: `Correct ${correctWords}`,
    value: correctWords,
    colorIndex: 'ok',
    onClick: () => null
  },
  {
    label: `Incorrect ${incorrectWords}`,
    value: incorrectWords,
    colorIndex: 'critical',
    onClick: () => null
  },
  {
    label: `Remaining ${totalWords}`,
    value: totalWords,
    colorIndex: 'neutral-3-t',
    onClick: () => null
  }
]

export default class Test extends Component {

  componentDidMount () {
    this.props.initTestState()
  }

  render () {
    return (
      <Split flex='right' priority='left' separator={false} showOnResponsive='both'>
        <IdentityComponent fn={styled(Sidebar)`
          background-color: #E5E3DF;
        `}
          colorIndex='neutral-4'
          size='medium'
          justify='between'
        >
          <span>
            <EitherComponent conditionerFn={() => this.props.leftLoader}
              leftComponent={_ => <Box full align='center' alignContent='center'>
                <FoldingCube size={100} color='#1B998B' />
              </Box>}
              rightComponent={_ => null}
            />
            <EitherComponent conditionerFn={() => !this.props.ongoingTest && !this.props.leftLoader}
              leftComponent={_ => <IdentityComponent
                fn={SidebarActions()}
                colorIndex='grey-4'
                size='large'
                pad='medium'
                justify='center'
                align='center'
                onClick={() =>
                  this.props.showModal({ header: 'SELECT A LIST FOR THE TEST', content: 'TEST_LIST_SELECT' })}>
                Create New Game
              </IdentityComponent>}
              rightComponent={_ => null} />
            <EitherComponent conditionerFn={() => this.props.ongoingTest}
              leftComponent={_ => <Box>{this.props.listName}</Box>}
              rightComponent={_ => null}
            />
            <EitherComponent conditionerFn={() => !this.props.ongoingTest}
              leftComponent={_ => <Box pad='medium'>
                {
                  this.props.savedTests.map((test, index) =>
                    <Hovercard key={index}
                      colorIndex='light-1' onClick={() => this.props.getTest({ index, listId: test.listId })}
                      align='center'>
                      <Heading>{test.listName}</Heading>
                      <Meter series={CreateGameStatSeries(test.correctWords, test.incorrectWords, test.wordsToPlay)}
                        type='spiral' />
                    </Hovercard>
                  )
                }
              </Box>}
              rightComponent={_ => null}
            />
            <EitherComponent conditionerFn={() => this.props.ongoingTest}
              leftComponent={_ => <IdentityComponent
                fn={SidebarActions()}
                colorIndex='grey-4'
                size='large'
                pad='small'
                justify='center'
                align='center'
                onClick={() => this.props.goBack()}>
                <Animate enter={{ animation: 'slide-left', duration: 1000, delay: 0 }}
                  keep>
                  <Button icon={<LinkPrevious size='medium' />} />
                </Animate>
              </IdentityComponent>}
              rightComponent={_ => null} />
            <EitherComponent conditionerFn={() => this.props.ongoingTest}
              leftComponent={
                _ =>
                  <Box justify='center' pad={{ horizontal: 'large', vertical: 'medium' }}
                    alignContent='center'>
                    <Value value={TestWordsLens(this.props, 'correctWords')}
                      units='words' label='Correct' />
                    <Meter colorIndex='ok' value={TestWordsLens(this.props, 'correctWords')} onActive={() => null}
                      max={TotalWordsLens(this.props)} />
                    <Value value={TestWordsLens(this.props, 'incorrectWords')}
                      units='words' label='Incorrect' />
                    <Meter colorIndex='critical' value={TestWordsLens(this.props, 'incorrectWords')}
                      onActive={() => null}
                      max={TotalWordsLens(this.props)} />
                    <Value value={TestWordsLens(this.props, 'wordsToPlay')}
                      units='words' label='Remaining' />
                    <Meter value={TestWordsLens(this.props, 'wordsToPlay')} onActive={() => null}
                      max={TotalWordsLens(this.props)} />
                  </Box>}
              rightComponent={_ => null}
            />
            <EitherComponent conditionerFn={() => this.props.ongoingTest}
              leftComponent={_ => <IdentityComponent
                fn={ComposeR(SidebarActions, FlameSidebarAction)()}
                colorIndex='grey-4'
                size='large'
                pad='small'
                justify='center'
                align='center'
                alignSelf='end'
                onClick={() => this.props.reset(this.props.listId)}>
                <Animate enter={{ animation: 'slide-left', duration: 1000, delay: 0 }}
                  keep>
                  <Button icon={<RefreshIcon size='large' />} />
                </Animate>
              </IdentityComponent>}
              rightComponent={_ => null}
            />
          </span>
        </IdentityComponent>

        <LightGreyTestArea full colorIndex='light-2' justify='center' direction='row' align='center'>
          { !this.props.ongoingTest &&
            <IdentityComponent fn={styled(GamePad)`
              font-size: 36px;
            `} size='xlarge' colorIndex='grey-4-a' /> }
          { this.props.ongoingTest && !this.props.rightLoader &&
            <Box
              justify='center'
              align='center'
              pad='medium'>
              { !this.props.revealed && this.props.testWordsCounter < this.props.testWordsArray.length &&
                <Card heading={this.props.testWordsArray[this.props.testWordsCounter].word}
                  contentPad='large' textSize='xlarge' description='Tap to see meaning'
                  onClick={this.props.reveal} /> }
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
                </Hovercard> }
              { this.props.testWordsCounter === this.props.testWordsArray.length &&
                <Heading>
                  COMPLETED!
                </Heading> }
            </Box>
          }
          { this.props.ongoingTest && this.props.rightLoader && <FoldingCube size={100} color='#865cd6' /> }
        </LightGreyTestArea>
      </Split>
    )
  }
}

Test.propTypes = {
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
  delete: PropTypes.func,
  leftLoader: PropTypes.bool,
  rightLoader: PropTypes.bool
}
