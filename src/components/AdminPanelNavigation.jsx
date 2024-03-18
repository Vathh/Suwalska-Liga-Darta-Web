import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

//#region STYLES

const Container = styled.div`
  width: 100%;       
  display: flex;
  align-content: center;
  justify-content: center;
  border: 1px solid rgba(255,255,255,.2);
  border-left: none;
  border-right: none;
`

const NavBtn = styled(Link)`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  margin: auto 0;
  font-size: 17px;
  padding: 7px 20px 7px 20px;
  cursor: pointer;
  text-decoration: none;
  color: #F5F5F5;

  ::before{
    content: '';
    width: 1px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255,255,255,.3);
  }

  :first-of-type{
    ::before{
      display: none;
    }
  }
`

//#endregion

const AdminPanelNavigation = ({ handleBtnStyles, handleBtn }) => {
  return (
    <Container>
      <NavBtn onClick={handleBtn} style={handleBtnStyles(0)} data-nr={0}>Sezony</NavBtn>
      <NavBtn onClick={handleBtn} style={handleBtnStyles(1)} data-nr={1}>Turnieje</NavBtn>
      <NavBtn onClick={handleBtn} style={handleBtnStyles(2)} data-nr={2}>Zawodnicy</NavBtn>
      <NavBtn onClick={handleBtn} style={handleBtnStyles(3)} data-nr={3}>Graj</NavBtn>
    </Container>
  )
}

export default AdminPanelNavigation
