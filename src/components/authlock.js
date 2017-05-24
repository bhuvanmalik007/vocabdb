import React, { PureComponent } from 'react'
import Lock from 'auth0-lock'
import { ClientId, Domain } from '../credentials'
import Anchor from 'grommet/components/Anchor'

const options = {
  allowedConnections: ['google-oauth2'],
  redirect: false,
  responseMode:'POST',
  theme: {
    primaryColor: '#31324F'
  }
}
class AuthLock extends PureComponent {
  constructor () {
    super()
    this.lock = new Lock(
      ClientId, Domain, {
        auth: {
          // redirectUrl: 'http://localhost:3000/auth',
          // responseType: 'token',
          params: {
            scope: 'openid email' // Learn about scopes: https://auth0.com/docs/scopes
          }
        }
      }
    )

    this.lock.on('authenticated', function (authresult) {
      console.log(authresult)
    })
  }

  // authenticated (authResult) {
  //   this.lock.getUserInfo(authResult.accessToken, function (error, profile) {
  //     if (error) {
  //       return
  //     }
  //     console.log(profile, authResult.accessToken)
  //   })
  // }

  render () {
    return (
      <div>
        <Anchor onClick={() => this.lock.show(options)}>Login/Signup</Anchor>
      </div>
    )
  }

}

export default AuthLock
