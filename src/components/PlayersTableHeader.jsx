import React from 'react'
import styled from 'styled-components'

//#region STYLES

  const Thead = styled.thead`
      
  `

  const HeaderTr = styled.tr`
    
  `

  const HeaderTh = styled.th`
    border: 1px solid white;
    vertical-align: bottom;
    position: relative;
    padding: 10px 15px;
  `

//#endregion

const PlayersTableHeader = () => {
  return (
    <Thead>
      <HeaderTr>
        <HeaderTh>Zawodnik</HeaderTh>
        <HeaderTh>HF</HeaderTh>
        <HeaderTh>QF</HeaderTh>
        <HeaderTh>MAX</HeaderTh>
        <HeaderTh>170+</HeaderTh>
      </HeaderTr>
    </Thead>
  )
}

export default PlayersTableHeader
