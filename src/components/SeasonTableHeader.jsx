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
    height: 140px;
  `

  const ThContainer = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  `

  const ThParagraph = styled.p`
    writing-mode: vertical-rl;
    text-orientation: mixed;
    margin-top: 10px;

  `

  const ThIndex = styled.p`
    margin-bottom: 5px;
  `
  
//#endregion


const SeasonTableHeader = ({ tournaments }) => {
  
  let index = 0;
  const renderSeasonHeaders = () => {
    return tournaments.map(tournament => {
      index++;
      var date = new Date(tournament.date);
      var year = date.getFullYear();
      var month = ("0" + (date.getMonth() + 1)).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);
      return <HeaderTh key={index}>
              <ThContainer>
                <ThParagraph>{year}-{month}-{day}</ThParagraph>
                <ThIndex>{index}</ThIndex>
              </ThContainer>
            </HeaderTh>
    })
  }

  return (
    <Thead>
      <HeaderTr>
        <HeaderTh>Poz.</HeaderTh>
        <HeaderTh>Zawodnik</HeaderTh>
        <HeaderTh>Ranking</HeaderTh>
        <HeaderTh>Suma</HeaderTh>

        {renderSeasonHeaders()}

        <HeaderTh>Starty</HeaderTh>
        <HeaderTh>MAX</HeaderTh>
        <HeaderTh>170+</HeaderTh>
        <HeaderTh><ThContainer><ThParagraph>Najwyższy finish</ThParagraph> HF</ThContainer></HeaderTh>
        <HeaderTh><ThContainer><ThParagraph>Szybka lotka</ThParagraph> QF</ThContainer></HeaderTh>
      </HeaderTr>
    </Thead>
  )
}

export default SeasonTableHeader
