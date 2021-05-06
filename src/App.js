import { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { PublicRoute, PrivateRoute } from 'react-private-public-route'
import { connect } from 'react-redux'

import { HomePage } from './pages/homepage/HomePage'
import { NavBar } from './components/navBar/NavBar'
import { SignIn } from './pages/auth/SignIn'
import { Signout } from './pages/auth/SignOut'
import { SignUp } from './pages/auth/SignUp'

import { verify } from './redux/auth/actions'

function AppUI(props) {
  useEffect(() => {
    props.verify()
    // eslint-disable-next-line
  }, [])

  return (
    <Router>
      <NavBar />
      <div className="p-10 text-center">
        <PublicRoute exact path="/" component={HomePage} />
        <PrivateRoute
          exact
          isAuthenticated={!props.signedIn}
          redirect="/"
          path="/signin"
          component={SignIn}
        />
        <PrivateRoute
          exact
          isAuthenticated={props.signedIn}
          redirect="/"
          path="/signout"
          component={Signout}
        />
        <PrivateRoute
          exact
          isAuthenticated={!props.signedIn}
          redirect="/"
          path="/signup"
          component={SignUp}
        />
      </div>
    </Router>
  )
}

const mapStateToProps = (state) => ({
  signedIn: state.auth.signedIn,
})

const mapDispatchToProps = (dispatch) => ({
  verify: () => dispatch(verify()),
})

export const App = connect(mapStateToProps, mapDispatchToProps)(AppUI)