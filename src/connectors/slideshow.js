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
import GrommetButton from 'grommet/components/Button'
import styled from 'styled-components'
import Carousel from 'grommet/components/Carousel'

const LowPadButton = styled(GrommetButton)`
  border-radius: 0px;
  span {
    padding: 10px !important;
  }
`
const IconButton = props =>
  <Box pad='medium'>
    <LowPadButton {...props} />
  </Box>

const SlideShow = ({ wordsArray, slideShowIndex, moveSlideshow }) =>
  <Carousel>
    {wordsArray.map( words =>
      <Box pad='large' alignContent='center'>
        <Card
          textSize='small'
          colorIndex='light-1'
          margin='small'
          contentPad='medium'
          direction='column'>
          <Heading>
            {words.word.word}
          </Heading>
          <Paragraph margin='small' size='large'>
            {words.word.meaning}
          </Paragraph>
          <Paragraph margin='small'>
            {words.word.example}
          </Paragraph>
        </Card>
      </Box>
    )}
  </Carousel>

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
