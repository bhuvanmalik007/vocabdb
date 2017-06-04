import Lock from 'auth0-lock'
import { ClientId, Domain } from '../credentials'
import Logo from '../static/ship.png'

export default new Lock(ClientId, Domain, {
  allowedConnections: ['Username-Password-Authentication', 'google-oauth2'],
  auth: {
    redirect: false
  },
  theme: {
    logo: Logo,
    primaryColor: '#000000'
  },
  languageDictionary: {
    title: 'MISSION ADMISSION'
  }
})
