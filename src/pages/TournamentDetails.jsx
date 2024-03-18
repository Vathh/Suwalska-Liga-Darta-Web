import React, { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'
import { getTournamentDetailsReducer, getTournamentsReducer } from '../helpers/requestReducers/tournament/tournamentReducers'
import { initialGetTournamentDetailsState, initialGetTournamentsState } from '../helpers/requestReducers/tournament/tournamentActions'
import { FETCH_ERROR, FETCH_SUCCESS } from '../helpers/requestReducers/actions'
import { TOURNAMENTS_API_URL, TOURNAMENT_DETAILS_API_URL } from '../helpers/apiConfig'
import TournamentDetailsTable from '../components/TournamentDetailsTable'

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

const SelectsContainer = styled.div`

`

const Select = styled.select`
  :first-of-type{
    margin-right: 50px;
  }
`

const Option = styled.option`
  
`

//#endregion

const TournamentDetails = () => {

  let isComponentUnmounted = false;

  const [tournamentsState, tournamentsDispatch] = useReducer(getTournamentsReducer, initialGetTournamentsState);
  const [tournamentState, tournamentDispatch] = useReducer(getTournamentDetailsReducer, initialGetTournamentDetailsState);

  const [chosenSeason, setChosenSeason] = useState("");
  const [tournamentsDates, setTournamentsDates] = useState([]);
  const [chosenTournament, setChosenTournament] = useState(null);

  const fetchTournaments = async () => {
    try{
      const response = await fetch(TOURNAMENTS_API_URL);
      const tournaments = await response.json();

      if(!isComponentUnmounted){
        const sortedTournaments = tournaments.sort((a,b) => b.date - a.date).filter(tournament => tournament.closed);

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

  const fetchTournamentDetails = async (tournamentId) => {
    try {
      const response = await fetch(TOURNAMENT_DETAILS_API_URL + tournamentId);
      const tournamentDetails = await response.json();
      if(!isComponentUnmounted){
        tournamentDispatch({
          type: FETCH_SUCCESS,
          payload: tournamentDetails
        });
      }
    } catch (error) {
      tournamentDispatch({type: FETCH_ERROR, payload: error.message})
      console.error('Błąd podczas pobierania szczegółów turnieju z API', error);
    }
  };

  const seasonNamesSet = new Set(tournamentsState.tournaments.map(tournament => tournament.seasonName));
  
  const seasonNames = [...seasonNamesSet];

  if(seasonNames.length > 0 && chosenSeason === ""){
    setChosenSeason(seasonNames[0]);
  };

  const renderSeasonOptions = () => {
    return seasonNames.map(name => {
      return <Option key={name} value={name}>{name}</Option>
    });
  }

  const loadTournaments = () => {
    const tournaments = tournamentsState.tournaments.filter(tournament => tournament.seasonName === chosenSeason);

    setChosenTournament(tournaments[0]);

    return tournaments.map(tournament => tournament.date)
  }

  const renderTournamentOptions = () => {
    return tournamentsDates.map(tournamentDate => {
      var date = new Date(tournamentDate);
      var year = date.getFullYear();
      var month = ("0" + (date.getMonth() + 1)).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);
      var dateString = `${year}-${month}-${day}`;
      return <Option key={tournamentDate} value={tournamentDate}>{dateString}</Option>
    })
  }

  const loadChosenTournament = (date) => {
    for(let i = 0; i < tournamentsState.tournaments.length; i++){
      // eslint-disable-next-line eqeqeq
      if(tournamentsState.tournaments[i].date == date) {
        setChosenTournament(tournamentsState.tournaments[i]);
      }
    }

    return null;
  }

  useEffect(() => {
    fetchTournaments();
    
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isComponentUnmounted = true;
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(chosenTournament){
      fetchTournamentDetails(chosenTournament.tournamentId);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isComponentUnmounted = true;
    } 

  }, [chosenTournament]);

  useEffect(() => {
    if(chosenSeason !== ""){
      setTournamentsDates(loadTournaments());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenSeason]);


  return (
    <Container>
      <SelectsContainer>
        <Select 
          onChange={(e) => setChosenSeason(e.target.value)}>
          {renderSeasonOptions()}
        </Select>
        <Select 
          onChange={(e) => loadChosenTournament(e.target.value)}>
          {renderTournamentOptions()}
        </Select>
      </SelectsContainer>
      {chosenTournament && <TournamentDetailsTable tournament={tournamentState.tournament}/>}
    </Container>
  )
}

export default TournamentDetails
