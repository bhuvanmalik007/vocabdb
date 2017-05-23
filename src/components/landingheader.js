import React from 'react'
import Anchor from 'grommet/components/Anchor'
import Box from 'grommet/components/Box'
import Header from 'grommet/components/Header'
import Menu from 'grommet/components/Menu'
import GrommetIcon from 'grommet/components/icons/base/BrandGrommetOutline'
import SearchIcon from 'grommet/components/icons/base/Search'
import Title from 'grommet/components/Title'

export default props =>
    <Header justify='center' colorIndex='grey-1'>
      <Box size={{width: {max: 'xxlarge'}}} direction='row'
        responsive={false} justify='start' align='center'
        pad={{horizontal: 'medium'}} flex='grow'>
        <Title>Mission Admission 🚀</Title>

        <Menu label='Label' inline direction='row' flex='grow' align='end' justify='end'>
          <Anchor href='#'>Login</Anchor>
          <Anchor href='#'>Sign up</Anchor>
        </Menu>

      </Box>
    </Header>
