import React from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'

//#region STYLES

const Wrapper = styled.div`
  display: block;
  position:fixed;
  top: 0;
  left: 0;
  z-index:999;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,.75);
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #363062;
  border: 2px solid rgba(255,255,255,.3);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0,0,0,.3);
  color: #fff;
  border-radius: 10px;
  padding: 20px;
`

const Date = styled.p`
  margin-bottom: 20px;
`

const Header = styled.p`
  margin-bottom: 20px;
`

const Button = styled.button`
  padding: 5px 10px;
  border-radius: 5px;
  background: transparent;
  border: 2px solid rgba(255,255,255,.3);
  outline: none;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 15px;
  transition: color .3s, background-color .3s;

  &:last-of-type{
    margin-bottom: 0;
  }

  &:hover{
    color: #363062;
    background-color: rgba(245, 245, 245, 0.8);
  }
`

//#endregion

const Popup = ({ title, header, handleConfirmation, isConfirmationVisible }) => {
  return isConfirmationVisible && ReactDOM.createPortal(
    <Wrapper>
      <Container>
        <Date>{title}</Date>
        <Header>{header}</Header>
        <Button onClick={() => handleConfirmation(true)}>Tak</Button>
        <Button onClick={() => handleConfirmation(false)}>Nie</Button>
      </Container>
    </Wrapper>,
    document.body
  );
};

export default Popup
