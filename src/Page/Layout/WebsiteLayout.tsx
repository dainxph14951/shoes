import React from 'react'
import { Outlet } from 'react-router-dom'
import Banner from '../../Components/Website/Banner'
import Footer from '../../Components/Website/Footer'
import Header from '../../Components/Website/Header'

type Props = {}

const WebsiteLayout = (props: Props) => {
  return (
    <div>
      <header>
     <Header/>
      </header>
      <div>
      <Banner/>
      </div>
      <main>
      <Outlet/>
      </main>
      <footer>
      <Footer/>
      </footer>
    </div>
  )
}

export default WebsiteLayout