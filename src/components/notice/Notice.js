import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { setNotice } from '../../redux/main/actions'

function NoticeUI(props) {
  const [className, setClassName] = useState('')

  useEffect(() => {
    switch (props.notice.type) {
      case 'error':
        setClassName('fixed bg-red-400')
        break

      case 'success':
        setClassName('fixed bg-green-400')
        break

      default:
        setClassName('hidden')
        break
    }

    if (
      props.notice.message !== null &&
      Object.keys(props.notice).length > 0 &&
      props.constructor === Object
    ) {
      const waitToFade = setInterval(() => {
        props.setNotice({})
      }, 5000)

      return () => clearInterval(waitToFade)
    }
  }, [props])

  return (
    <div
      className={`${className} border m-2 md:m-10 p-4 overflow-hidden bottom-0 cursor-pointer z-50`}
      onClick={() => props.setNotice({})}
    >
      <span className="block text-center float-left">
        {props.notice.message}
      </span>
      <span className="block text-center ml-5 float-right">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </div>
  )
}

const mapStateToProps = (state) => ({
  notice: state.main.notice,
})

const mapDispatchToProps = (dispatch) => ({
  setNotice: (notice) => dispatch(setNotice(notice)),
})

export const Notice = connect(mapStateToProps, mapDispatchToProps)(NoticeUI)