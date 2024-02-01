import React from 'react'

export default function Navbar() {
  const currentTitle = {
    '/broadcasting': 'Broadcasting',
    '/comitive': 'Comitive',
    '/contatti': 'Proclamatori',
    '/': 'GESTIONALE SAVA 2',
  }
  return (
    <div>
      <header>
        <h1>{currentTitle[window.location.pathname]}</h1>
      </header>
      <nav>
        <a href="/">Home</a>
        <a href="broadcasting">Broadcasting</a>
        <a href="comitive">Comitive</a>
        <a href="contatti">Proclamatori</a>
      </nav>
    </div>
  )
}
