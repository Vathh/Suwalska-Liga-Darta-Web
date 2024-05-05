import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { LOGOUT_API_URL } from '../helpers/apiConfig'

//#region STYLES

const Container = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;       
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: rgba(0,0,0,.1);
  padding: 7px 0;
`

const NavBtn = styled(Link)`
  position: relative;
  height: 100%;
  margin: auto 0;
  font-size: 18px;
  padding-right: 20px;
  padding-left: 20px;
  cursor: pointer;
  text-decoration: none;
  color: #F5F5F5;

  ::before{
    content: '';
    width: 1px;
    height: 60%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: #F5F5F5;
  }

  :first-of-type{
    ::before{
      display: none;
    }
  }
`

const chosenComponentStyles = {
  color: '#F99417'
}


//#endregion

const Nav = () => {

  const { auth, setAuth } = useAuth();

  const [currentComponent, setCurrentComponent] = useState(0);

  const handleNavBtnStyles = (param) => {
    if(currentComponent === param){
      return chosenComponentStyles;
    }
    return null;
  }

  const handleNavBtn = (e) => {
    setCurrentComponent(parseInt(e.target.getAttribute("data-nr")));
  }  

  const logOut = async () => {    
    try{      
      const response = await fetch(LOGOUT_API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${auth?.accessToken}`
        }
      });

      if(response.ok){
        setAuth({});
      }else{
        console.error('Blad podczas wylogowywania', response.statusText);
      }
    } catch (error) {
      console.error('Blad podczas strzalu do API', error);
    }
  }

  return (
    <Container>
      <NavBtn to='/season' onClick={handleNavBtn} style={handleNavBtnStyles(0)} data-nr={0}>Sezony</NavBtn>
      <NavBtn to='/tournament' onClick={handleNavBtn} style={handleNavBtnStyles(1)} data-nr={1}>Bieżący Turniej</NavBtn>
      <NavBtn to='/tournamentDetails' onClick={handleNavBtn} style={handleNavBtnStyles(2)} data-nr={2}>Turnieje</NavBtn>
      <NavBtn to='/admin' onClick={handleNavBtn} style={handleNavBtnStyles(3)} data-nr={3}>Panel Admina</NavBtn>

      { auth?.userName && 
        <NavBtn to='/' onClick={logOut}>Wyloguj się</NavBtn>
      }
    </Container>
  )
}

export default Nav
