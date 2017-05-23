import React from 'react'
import Footer from 'grommet/components/Footer'
import Title from 'grommet/components/Title'
import Box from 'grommet/components/Box'
import Paragraph from 'grommet/components/Paragraph'
import Anchor from 'grommet/components/Anchor'
import { Link } from 'react-router'

export default props => (
  <Box pad='small' colorIndex='grey-1'>
    <Footer justify='between' primary>
      <Box direction='row'
        align='center'
        pad={{ between: 'medium' }}>
        <Paragraph margin='none'>
          <Anchor>
            Made with ♥ by students for students
          </Anchor>
        </Paragraph>
      </Box>
    </Footer>
  </Box>
)
