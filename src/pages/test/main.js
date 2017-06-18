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
import styled from 'styled-components'
import ChapterAddIcon from 'grommet/components/icons/base/ChapterAdd'
import CaretBackIcon from 'grommet/components/icons/base/CaretBack'
import CloseIcon from 'grommet/components/icons/base/Close'
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark'
import Legend from 'grommet/components/Legend'
import Split from 'grommet/components/Split'

const Hovercard = styled(Card)`
  transition : all 0.5s ease;
  &:hover {
   border: ${props => props.selecting ? `1px solid #865cd6` : `none`};
   transform: translateY(-2px);
   box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
   transition: transform .3s,-webkit-transform .3s;
  }
`

export default class MyFlashcards extends Component {

  componentDidMount () {
    this.props.initTestState()
  }
  render () {
    return (
      <Split flex='right' priority='left' separator={false} showOnResponsive='both'>
        <Sidebar colorIndex='light-2' size='medium'>
          <Header pad='small'
            justify='center'>
            {
              !this.props.ongoingTest && <Anchor onClick={() =>
                this.props.showModal({ header: 'SELECT A LIST FOR THE TEST', content: 'TEST_LIST_SELECT' })}>
                <ChapterAddIcon size='large' />
              </Anchor>
            }
            {
              this.props.ongoingTest && <Heading>{this.props.listName}</Heading>
            }
          </Header>
          <br />
          {
            !this.props.ongoingTest && <Tiles fill flush={false}>
              {
                this.props.savedTests.map((test, index) =>
                  <Tile key={index}>
                    <Hovercard colorIndex='light-1' onClick={() => this.props.getTest(test)}>
                      <Heading>{test.listName}</Heading>
                      <Label>Remaining Words : {test.wordsToPlay}</Label>
                      <Paragraph>Correct Words : {test.correctWords}</Paragraph>
                      <Paragraph>Incorrect Words : {test.incorrectWords}</Paragraph>
                    </Hovercard>
                  </Tile>
                )
              }
            </Tiles>
          }
          {
            this.props.ongoingTest &&
              <Box justify='center'>
                <Legend series={[{ 'label': 'CORRECT', 'value': this.props.correct, 'colorIndex': 'ok' },
                  { 'label': 'INCORRECT', 'value': this.props.incorrect, 'colorIndex': 'critical' },
                  { 'label': 'REMAINING', 'value': this.props.remaining, 'colorIndex': 'unknown' }]}
                  size='large'
                  total />
              </Box>
          }
          {
            this.props.ongoingTest && <Footer pad='medium'>
              <Button icon={<CaretBackIcon size='large' />} onClick={this.props.goBack} />
            </Footer>
          }
        </Sidebar>
        { !this.props.ongoingTest &&
          <Box
            justify='center'
            align='center'
            pad='medium'>
            <Heading size='large'>Choose a test, you fucking cunt</Heading>
          </Box>
        }
        { this.props.ongoingTest &&
          <Box
            justify='center'
            align='center'
            pad='medium'>
            { !this.props.revealed &&
              <Card heading={this.props.testWordsArray[this.props.testWordsCounter].word}
                contentPad='large' textSize='xlarge' description='Tap to see meaning'
                onClick={this.props.reveal} />
            }
            { this.props.revealed &&
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
                    label="I didn't know this word"
                    // onClick
                    accent
                    primary={false}
                    secondary />
                  <Button icon={<CheckmarkIcon />}
                    label='I knew this word'
                    // onClick
                    primary={false}
                    secondary={false} />
                </Paragraph>

                {/* <Box align='end'>
                  {!multipleSelect && <div>
                    <GrommetButton icon={<Volume />} onClick={() => audio(index)} id='VolumeUp' />
                    <audio id={'audio' + index} src={element.word.pronounciation} />
                    <GrommetButton icon={<PlatformGoogle />} onClick={() => searchGoogle(element.word.word)} />
                    <GrommetButton onClick={() => currentListId === 'all'
                      ? deleteFromAll({ senseIds: [element.word.id] })
                      : deleteFromList({ listId: currentListId, senseIds: [element.word.id] })}
                      icon={<Close />} />
                  </div>}
                </Box> */}
              </Hovercard>
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
  correct: PropTypes.number,
  incorrect: PropTypes.number,
  ongoingTest: PropTypes.bool,
  remaining: PropTypes.number,
  goBack: PropTypes.func,
  listName: PropTypes.string,
  getTest: PropTypes.func,
  showModal: PropTypes.func,
  revealed: PropTypes.bool,
  reveal: PropTypes.func,
  testWordsArray: PropTypes.array,
  testWordsCounter: PropTypes.number
}
