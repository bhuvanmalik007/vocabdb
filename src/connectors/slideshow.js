import React from 'react'
import PropTypes from 'prop-types'
import { pick } from 'ramda' //eslint-disable-line
import { connect } from 'react-redux'
import Card from 'grommet/components/Card'
import Box from 'grommet/components/Box'
import Paragraph from 'grommet/components/Paragraph'
import Heading from 'grommet/components/Heading'
import CaretBackIcon from 'grommet/components/icons/base/CaretBack'
import CaretNextIcon from 'grommet/components/icons/base/CaretNext'
import AnimateOnChange from 'react-animate-on-change'
import { IconButton } from '../pages/myflashcards/localcomponents'
import KeyHandler, { KEYPRESS } from 'react-key-handler'

const SlideShow = ({ wordsArray, slideShowIndex, moveSlideshow }) =>
  <Box pad='medium' alignContent='center'>
    <KeyHandler keyEventName={KEYPRESS} keyValue='d'
      onKeyHandle={() => slideShowIndex + 1 < wordsArray.length && moveSlideshow('+')} />
    <KeyHandler keyEventName={KEYPRESS} keyValue='a'
      onKeyHandle={() => slideShowIndex > 0 && moveSlideshow('-')} />
    <AnimateOnChange
      baseClassName='slider'
      animationClassName='sliderchange'
      animate>
      <Card
        textSize='small'
        colorIndex='light-1'
        margin='small'
        contentPad='medium'
        direction='column'>
        <Heading>
          {wordsArray[slideShowIndex].word.word}
        </Heading>
        <Paragraph margin='small' size='large'>
          {wordsArray[slideShowIndex].word.meaning}
        </Paragraph>
        <Paragraph margin='small'>
          {wordsArray[slideShowIndex].word.example}
        </Paragraph>
      </Card>
    </AnimateOnChange>
    <Box direction='row' alignContent='around'>
      <IconButton icon={<CaretBackIcon />}
        onClick={() => slideShowIndex > 0 && moveSlideshow('-')} />
      <IconButton icon={<CaretNextIcon />}
        onClick={() => slideShowIndex + 1 < wordsArray.length && moveSlideshow('+')} />
    </Box>
  </Box>

SlideShow.propTypes = {
  wordsArray: PropTypes.array,
  slideShowIndex: PropTypes.number,
  moveSlideshow: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  moveSlideshow: (payload) => dispatch({ type: 'SLIDESHOW_MOVER', payload })
})

const mapStateToProps = state => ({
  ...pick(['wordsArray', 'slideShowIndex'], state.wordsState)
})

export default connect(mapStateToProps, mapDispatchToProps)(SlideShow)
