import React, { useState } from 'react'
import styled from 'styled-components'
import PlayersTable from './PlayersTable'
import AddPlayerPanel from './AddPlayerPanel'

//#region STYLES

  const Container = styled.div`
    padding: 30px 0;
    width: 80%;
    flex-direction: column;
    align-items: center;
  `

  const displayFlex = {
    display: 'flex'
  }
  
  const displayNone = {
    display: 'none'
  }

  const AddPlayerBtn = styled.button`
  margin-top: 40px;
  border: 1px solid transparent;
  border-radius: 15px;
  padding: 10px 20px;
  background-color: #F99417;
  color: #363062;
  /* font-weight: bold; */
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: color .3s, background-color .3s, border .3s;

  &:hover{
    color: #F99417;
    background-color: #363062;
    border: 1px solid #F99417;
  }
`
  
//#endregion

const PlayersPanel = ({ currentComponent, players, fetchPlayers }) => {

  const [addPlayerVisibility, setAddPlayerVisibility] = useState(false);

  const showAddPlayerPanel = () => {
    setAddPlayerVisibility(true);
  }

  const hideAddPlayerPanel = () => {
    setAddPlayerVisibility(false);
  }
  
  return (
    <Container style={currentComponent === 2 ? displayFlex : displayNone}>
      {players &&
        <PlayersTable players={players} ></PlayersTable>
      }
      <AddPlayerBtn onClick={showAddPlayerPanel}>Dodaj nowego gracza</AddPlayerBtn>
      <AddPlayerPanel isVisible={addPlayerVisibility} onClose={hideAddPlayerPanel} fetchPlayers={fetchPlayers}/>
    </Container>
  )
}

export default PlayersPanel
