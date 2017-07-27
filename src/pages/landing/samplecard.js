import React from 'react'
import Button from 'grommet/components/Button'
import Volume from 'grommet/components/icons/base/Volume'
import PlatformGoogle from 'grommet/components/icons/base/PlatformGoogle'
import Close from 'grommet/components/icons/base/Close'
import Paragraph from 'grommet/components/Paragraph'
import Heading from 'grommet/components/Heading'
import Box from 'grommet/components/Box'
import { Hovercard } from '../myflashcards/localcomponents'

export default () =>
  <Hovercard
    textSize='small'
    colorIndex='light-1'
    margin='small'
    contentPad='medium'
    direction='column'
  >
    <Heading>
      vocabulary
    </Heading>
    <Paragraph margin='small' size='large'>
      the body of words used in a particular language
    </Paragraph>
    <Paragraph margin='small'>
      "they are intelligent people with an extensive vocabulary"
    </Paragraph>
    <Box align='end'>
      <div>
        <Button icon={<Volume />} />
        <Button icon={<PlatformGoogle />} />
        <Button icon={<Close />} />
      </div>
    </Box>
  </Hovercard>
