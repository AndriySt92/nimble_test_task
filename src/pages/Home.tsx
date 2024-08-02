import React from 'react'
import { ContactForm, ContactsList } from '../components'

const Home = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-[30%_70%] gap-10'>
        <ContactForm />
        <ContactsList />
    </div>
  )
}

export default Home