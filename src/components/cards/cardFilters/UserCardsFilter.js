import { useEffect, useState } from 'react'
import Switch from 'react-switch'
import { connect } from 'react-redux'

import { setFilters, fetchCards } from '../../../redux/cards/actions'

function UserCardsFilterUI(props) {
  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    let tempFilters = props.filters
    tempFilters.hideUserCards = !checked

    props.setFilters(tempFilters)
    setChecked(!checked)
    props.fetchCards()
  }

  useEffect(() => {
    setChecked(props.filters.hideUserCards)
  })

  return (
    <span className="mb-3 md:mb-0 lg:mb-3 p-3">
      <label htmlFor="UserCardsFilter" className="mr-5 font-bold">
        Hide collected cards
      </label>

      <Switch
        checked={checked}
        onChange={handleChange}
        onColor="#86d3ff"
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
        height={20}
        width={48}
        className="w-full my-2 mx-5"
        id="material-switch"
      />
    </span>
  )
}

const mapStateToProps = (state) => ({
  filters: state.cards.filters,
  reset: state.cards.reset,
})

const mapDispatchToProps = (dispatch) => ({
  setFilters: (filters) => dispatch(setFilters(filters)),
  fetchCards: () => dispatch(fetchCards()),
})

export const UserCardsFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCardsFilterUI)
