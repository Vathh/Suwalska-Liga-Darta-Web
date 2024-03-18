import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminPannel from '../pages/AdminPanel'
import Season from '../pages/Season'
import Tournament from '../pages/Tournament'
import TournamentDetails from '../pages/TournamentDetails'

const Subpage = () => {
  return (
    <Routes>
      <Route path='/season' element={<Season/>}/>
      <Route path='/tournament' element={<Tournament/>}/>
      {/* {/* <Route path='/stats' element={<Statistics/>}/> */}
      <Route path='/admin' element={<AdminPannel/>}/>  
      <Route path='/tournamentDetails' element={<TournamentDetails/>}/>  
    </Routes>
  )
}

export default Subpage