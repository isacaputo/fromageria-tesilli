import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }) {

  const auth = useContext(AuthContext);
  if(!auth.user) {
    return <div>
      <Navigate to="/admin"/>
    </div>
  }
  return (
    <div>{children}</div>
  )
}
