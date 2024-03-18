import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'
import { getTournamentBracketReducer } from '../helpers/requestReducers/tournament/tournamentReducers'
import { initialGetTournamentBracketState } from '../helpers/requestReducers/tournament/tournamentActions'
import { TOURNAMENT_ACTIVE_API_URL } from '../helpers/apiConfig'
import { FETCH_ERROR, FETCH_SUCCESS } from '../helpers/requestReducers/actions'
import TournamentBracket48 from '../components/TournamentBracket48'
import TournamentBracket32 from '../components/TournamentBracket32'
import TournamentBracket16 from '../components/TournamentBracket16'

//#region STYLES

const Header = styled.div`
  color: #f5f5f5;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: .5px;
  padding: 15px 0;
  text-align: center;
`

//#endregion

const Tournament = () => {

  let isComponentUnmounted = false;

  const [state, dispatch] = useReducer(getTournamentBracketReducer, initialGetTournamentBracketState);

  const fetchActiveTournament = async () => {
    try{
      const response = await fetch(TOURNAMENT_ACTIVE_API_URL);
      const tournament = await response.json();

      if(!isComponentUnmounted){
        dispatch({          
          type: FETCH_SUCCESS,
          payload: tournament
        });
      }
    } catch (error){
      if(!isComponentUnmounted){
        dispatch({          
          type: FETCH_ERROR,
          payload: error.message
        });
      }
    }
  }

  useEffect(() => {
    fetchActiveTournament();

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isComponentUnmounted = true;
    } 
  }, []);

  const renderTournamentBracket = (size) => {
    switch(size) {
      case 48:
        return <TournamentBracket48 tournament={state.tournament}/>;
      case 32: 
        return <TournamentBracket32 tournament={state.tournament}/>;
      case 16: 
        return <TournamentBracket16 tournament={state.tournament}/>;
      default:
        return <Header>Brak aktywnego turnieju</Header>
    }
  }

  console.log(state);

  return (
    <>
      {state.tournament && renderTournamentBracket(state.tournament.size)}
    </>
  )
}

export default Tournament
