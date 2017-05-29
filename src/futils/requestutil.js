function parseJSON (response) {
  return response.json()
}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

export const withAuthuntication = state => (promise, args, method, body) => promise(args, {
  method,
  headers: {
    'Content-Type': 'application/json',
    // 'User':state.core.profile.identities[0].user_id,
    'Authorization': 'Bearer ' + state.core.idToken
  },
  body
})

export const withCatch = state => promise => promise.catch(e => e.response)

export default function request (url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
}
