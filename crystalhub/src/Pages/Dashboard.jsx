import React from 'react'
import Header from '../layout/Header'
import Pyrite from '../component/Pyrite'
import RingSlider from '../component/RingSlider'
import Footer from '../layout/Footer'
import ProductCards from '../component/Productcard'

const Dashboard = () => {
  return (
    <>
        <Header/>   
        <Pyrite/>
        <RingSlider/>
        <ProductCards/>
        <Footer/>
    </>
  )
}

export default Dashboard