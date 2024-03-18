import React from 'react'
import styled from 'styled-components'

//#region STYLES

const Container = styled.div`
  position: fixed;
  display: flex;
  bottom: 0;
  width: 100%;  
  background: rgba(0,0,0,.2);
  padding: 5px 10px;
  justify-content: flex-end;
  z-index: 1000;
`
const Signature = styled.p`
  position: relative;
  color: #cda619;
`

//#endregion
const Footer = () => {
  return (
    <Container>
      
      <Signature>&copy; {new Date().getFullYear()} SunnyVale</Signature>

    </Container>
  )
}
export default Footer
