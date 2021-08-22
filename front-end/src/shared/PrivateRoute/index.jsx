import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setIsAuthenticated(user);
  }, []);
  return (
    <>
      {isAuthenticated !== undefined && (
        <Route
          {...rest}
          render={(routeProps) => (isAuthenticated ? <RouteComponent {...routeProps} /> : <Redirect to="/login" />)}
        />
      )}
    </>
  );
};

export default PrivateRoute;
