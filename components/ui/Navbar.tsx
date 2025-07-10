import React from 'react'

const Navbar = () => {
  return (
  <header className="bg-gray-900 text-white py-4">
    <div className="container mx-auto flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Logo</h1>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  )
}

export default Navbar
