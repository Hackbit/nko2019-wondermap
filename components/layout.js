import React from 'react'
import Head from 'next/head'
import Header from './header'

const Layout = ({ children, centered, profile }) => (
  <React.Fragment>
    <Head>
      <title>WonderMap</title>
      <link href='https://fonts.googleapis.com/css?family=Rubik:400,700&display=swap' rel='stylesheet'></link>
    </Head>
    <Header profile={profile} />

    <main className={centered ? 'h-screen flex flex-col justify-center content-center' : 'mt-32'}>
      <div className={centered ? '' : 'max-w-5xl mx-auto'}>
        {children}
      </div>
    </main>
  </React.Fragment>
)

export default Layout
