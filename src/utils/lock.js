import Lock from 'auth0-lock'
import { ClientId, Domain } from '../credentials'

export default new Lock(ClientId, Domain, {
  allowedConnections: ['Username-Password-Authentication', 'google-oauth2'],
  auth: {
    redirect: false
  },
  theme: {
    primaryColor: '#000000'
  },
  languageDictionary: {
    title: 'VocabDB'
  }
})
