import React from 'react'
import Image from './Home.jpg';
const Home = () => {
  return (
    <div>
      <img src={Image} alt="Admin" style={{ maxWidth: '100%' }} /> {/* Adding the image */}
    </div>
  )
}

export default Home
