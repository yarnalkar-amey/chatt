import React from 'react'
import { useAuthStore } from '../../store/useAuthStore'

const HomePage = () => {

  const {logout, authUser} = useAuthStore();
  return (
    <div>
       {console.log(authUser)}
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default HomePage
