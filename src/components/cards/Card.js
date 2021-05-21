import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Image } from 'cloudinary-react'

import { addUserCard } from '../../redux/cards/actions'

function CardUI(props) {
  const [isCollected, setIsCollected] = useState(false)
  const card = props.card
  let abilities = []

  useEffect(() => {
    if (props.userCards?.length > 0) {
      props.userCards.forEach((userCard) => {
        if (userCard._id === card._id) {
          setIsCollected(true)
        }
      })
    }
  }, [card._id, props.userCards, props.signedIn])

  const plusIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
      className="h-6 w-6 float-right mr-3 mb-5 cursor-pointer"
      onClick={() => props.addUserCard(card)}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    </svg>
  )
  const collectedIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
      className="h-6 w-6 float-right mr-3 mb-5"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  )
  const heartIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
      className="h-6 w-6 float-right mr-3 mb-5 cursor-pointer"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
    </svg>
  )

  card.abilities?.forEach((ability) => {
    abilities.push(titleCase(ability))
  })

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ')
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
    }
    return splitStr.join(' ')
  }

  // card from https://w3collective.com/card-component-tailwind-css/
  return (
    <div className="rounded my-5 bg-white shadow max-w-md min-w-full mx-auto border-2 motion-safe:animate-fadeIn">
      <header className="p-2">
        <h3 className="text-lg font-bold">{titleCase(card.name)}</h3>
        <p className="text-sm text-gray-600">
          {titleCase(card.deck)}
          <br></br> Strength: &nbsp;
          {card.strength ? card.strength : '-'}
        </p>
      </header>

      <section>
        <Image
          public-id={'/gwentcards/' + encodeURIComponent(card.name) + '.png'}
          width="205"
          height="387"
          fetchFormat="auto"
          crop="scale"
          loading="lazy"
          alt={'Card with ' + card.name}
          style={{ margin: 'auto' }}
        />
        <p className="p-4">
          <span className="block">
            Row: {card.row ? titleCase(card.row) : '-'}
          </span>

          <span className="block">
            Effect: {card.effect ? titleCase(card.effect) : '-'}
          </span>

          <span className="block">
            Abilities: {card.abilities ? abilities.toString() : '-'}
          </span>
        </p>
      </section>

      <footer className="p-4">
        <span href="#" className="text-sm hover:underline mr-5 cursor-pointer">
          Notes
        </span>
        <span href="#" className="text-sm hover:underline cursor-pointer">
          Locations
        </span>

        {heartIcon}
        {isCollected ? collectedIcon : plusIcon}
      </footer>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userCards: state.cards.userCards,
  signedIn: state.auth.signedIn,
})

const mapDispatchToProps = (dispatch) => ({
  addUserCard: (card) => dispatch(addUserCard(card)),
})

export const Card = connect(mapStateToProps, mapDispatchToProps)(CardUI)
