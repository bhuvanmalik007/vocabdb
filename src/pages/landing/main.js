import React, { Component } from 'react'
import PropTypes from 'prop-types' //eslint-disable-line
import LandingHeader from '../../components/landingheader'
import LandingFooter from '../../components/landingfooter'
import HeroImage from '../../static/hero.jpg'
import LandingHero from '../../components/landinghero'
import Box from 'grommet/components/Box'
import GrommetApp from 'grommet/components/App'
import Section from 'grommet/components/Section'
import styled from 'styled-components'
import Headline from 'grommet/components/Headline'
import SampleCard from './samplecard'
import SampleCardMaker from './samplecardmaker'
import OxfordPng from '../../static/oxford.png'
import Image from 'grommet/components/Image'
import Animate from 'grommet/components/Animate'

const NoPadSection = styled(Section)`
  padding: 0px !important;
  background-color: #f0f0f0;
`

const NoPadSection2 = styled(Section)`
  padding: 0px !important;
`

const Box50 = styled(Box)`
`

const FixImage = styled(Image)`
  width: 800px !important;
`

export class LandingView extends Component {

  componentDidMount () {
    this.props.prepareLockAuth(this.props.router)
  }

  render () {
    return (
      <GrommetApp centered={false}>
        <Box>
          <LandingHeader showLogin={() => this.props.showLogin()} authenticated={this.props.authenticated} />
          <LandingHero image={HeroImage}
            grommetColor='grey-1-a'
            heading='Giving your vocabulary preparation awesome super powers!'
            desc='Whether youʼre an English major or appearing for exams with English sections like
            SAT, GMAT, GRE, LSAT etc or any other Entrance Exam,
            building vocabulary is the first step and also the most important.'
            getStarted='Get Started' cardColor='grey-1' justify='end'
            authenticated={this.props.authenticated} />
        </Box>
        <NoPadSection
          justify='center'
          align='center' full direction='row' pad={{ vertical: 'large' }} className='sec2'>
          <Box pad={{ horizontal: 'large' }} direction='column' justify='start'>
            <SampleCard />
          </Box>
          <Box direction='column' alignContent='start' pad='large'>
            <Headline size='medium' className='monserret'>Flashcards</Headline>
            <Headline size='small' className='lato'>
              Store words as flashcards complete with meaning, example
              sentences, pronunciation & personal notes!
            </Headline>
            <Box direction='row' responsive={false} align='center'>
              {/* <Button icon={<LinkNextIcon />} path='/dash' className='lato linkb' label='Explore Projects' /> */}
            </Box>
          </Box>
        </NoPadSection>
        <NoPadSection2
          justify='center'
          align='center' full direction='row' pad={{ vertical: 'large' }} className='sec2'>
          <Box direction='column' alignContent='start' pad='large'>
            <Animate enter={{ 'animation': 'fade', 'duration': 1000, 'delay': 0 }}
              keep={false} visible='scroll'>
              <Headline size='medium' className='monserret'>Explore</Headline>
              <Headline size='small' className='lato'>
                Explore new words with a simple search powered by Oxford
                Dictionaries<sup>TM</sup>
              </Headline>
              <Box direction='row' responsive={false} align='center'>
                {/* <Button icon={<LinkNextIcon />} path='/dash' className='lato linkb' label='Explore Projects' /> */}
              </Box>
            </Animate>
          </Box>
          <Box pad={{ horizontal: 'large' }} direction='column' justify='end'>
            <Animate enter={{ 'animation': 'fade', 'duration': 1000, 'delay': 0 }}
              keep={false} visible='scroll'>
              <FixImage src={OxfordPng} size='large' />
            </Animate>
          </Box>
        </NoPadSection2>
        <NoPadSection
          justify='center'
          align='center' full direction='row' pad={{ vertical: 'large' }} className='sec2' basis='full' flex={false}>
          <Box pad={{ horizontal: 'large' }} direction='column' justify='start' basis='1/2'>
            <SampleCardMaker />
          </Box>
          <Box50 direction='column' align='end' pad='large' basis='1/2' flex={false} full={false}>
            <Animate enter={{ 'animation': 'fade', 'duration': 1000, 'delay': 0 }}
              keep={false} visible='scroll'>
              <Headline size='medium' className='monserret'>Storage & Organization</Headline>
              <Headline size='small' className='lato'>
                Store as many words as you need for that exam!
                Search your words, sort them from A-Z or segregate them into lists. You
                have all the powers! Gone are the days of writing down words or printouts!
              </Headline>
              <Box direction='row' responsive={false} align='center'>
                {/* <Button icon={<LinkNextIcon />} path='/dash' className='lato linkb' label='Explore Projects' /> */}
              </Box>
            </Animate>
          </Box50>
        </NoPadSection>
        <LandingFooter />
      </GrommetApp>
    )
  }
}

LandingView.propTypes = {
  emitAction: PropTypes.func,
  epicWorking: PropTypes.bool,
  authenticated: PropTypes.bool,
  profile: PropTypes.object,
  showLogin: PropTypes.func,
  router: PropTypes.object,
  prepareLockAuth: PropTypes.func
}

export default LandingView
