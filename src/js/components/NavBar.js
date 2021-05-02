import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function NavBarUI(props) {
  return (
    <div className="fixed top-0 right-0 my-2 mx-5">
      {props.signedIn ? (
        <Link to="/signout">Sign out</Link>
      ) : (
        <Link to="/signin">Sign In</Link>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  signedIn: state.auth.signedIn,
})

const mapDispatchToProps = (dispatch) => ({})

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarUI)
