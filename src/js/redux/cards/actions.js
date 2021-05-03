import * as types from './types'

let api = process.env.REACT_APP_API

// fetch cards
export const fetchCards = (filters) => (dispatch) => {
  let url = `${api}/cards`
  let parameters = []

  if (filters.deck.length > 0) {
    parameters.push(`deck=${encodeURIComponent(filters.deck.toString())}`)
  }
  if (filters.row.length > 0) {
    parameters.push(`row=${encodeURIComponent(filters.row.toString())}`)
  }
  if (filters.strength.length > 0) {
    parameters.push(
      `strength=${encodeURIComponent(filters.strength.toString())}`
    )
  }
  if (filters.abilities.length > 0) {
    parameters.push(
      `abilities=${encodeURIComponent(filters.abilities.toString())}`
    )
  }
  if (filters.effect.length > 0) {
    parameters.push(`effect=${encodeURIComponent(filters.effect.toString())}`)
  }

  if (parameters.length > 0) {
    url += `/card?${parameters[0]}`
    if (parameters.length > 1) {
      for (var i = 1; i < parameters.length; i++) {
        url += `&${parameters[i]}`
      }
    }
  }

  fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((response) =>
      dispatch({
        type: types.FETCHED_CARDS,
        payload: response,
      })
    )
}

export const addUserCard = (card) => (dispatch, getState) => {
  let url = `${api}/users/cards`

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cards: [...getState().cards.userCards, card],
    }),
  })
    .then((response) => {
      return response.json()
    })
    .then((response) =>
      dispatch({
        type: types.ADDED_CARD,
        payload: response,
      })
    )
}
