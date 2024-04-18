import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';

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

const Info = styled.p`
    margin-top: 20px;
    color: #c5c5c5;
  `

  const Button = styled.button`
    margin-top: 20px;
    font-size: 18px;
    cursor: pointer;
    color: #F5F5F5;
    margin-top: 30px;
    border: 1px solid #c5c5c5;
    background: none;
    padding: 10px 15px;
    border-radius: 5px;
    transition: all .3s;

    &:hover{
      color: #363062;
      background-color: rgba(245, 245, 245, 0.8);
    }
  `

//#endregion

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Container>
      <Header>Brak autoryzacji</Header>
      <Info>Nie masz dostępu do tego zasobu.</Info>
      <Button onClick={goBack}>Wróć</Button>      
    </Container>
  )
}

export default Unauthorized
