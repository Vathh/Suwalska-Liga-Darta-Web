import React from 'react'
import styled from 'styled-components'
import SeasonTableHeader from './SeasonTableHeader'

//#region STYLES

const Table = styled.table`
  border: 1px solid white;
  border-collapse: collapse;
  min-width: 1200px;
  color: #fff;
`

const TBody = styled.tbody`
    
`

const PlayerRow = styled.tr`
    
`

const PlayerTd = styled.td`
  border: 1px solid white;
  text-align: center;
  color: #f5f5f5;
`

const goldColor = {
  color: '#F99417',
  fontWeight: 'bold'
}

const whiteColor = {
  color: '#F5F5F5'
}

//#endregion

const SeasonTable = ({ season }) => {

  const tournaments = season.tournaments.sort((a,b) => a.date - b.date);

  const playerSummaries = season.playerSummaries.sort((a,b) => b.rank - a.rank);
  
  let position = 0;
  const max180 = Math.max(...playerSummaries.map((player) => isNaN(player.max) ? 0 : player.max));
  const max170 = Math.max(...playerSummaries.map((player) => isNaN(player.oneSeventy) ? 0 : player.oneSeventy));
  const maxHF = Math.max(...playerSummaries.map((player) => isNaN(player.hf) ? 0 : player.hf));
  const maxQF = Math.min(...playerSummaries.map((player) => isNaN(player.qf) ? 99 : player.qf));

  const renderPlayerRows = () => {
    console.log(playerSummaries);
    return playerSummaries.map(player => {
      position++;
      return <PlayerRow key={player.name}>
              <PlayerTd>{position}</PlayerTd>
              <PlayerTd>{player.name}</PlayerTd>
              <PlayerTd>{player.rank}</PlayerTd>
              <PlayerTd>{player.total}</PlayerTd>
              {tournaments.map((tournament, index) => {
                const playerResult = tournament.results.find((result) => result.playerName === player.name);

                const pointsEarned = (playerResult != null && playerResult.pointsEarned > 0) ? 
                playerResult.pointsEarned : "";

                return <PlayerTd key={index}>{pointsEarned}</PlayerTd>
              })}
              <PlayerTd>{player.frequency}</PlayerTd>
              <PlayerTd style={player.max === max180 ? goldColor : whiteColor}>{player.max}</PlayerTd>
              <PlayerTd style={player.oneSeventy === max170 ? goldColor : whiteColor}>{player.oneSeventy}</PlayerTd>
              <PlayerTd style={player.hf === maxHF ? goldColor : whiteColor}>{player.hf}</PlayerTd>
              <PlayerTd style={player.qf === maxQF ? goldColor : whiteColor}>{player.qf}</PlayerTd>
            </PlayerRow>
    })
  }

  return (
    <Table>
      <SeasonTableHeader tournaments={tournaments}></SeasonTableHeader>
      <TBody>
        {renderPlayerRows()}
      </TBody>
    </Table>
    
  )
}

export default SeasonTable