import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import Heading from 'grommet/components/Heading'
import RefreshIcon from 'grommet/components/icons/base/Refresh'
import Close from 'grommet/components/icons/base/Close'
import TrashIcon from 'grommet/components/icons/base/Trash' //eslint-disable-line
import Meter from 'grommet/components/Meter'
import Value from 'grommet/components/Value'
import TestCard from './testcard'
import { TestWordsLens, TestPercentageLens } from './lenses'
import styled from 'styled-components'
import IdentityComponent from '../../futils/identitycomponent'
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious'
import { FoldingCube } from 'better-react-spinkit'
import ComposeR from '../../futils/composer'
import EitherComponent from '../../futils/eithercomponent'
import {
  SidebarActions, WhiteHoverCard, LineLink, FlameSidebarAction, LightGreyTestArea, LimitedSplit
} from './localcomponents'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator'
import supportV2 from '../../utils/supportV2Api'

export const CreateGameStatSeries = (correctWords, incorrectWords, wordsToPlay) => [{
  label: `Correct ${correctWords}`,
  value: correctWords,
  max: (correctWords + incorrectWords + wordsToPlay),
  colorIndex: 'ok',
  onClick: () => console.log(correctWords + incorrectWords + wordsToPlay)
},
  {
    label: `Incorrect ${incorrectWords}`,
    value: incorrectWords,
    max: (correctWords + incorrectWords + wordsToPlay),
    colorIndex: 'critical',
    onClick: () => null
  },
  {
    label: `Remaining ${wordsToPlay}`,
    value: wordsToPlay,
    max: (correctWords + incorrectWords + wordsToPlay),
    colorIndex: 'warning',
    onClick: () => null
  }
]

export const ColoredMeter = styled(ProgressIndicator)`
  .progressBar_ef24ad53{
    background-color: ${props => props.color};
  }
`

export default class Test extends Component {

  componentDidMount () {
    this.props.initTestState()
  }

