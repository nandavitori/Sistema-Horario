
import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { ScheduleProvider } from './components/Schedule/ScheduleContext'
import AdminPainel from './components/AdminPainel/AdminPainel'

import ScheduleViiew from './components/Schedule/ScheduleViiew'
import Footer from './components/Footer/Footer'
function App() {

  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <ScheduleProvider>
      <div className='min-h-screen bg-gray-50'>
        <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
        <main className='max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 py-8'>
          {isAdmin ? <AdminPainel/> : <ScheduleViiew/>} 
          
        </main>
      </div>
      <Footer />
    </ScheduleProvider>
  )
}

export default App
