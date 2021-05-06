import { useEffect } from 'react'

import { connect } from 'react-redux'
import { CurrentPage } from '../../components/cards/CurrentPage'
import { Filters } from '../../components/cards/Filters'
import { fetchCards } from '../../redux/cards/actions'

function CardsUI(props) {
  useEffect(() => {
    props.fetchCards()
    // eslint-disable-next-line
  }, [props.filters, props.pageSize, props.reset])

  return (
    <div>
      <Filters />
      <CurrentPage />
    </div>
  )
}

const mapStateToProps = (state) => ({
  selected: state.cards.selected,
  filters: state.cards.filters,
  pageSize: state.cards.pageSize,
})

const mapDispatchToProps = (dispatch) => ({
  fetchCards: () => dispatch(fetchCards()),
})

export const Cards = connect(mapStateToProps, mapDispatchToProps)(CardsUI)
