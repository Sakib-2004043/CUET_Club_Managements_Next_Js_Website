import React from 'react'
import "./header.css"
import Link from 'next/link'

const Header = () => {
  return ( 
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">CUET Club Management System</h1>
        <nav className="header-nav">
          <Link href="/" className="header-link">Home</Link>
          <Link href="/login" className="header-link">Login</Link>
          <Link href="/register" className="header-link">Register</Link>
          <Link href="/about" className="header-link">About</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header