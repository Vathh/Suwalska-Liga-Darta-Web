import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

//#region STYLES

  const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `

  const Header = styled.h1`
    margin-top: 50px;
    color: #c5c5c5;
  `

  const RedirectLink = styled(Link)`
    font-size: 18px;
    cursor: pointer;
    text-decoration: none;
    color: #F5F5F5;
    margin-top: 30px;
  `

//#endregion

const Missing = () => {
  return (
    <Container>
      <Header>Nie odnaleziono strony</Header>
      <RedirectLink to="/">Powrót na stronę główną</RedirectLink>
    </Container>
  )
}

export default Missing
