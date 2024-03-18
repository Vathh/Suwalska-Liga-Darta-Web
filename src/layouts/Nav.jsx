import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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
  display: flex;
  align-items: center;
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

  return (
    <Container>
      <NavBtn to='/tournament' onClick={handleNavBtn} style={handleNavBtnStyles(0)} data-nr={0}>Bieżący Turniej</NavBtn>
      <NavBtn to='/season' onClick={handleNavBtn} style={handleNavBtnStyles(1)} data-nr={1}>Sezony</NavBtn>
      <NavBtn to='/admin' onClick={handleNavBtn} style={handleNavBtnStyles(2)} data-nr={2}>Panel Admina</NavBtn>
      <NavBtn to='/tournamentDetails' onClick={handleNavBtn} style={handleNavBtnStyles(3)} data-nr={3}>Turnieje</NavBtn>
    </Container>
  )
}

export default Nav
