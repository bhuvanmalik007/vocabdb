import React, { Component } from 'react'
import PropTypes from 'prop-types' //eslint-disable-line
import LandingHeader from '../../components/landingheader'
import LandingFooter from '../../components/landingfooter'
import HeroImage from '../../static/hero.jpg'
import LandingHero from '../../components/landinghero'
import Box from 'grommet/components/Box'
import GrommetApp from 'grommet/components/App'
import styled from 'styled-components'
import SampleCard from './samplecard'
import SampleCardMaker from './samplecardmaker'
import OxfordPng from '../../static/oxford.png'
import Image from 'grommet/components/Image'
import { StandardLandingAnimator } from './animators'
import { LandingSection } from './sectioncomponents'
import TestResults from './testresults'

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
            SAT, GMAT, GRE etc,
            building vocabulary is the first and most important step.'
            getStarted='Get Started' cardColor='grey-1' justify='end'
            authenticated={this.props.authenticated} />
        </Box>
        <LandingSection
          heading='Flashcards'
          text='Store words as flashcards complete with meaning, example
          sentence, pronunciation & personal notes!'
          color='#f1f3f4'
          reverse>
          <Box pad={{ horizontal: 'large' }} direction='column' justify='end'>
            <StandardLandingAnimator component={<SampleCard />} style='slide-right' />
          </Box>
        </LandingSection>
        <LandingSection
          heading='Storage & Organization'
          text={<span>Search your words, sort them from A-Z or segregate them into lists. You have all the powers!
            <br /> Gone are the days of writing down words or taking printouts!</span>}
          color='#f0f0f0' reverse>
          <Box pad={{ horizontal: 'large' }} direction='column' justify='start' basis='1/2'>
            <SampleCardMaker />
          </Box>
        </LandingSection>
        <LandingSection
          heading='Explore'
          text='Explore new words and make them your own with a simple search powered by Oxford
          Dictionaries™'
          color='#fff'
          tcolor='#000'
        >
          <StandardLandingAnimator component={<Box pad={{ horizontal: 'large' }} direction='column' justify='end'>
            <FixImage src={OxfordPng} size='large' />
          </Box>} style='fade' />
        </LandingSection>
        <LandingSection
          heading='Games'
          text={<span>Master those lists you created by playing word games!</span>}
          color='#f0f0f0'>
          <Box pad={{ horizontal: 'large' }} direction='column' justify='start' basis='1/2'>
            <TestResults />
          </Box>
        </LandingSection>
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
