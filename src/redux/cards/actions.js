import * as types from './types'

let api = process.env.REACT_APP_API

// fetch cards
export const fetchCards = () => (dispatch, getState) => {
  let url = `${api}/cards`
  let parameters = []
  const filters = getState().cards.filters

  dispatch({
    type: types.REMOVED_CARDS,
  })

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
    .catch((err) => {
      console.log('Failed to fetch cards', err)
    })
}

export const addUserCard = (card) => (dispatch, getState) => {
  let url = `${api}/users/cards`

  if (getState().auth.signedIn) {
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
          type: types.ADDED_USER_CARD,
          payload: response,
        })
      )
      .catch((err) => {
        console.log('Failed to add user card', err)
      })
  } else {
    let cards = getState().cards.userCards

    if (getState().cards.userCards?.length < 1) {
      cards = []
    }

    dispatch({
      type: types.ADDED_USER_CARD,
      payload: { cards: [...cards, card] },
    })
  }
}

export const fetchUserCards = () => (dispatch, getState) => {
  let url = `${api}/users/cards`

  fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      let cards = response.cards

      if (response.cards === undefined || response.cards?.length < 1) {
        if (getState().cards.userCards?.length > 0) {
          cards = getState().cards.userCards
        } else {
          cards = []
        }
      }

      dispatch({
        type: types.FETCHED_USER_CARDS,
        payload: cards,
      })
    })
    .catch((err) => {
      console.log('Failed to fetch user cards', err)
    })
}

export const setPageSize = (size) => {
  return { type: types.PAGE_SIZE_SET, payload: size }
}

export const setFilters = (filters) => {
  return { type: types.FILTERS_SET, payload: filters }
}

export const setPage = (page) => {
  return { type: types.PAGE_SET, payload: page }
}

export const setReset = (reset) => {
  return { type: types.RESET, payload: reset }
}

export const removeCards = () => {
  return { type: types.REMOVED_CARDS }
}
