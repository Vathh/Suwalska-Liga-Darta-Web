import React from 'react'
import styled from 'styled-components'
import Nav from './Nav';
import Subpage from './Subpage';

//#region STYLES

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  min-width: 100vw;  
  background: #363062;
  transition: all .5s;
`

//#endregion

const Page = () => {  
  return (
    <>    
      <Container>
        <Nav />
        <Subpage />
      </Container>
    </>
  )
}
export default Page
