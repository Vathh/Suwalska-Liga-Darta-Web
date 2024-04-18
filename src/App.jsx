import { Routes, Route } from "react-router-dom"
import Footer from "./layouts/Footer";
import Nav from "./layouts/Nav";
import styled from 'styled-components'
import Season from "./pages/Season";
import Tournament from "./pages/Tournament";
import TournamentDetails from "./pages/TournamentDetails";
import AdminPanel from "./pages/AdminPanel";
import Layout from "./pages/Layout";
import Missing from "./pages/Missing";
import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./pages/RequireAuth";
import Login from "./pages/Login";

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  min-width: 100vw;  
  background: #363062;
  transition: all .5s;
`

const App = () => {

    return (
      <>
          <Container>
            <Nav />
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route path="login" element={<Login />}/>
                <Route path='season' element={<Season/>}/>
                <Route path='tournament' element={<Tournament/>}/>
                <Route path='tournamentDetails' element={<TournamentDetails/>}/>  
                <Route path="unauthorized" element={<Unauthorized />}></Route>

                {/* admin routes */}
                <Route element={<RequireAuth />}>
                  <Route path='admin' element={<AdminPanel/>}/> 
                </Route>

                {/* catch all */}
                <Route path="*" element={<Missing />}></Route>
              </Route>
            </Routes>
          </Container>
        <Footer/>
      </>
    )
};

export default App;