  render () {
    return (
      <LimitedSplit flex='right' priority='left' separator={false} showOnResponsive='both'>
        <IdentityComponent fn={styled(Box)`
          background-color: #E5E3DF;
          overflowY : auto;
          &::-webkit-scrollbar-track
          {
           background-color: #fff;
          }
          &::-webkit-scrollbar
          {
           width: 10px;
           background-color: #F5F5F5;
          }
          &::-webkit-scrollbar-thumb
          {
           background-color: #FF576D;
          }
        `}
          colorIndex='neutral-4'
          size='medium'
          justify='between'
          full
        >
          <EitherComponent conditionerFn={() => this.props.leftLoader}
            leftComponent={_ => <Box full align='center' alignContent='center' justify='center'>
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
              Create New Test
            </IdentityComponent>}
            rightComponent={_ => null} />
          <EitherComponent conditionerFn={() => !this.props.ongoingTest && !this.props.leftLoader}
            leftComponent={_ => <Box pad='medium'>
              {
                this.props.savedTests.map((test, index) =>
                  <WhiteHoverCard key={index}
                    colorIndex='light-1'
                    onClick={() => this.props.getTest({ index, listId: test.listId })}
                  stretch contentPad='medium' flex >
                    <Box direction='column' justify='center' align='center' >
                      <Button icon={<Close size='small' />}
                        onClick={(e) => {
                          e.stopPropagation()
                          this.props.delete({ index, listId: test.listId })
                        }} />
                      <Heading tag='h4' strong>{test.listName}</Heading>
                    </Box>
                    {/* <Heading align='center' tag='h3' truncate strong>{test.listName} <Button icon={<Close size='small' />}
                        onClick={(e) => {
                      e.stopPropagation()
                      this.props.delete({ index, listId: test.listId })
                        }} />
                    </Heading> */}
                    <Value size='small' value={TestWordsLens(this.props, 'correctWords', index)}
                    units='word(s)' label='Correct' />
                    <ColoredMeter color='#8cc800'
                      percentComplete={TestPercentageLens(this.props, 'correctWords', index)} />
                    <Value size='small' value={TestWordsLens(this.props, 'incorrectWords', index)}
                    units='word(s)' label='Incorrect' />
                    <ColoredMeter color='#ff324d'
                      percentComplete={TestPercentageLens(this.props, 'incorrectWords', index)} />
                    <Value size='small' value={TestWordsLens(this.props, 'wordsToPlay', index)}
                    units='word(s)' label='Remaining' />
                    <ColoredMeter color='#0a64a0'
                      percentComplete={TestPercentageLens(this.props, 'wordsToPlay', index)} />
                    {/* <Meter series={CreateGameStatSeries(test.correctWords, test.incorrectWords, test.wordsToPlay)}
                    type='spiral' /> */}
                  </WhiteHoverCard>
                )
              }
            </Box>}
            rightComponent={_ => null}
          />
          <EitherComponent conditionerFn={() => this.props.ongoingTest && !this.props.leftLoader}
            leftComponent={_ => <IdentityComponent
              fn={SidebarActions()}
              colorIndex='grey-4'
              size='large'
              pad='small'
              justify='center'
              align='center'
              onClick={() => this.props.goBack()}>
              <Button icon={<LinkPrevious size='medium' colorIndex='light-1' />} />
            </IdentityComponent>}
            rightComponent={_ => null} />
          <EitherComponent conditionerFn={() => this.props.ongoingTest && !this.props.leftLoader}
            leftComponent={_ => <Heading align='center'>{this.props.listName}</Heading>}
            rightComponent={_ => null}
          />
          <EitherComponent conditionerFn={() => this.props.ongoingTest && !this.props.leftLoader}
            leftComponent={
              _ => <Box justify='center' pad={{ horizontal: 'large', vertical: 'medium' }} alignContent='center' >
                <Value value={TestWordsLens(this.props, 'correctWords', this.props.testIndex)}
                units='word(s)' label='Correct' />
                <ColoredMeter color='#8cc800'
                  percentComplete={TestPercentageLens(this.props, 'correctWords', this.props.testIndex)} />
                <Value value={TestWordsLens(this.props, 'incorrectWords', this.props.testIndex)}
                units='word(s)' label='Incorrect' />
                <ColoredMeter color='#ff324d'
                  percentComplete={TestPercentageLens(this.props, 'incorrectWords', this.props.testIndex)} />
                <Value value={TestWordsLens(this.props, 'wordsToPlay', this.props.testIndex)}
                units='word(s)' label='Remaining' />
                <ColoredMeter color='#0a64a0'
                  percentComplete={TestPercentageLens(this.props, 'wordsToPlay', this.props.testIndex)} />
              </Box>}
            rightComponent={_ => null}
          />
          <Box>
            <EitherComponent conditionerFn={() => this.props.ongoingTest && !this.props.leftLoader}
              leftComponent={_ => <IdentityComponent
                fn={ComposeR(SidebarActions, FlameSidebarAction)()}
                colorIndex='grey-4'
                size='large'
                pad='small'
                justify='center'
                align='center'
                alignSelf='end'
                onClick={() => this.props.reset(this.props.listId)}>
                <Button icon={<RefreshIcon size='large' colorIndex='light-1' />} />
              </IdentityComponent>}
              rightComponent={_ => null}
            />
          </Box>
        </IdentityComponent>
        <LightGreyTestArea full colorIndex='light-2' justify='center' direction='row' align='center'>
          <EitherComponent conditionerFn={() => !this.props.ongoingTest}
            leftComponent={_ =>
              <Heading>
                <LineLink onClick={() =>
                  this.props.showModal({ header: 'SELECT A LIST FOR THE TEST', content: 'TEST_LIST_SELECT' })}>
                  Create New Test
                </LineLink> or select from previous ones</Heading>}
            rightComponent={_ => null}
          />
          <EitherComponent conditionerFn={() => this.props.ongoingTest && !this.props.rightLoader}
            leftComponent={_ =>
              <TestCard word={this.props.testWordsArray[this.props.testWordsCounter] &&
              this.props.testWordsArray[this.props.testWordsCounter].word}
                lexicalCategory={this.props.testWordsArray[this.props.testWordsCounter] &&
                supportV2(this.props.testWordsArray[this.props.testWordsCounter].lexicalCategory)}
                meaning={this.props.testWordsArray[this.props.testWordsCounter] &&
                this.props.testWordsArray[this.props.testWordsCounter].meaning}
                example={this.props.testWordsArray[this.props.testWordsCounter] &&
                this.props.testWordsArray[this.props.testWordsCounter].example}
                hiddenCondition={!this.props.revealed && this.props.testWordsCounter <
                this.props.testWordsArray.length}
                revealedCondition={this.props.revealed &&
                this.props.testWordsCounter < this.props.testWordsArray.length}
                completedCondition={this.props.testWordsCounter === this.props.testWordsArray.length}
                revealFn={() => this.props.reveal()}
                onCorrect={() => this.props.setStatus({
                  status: 1, wordObj: this.props.testWordsArray[this.props.testWordsCounter]
                })}
                onIncorrect={() =>
                  this.props.setStatus({
                    status: -1, wordObj: this.props.testWordsArray[this.props.testWordsCounter]
                  })}
              />} rightComponent={_ => null} />
          { this.props.ongoingTest && this.props.rightLoader && <FoldingCube size={100} color='#865cd6' /> }
        </LightGreyTestArea>
      </LimitedSplit>
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
