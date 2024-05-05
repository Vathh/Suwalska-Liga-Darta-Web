import React from 'react'
import styled from 'styled-components'
import PlayersTableHeader from './PlayersTableHeader'

//#region STYLES

  const Table = styled.table`
    border: 1px solid white;
    border-collapse: collapse;
    /* min-width: 1200px; */
    color: #fff;
  `

  const TBody = styled.tbody`
    
  `

  const PlayerRow = styled.tr`
  `

const PlayerTd = styled.td`
    padding-top: 2px;
    padding-bottom: 2px;
    border: 1px solid white;
    text-align: center;
    color: #f5f5f5;
  `

//#endregion

const PlayersTable = ({ players }) => {  

  const renderPlayerRows = () => {
    return players.sort((a,b) => a.name.localeCompare(b.name)).map(player => 
      <PlayerRow key={player.playerId}>
        <PlayerTd>{player.name}</PlayerTd>
        <PlayerTd>{player.hf}</PlayerTd>
        <PlayerTd>{player.qf}</PlayerTd>
        <PlayerTd>{player.max}</PlayerTd>
        <PlayerTd>{player.oneSeventy}</PlayerTd>
      </PlayerRow>)
  }

  return (
    <Table>
      <PlayersTableHeader />
      <TBody>
        {renderPlayerRows()}
      </TBody>
    </Table>
  )
}

export default PlayersTable
