import React from 'react'
import Paragraph from 'grommet/components/Paragraph'
import Heading from 'grommet/components/Heading'
import CloseIcon from 'grommet/components/icons/base/Close'
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark'
import PT from 'prop-types'
import Box from 'grommet/components/Box'
import styled from 'styled-components'
import RefreshIcon from 'grommet/components/icons/base/Refresh'
import { StandardTestAnimator } from '../landing/animators'
import Label from 'grommet/components/Label'

const Unflipped = styled(Box)`
  &:hover {
   border-bottom: solid #865cd6;
   border-right-width: 20px;
   background-color: #fff;
   & > div{
     background-color: #fff;
   }
  }
`

const Flipped = styled(Box)`
  &:hover {
   & > div{
     background-color: #fff;
   }
  }
`

const CorrectBox = styled(Box)`
  transition: background-color 0.5s ease;
  &:hover{
    background-color: #8cc800;
  }
`

const IncorrectBox = styled(Box)`
  transition: background-color 0.5s ease;
  &:hover{
    background-color: #FF576D;
  };
`

const TestCard = props =>
  <Box
    justify='center'
    align='center'
    pad='medium'
  >
    {props.hiddenCondition &&
      <StandardTestAnimator style='slide-left'>
        <Unflipped
          colorIndex='light-1'
          margin='small'
          pad='medium'
          size='large'
          onClick={() => props.hiddenCondition && props.revealFn()}
          direction='column' justify='between'
        >
          <Heading>
            {props.word}
          </Heading>
          <Paragraph margin='small' size='large'>
            Click to see meaning
          </Paragraph>
        </Unflipped>
      </StandardTestAnimator>}
    {props.revealedCondition && <StandardTestAnimator >
      <Flipped
        colorIndex='light-1'
        margin='small'
        size='medium'
        direction='column' justify='between'
      >
        <Box pad='medium'>
          <Heading>
            {props.word}
          </Heading>
          {props.lexicalCategory && <Label margin='none'>({props.lexicalCategory})</Label>}
          <Paragraph margin='small' size='large'>
            {props.meaning}
          </Paragraph>
          <Paragraph margin='small'>
            {props.example}
          </Paragraph>
        </Box>
        <Box direction='column'>
          <CorrectBox full='horizontal' pad='medium' direction='row' justify='between'
            onClick={() => props.onCorrect()}> <Heading tag='h4'> I knew this word </Heading>
            <CheckmarkIcon /> </CorrectBox>
          <IncorrectBox full='horizontal' pad='medium' direction='row' justify='between'
            onClick={() => props.onIncorrect()}> <CloseIcon />
            <Heading tag='h4'>I didn't know this word</Heading> </IncorrectBox>
        </Box>
      </Flipped></StandardTestAnimator>}
    {props.completedCondition &&
      <StandardTestAnimator>
        <Unflipped
          colorIndex='light-1'
          margin='small'
          pad='medium'
          size='large'
          direction='column' justify='between'
        >
          <Heading>
            Congratulations you have completed the list 🎉
          </Heading>
          <Paragraph margin='small' size='large'>
            Click on <RefreshIcon size='small' />  to restart
          </Paragraph>
        </Unflipped></StandardTestAnimator>}
  </Box>

TestCard.propTypes = {
  word: PT.string,
  meaning: PT.string,
  example: PT.string,
  onCorrect: PT.func,
  onIncorrect: PT.func,
  lexicalCategory: PT.string,
  hiddenCondition: PT.bool,
  revealedCondition: PT.bool,
  completedCondition: PT.bool,
  lexicalCategory: PT.string
}

export default TestCard
