import React from 'react'
import { Link } from 'react-router' //eslint-disable-line
import Box from 'grommet/components/Box'
import Paragraph from 'grommet/components/Paragraph'
import Anchor from 'grommet/components/Anchor'
import styled from 'styled-components'
import { MAILID } from '../constants' //eslint-disable-line

const BGTextNoMargin = styled(Paragraph)`
  background: black;
  padding: 7px;
  box-shadow : 0 0 10px black;
`

export default props => (
  <Box direction='row'
    className='wallpaper open-sans'
    justify='between'
    colorIndex='grey-1' pad='medium' responsive>
    <Box direction='column' alignSelf='end'>
      <Paragraph size='small'>
        Made with λs and ♥️
      </Paragraph>
    </Box>
    <Box direction='column' alignSelf='end'>
      <BGTextNoMargin size='small' margin='none'>
        © {new Date().getFullYear()} VocabDB
      </BGTextNoMargin>
      <BGTextNoMargin size='small' margin='none'>
        {/* For more details on this <br />
        Please contact <Anchor href={'mailto:' + MAILID} label={MAILID} /> <br /> */}
        All Graphics created with <Anchor href='https://logomakr.com' label='Logomakr' />
      </BGTextNoMargin>
    </Box>
  </Box>
)
