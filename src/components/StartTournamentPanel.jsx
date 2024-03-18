import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TOURNAMENT_START_API_URL } from '../helpers/apiConfig'

//#region STYLES

const Container = styled.div`
  padding: 30px 0;
  width: 80%;
  flex-direction: column;
  align-items: center;
  display: ${props => (props.currentComponent === 3 ? 'flex' : 'none')};
`

const Header = styled.p`
  font-size: 18px;
  color: #f5f5f5;
  margin-bottom: 20px;
  text-align: center;
`

const TournamentSelect = styled.select`
  margin-bottom: 20px;
`

const TournamentOption = styled.option`
  
`

const PlayersPanel = styled.div`
  
`

const PlayersContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const PlayerBtn = styled.div`
  width: 110px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 10px;
  border: 2px solid rgba(255,255,255,.3);
  outline: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: color .3s, background-color .3s;
  margin-right: 5px;
  margin-bottom: 10px;

  color: ${props => (props.selected ? '#363062' : '#f5f5f5')};
  background: ${props => (props.selected ?  'rgba(245,245,245,.8)' : 'transparent')};
`

const PlayerName = styled.p`
  
`

const SubmitBtn = styled.div`
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 10px;
  border: 2px solid rgba(249, 148, 23,.8);
  outline: none;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 2px;
  cursor: pointer;
  color: #363062;
  background-color: rgba(249, 148, 23,.8);
  transition: color .3s, background-color .3s;
  
  &:hover{
    color: rgba(249, 148, 23,.8);
    background: transparent;
  }
`

//#endregion

const StartTournamentPanel = ({currentComponent, players, tournaments }) => {

  const [chosenTournamentId, setChosenTournamentId] = useState();  
  const [selectedPlayersIds, setSelectedPlayersIds] = useState([]);

  const renderTournamentsOptions = () => {
    return tournaments.map(tournament => {
      var date = new Date(tournament.date);
      var year = date.getFullYear();
      var month = ("0" + (date.getMonth() + 1)).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);
      var dateString = `${year}-${month}-${day}`;
      return <TournamentOption key={tournament.tournamentId} value={tournament.tournamentId}>{dateString}</TournamentOption>
    })
  }

  const renderPlayers = () => {
    return players.map(player => (
      <PlayerBtn 
        key={player.playerId}
        value={player.playerId}
        selected={selectedPlayersIds.includes(player.playerId)}
        onClick={() => handlePlayerBtn(player.playerId)}
      >
        <PlayerName>{player.name}</PlayerName>
      </PlayerBtn>
    ));
  }

  const handlePlayerBtn = (playerId) => {
    const updatedSelectedPlayersIds = [...selectedPlayersIds];
    const index = updatedSelectedPlayersIds.indexOf(playerId);

    if(index === -1){
      updatedSelectedPlayersIds.push(playerId);
    }else{
      updatedSelectedPlayersIds.splice(index, 1);
    }

    setSelectedPlayersIds(updatedSelectedPlayersIds);
  }

  const handleStartBtn = async (e) => {
    e.preventDefault();
    console.log("test");

    try{
      const startTournamentDTO = {
        tournamentId: chosenTournamentId,
        playersIds: selectedPlayersIds
      };

      const response = await fetch(
        TOURNAMENT_START_API_URL, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(startTournamentDTO)
        });

        if(response.ok){
          console.log(`Turniej o ID ${chosenTournamentId} wystartował!`);
          console.log(startTournamentDTO);
          resetData();
        }else{
          console.error('Blad podczas startowania sezonu', response.statusText);
        }
      } catch (error) {
        console.error('Blad podczas strzalu do API', error);
      }
  };

  const resetData = () => {
    if(tournaments && tournaments.length > 0){
      setChosenTournamentId(tournaments[0].tournamentId);
    }
    setSelectedPlayersIds([]);
  }


  useEffect(() => {
    if(tournaments && tournaments.length > 0){
      setChosenTournamentId(tournaments[0].tournamentId);
    }
  }, [tournaments])

  return (
    <Container currentComponent={currentComponent}>
      <Header>Wybierz turniej:</Header>
      <TournamentSelect 
        onChange={(e) => setChosenTournamentId(e.target.value)}>
        {renderTournamentsOptions()}
      </TournamentSelect>
      <PlayersPanel>
        <Header>Wybierz zawodników:</Header>
        <PlayersContainer>
          {renderPlayers()}
        </PlayersContainer>
      </PlayersPanel>
      <SubmitBtn onClick={handleStartBtn}>START</SubmitBtn>
    </Container>
  )
}

export default StartTournamentPanel
