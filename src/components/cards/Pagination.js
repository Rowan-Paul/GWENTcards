import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setPage } from '../../redux/cards/actions'

function PaginationUI(props) {
  const [pagination, setPagination] = useState([])

  const handleOnClick = (page) => {
    props.setPage(page)
  }

  useEffect(() => {
    if (props.selected) {
      const pageAmount = Math.ceil(props.selected.length / props.pageSize)
      const tempArray = []

      for (let i = 0; i < pageAmount; i++) {
        let classes = 'mr-5 cursor-pointer inline-block'
        if (i === props.page) {
          classes = 'mr-5 cursor-pointer inline-block underline'
        }

        tempArray.push(
          <span
            onClick={() => handleOnClick(i)}
            className={classes}
            key={`page${i}`}
          >
            {i + 1}
          </span>
        )
      }
      setPagination(tempArray)
    }
    // eslint-disable-next-line
  }, [props.selected, props.pageSize, props.page])

  return <p>{pagination}</p>
}

const mapStateToProps = (state) => ({
  selected: state.cards.selected,
  pageSize: state.cards.pageSize,
  page: state.cards.page,
})

const mapDispatchToProps = (dispatch) => ({
  setPage: (page) => dispatch(setPage(page)),
})

export const Pagination = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaginationUI)