import React, { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'
import AdminPanelNavigation from '../components/AdminPanelNavigation'
import SeasonsPanel from '../components/SeasonsPanel'
import TournamentsPanel from '../components/TournamentsPanel'
import PlayersPanel from '../components/PlayersPanel'
import StartTournamentPanel from '../components/StartTournamentPanel'
import { PLAYERS_API_URL, SEASONS_API_URL, TOURNAMENTS_API_URL } from '../helpers/apiConfig'
import { FETCH_ERROR, FETCH_SUCCESS } from '../helpers/requestReducers/actions'
import { getSeasonsReducer } from '../helpers/requestReducers/season/seasonReducers'
import { initialGetSeasonsState } from '../helpers/requestReducers/season/seasonActions'
import { getTournamentsReducer } from '../helpers/requestReducers/tournament/tournamentReducers'
import { initialGetTournamentsState } from '../helpers/requestReducers/tournament/tournamentActions'
import { getPlayersReducer } from '../helpers/requestReducers/player/playerReducers'
import { initialGetPlayersState } from '../helpers/requestReducers/player/playerActions'

//#region STYLES

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 800px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 0 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Header = styled.h1`
  text-align: center;
  color: rgba(245, 245, 245, 0.7);
  margin-bottom: 20px;
`

const chosenComponentStyles = {
  color: '#F99417'
}

//#endregion



const AdminPanel = () => {

  let isComponentUnmounted = false;

  const [seasonState, seasonDispatch] = useReducer(getSeasonsReducer, initialGetSeasonsState);
  const [tournamentsState, tournamentsDispatch] = useReducer(getTournamentsReducer, initialGetTournamentsState);
  const [playersState, playersDispatch] = useReducer(getPlayersReducer, initialGetPlayersState);

  const openTournaments = tournamentsState.tournaments.filter(tournament => !tournament.closed).filter(tournament => !tournament.active);
  const closedTournaments = tournamentsState.tournaments.filter(tournament => tournament.closed);  

  const [currentComponent, setCurrentComponent] = useState(0);

  const fetchSeasons = async () => {
    try{
      const response = await fetch(SEASONS_API_URL);
      const seasons = await response.json();

      if(!isComponentUnmounted){
        const sortedSeasons = seasons.sort((a,b) => a.startDate - b.startDate);
      
        seasonDispatch({
          type: FETCH_SUCCESS, 
          payload: sortedSeasons
        });
      }
    } catch (error){
      if(!isComponentUnmounted){
        seasonDispatch({
          type: FETCH_ERROR, 
          payload: error.message
        });
      }
    }
  }

  const fetchTournaments = async () => {
    try{
      const response = await fetch(TOURNAMENTS_API_URL);
      const tournaments = await response.json();

      if(!isComponentUnmounted){
        const sortedTournaments = tournaments.sort((a,b) => b.date - a.date);

        tournamentsDispatch({
          type: FETCH_SUCCESS, 
          payload: sortedTournaments
        });
      }
    } catch (error){
      if(!isComponentUnmounted){
        tournamentsDispatch({
          type: FETCH_ERROR, 
          payload: error.message
        });
      }
    }
  }

  const fetchPlayers = async () => {
    try{
      const response = await fetch(PLAYERS_API_URL);
      const players = await response.json();
      const result = players.filter(player => player.name !== "EMPTY");

      if(!isComponentUnmounted){
        playersDispatch({
          type: FETCH_SUCCESS, 
          payload: result
        });
      }
    } catch (error){
      if(!isComponentUnmounted){
        playersDispatch({
          type: FETCH_ERROR, 
          payload: error.message
        });
      }
    }
  }

  const handleBtnStyles = (param) => {
    if(currentComponent === param){
      return chosenComponentStyles;
    }
    return null;
  }

  const handleBtn = (e) => {
    setCurrentComponent(parseInt(e.target.getAttribute("data-nr")));
  }  

  useEffect(() => {
    fetchSeasons();
    fetchTournaments();
    fetchPlayers();
    
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isComponentUnmounted = true;
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Header>Suwalska Liga Darta</Header>
      <AdminPanelNavigation handleBtnStyles={handleBtnStyles} handleBtn={handleBtn}/>

      <SeasonsPanel 
        currentComponent={currentComponent} 
        seasons={seasonState.seasons} 
        fetchSeasons={fetchSeasons}
        fetchTournaments={fetchTournaments}>
      </SeasonsPanel>
      <TournamentsPanel 
        currentComponent={currentComponent} 
        openTournaments={openTournaments} 
        closedTournaments={closedTournaments}>
      </TournamentsPanel>
      <PlayersPanel 
        currentComponent={currentComponent} 
        players={playersState.players}
        fetchPlayers={fetchPlayers}          
        >
      </PlayersPanel>
      <StartTournamentPanel 
        currentComponent={currentComponent}
        players={playersState.players}
        tournaments={openTournaments}>        
      </StartTournamentPanel>
      
    </Container>
  )
}

export default AdminPanel