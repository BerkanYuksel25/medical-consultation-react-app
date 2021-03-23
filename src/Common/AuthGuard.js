import { Route, Redirect } from "react-router-dom";

export function PrivateRoute ({component: Component, currentUser, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => currentUser
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }
  
export function PublicRoute ({component: Component, currentUser, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => currentUser !== true
          ? <Component {...props} />
          : <Redirect to='/' />}
      />
    )
  }