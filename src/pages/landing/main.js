import React, { Component } from 'react'
import PropTypes from 'prop-types' //eslint-disable-line
import LandingHeader from '../../components/landingheader'
import HeroImage from '../../static/hero.jpg'
import LandingHero from '../../components/landinghero'
import FeatureCard from '../../components/featurecard'
import Tiles from 'grommet/components/Tiles'
import Box from 'grommet/components/Box'
import Free from '../../static/free.jpg'
import ChapterAdd from 'grommet/components/icons/base/ChapterAdd'
import Apps from 'grommet/components/icons/base/Apps'
import Gamepad from 'grommet/components/icons/base/Gamepad'
import Book from 'grommet/components/icons/base/Book'
import Star from 'grommet/components/icons/base/Star'
import FeatureShow from '../../components/featureshow'
import GrommetApp from 'grommet/components/App'

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
            getStarted='Get Started' cardColor='grey-1' label='Mission Admission' justify='end'
            authenticated={this.props.authenticated} />
        </Box>
        <Box pad='medium' colorIndex='grey-1-a'>
          <Tiles size='medium' justify='center' pad='large'>
            <FeatureCard heading='Flashcards' para='Store words as flashcards with meaning, example sentences,
              pronounciation & personal notes!' />
            <FeatureCard heading='Your Words' para='Segregate your words into lists' />
            <FeatureCard heading='Games' para='Play word games' />
            <FeatureCard heading='Starter Words'
              para='Sample word pack with the most recurring words to get you up and running' />
            <FeatureCard heading='Favourites' para='Store favourites' />
          </Tiles>
        </Box>
        <LandingHero image={Free}
          grommetColor='light-1'
          heading='Try it for free today!' getStarted='Get Started' justify='center' />
        <Box pad='large' align='center'>
          <Tiles size='medium' justify='center' pad='large'>
            <FeatureShow icon={<ChapterAdd colorIndex='brand' size='large' />}
              heading='Flashcards'
              para='Store words as flashcards with meaning, example sentences, pronounciation & personal notes!' />
            <FeatureShow icon={<Apps colorIndex='brand' size='large' />}
              heading='Your Words' para='Segregate your words into lists' />
            <FeatureShow icon={<Gamepad colorIndex='brand' size='large' />} heading='Games' para='Play word games' />
            <FeatureShow icon={<Book colorIndex='brand' size='large' />}
              heading='Starter Words' para='Sample word pack with the most recurring words to get you up and running' />
            <FeatureShow icon={<Star colorIndex='brand' size='large' />} heading='Favourites' para='Store favourites' />
          </Tiles>
        </Box>
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
