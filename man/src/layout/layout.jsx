import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <div style={{display:"flex",gap:"20px"}}>
        <Link to="/">RTKTODOS</Link>
        <Link to="/rtkCategori">RTKCATEGORI</Link>
        </div>
      <Outlet/>
    </div>
  )
}
export default Layout
