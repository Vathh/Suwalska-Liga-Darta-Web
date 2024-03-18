import React, { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'
import { SEASONS_API_URL, SEASONS_DETAILS_API_URL } from '../helpers/apiConfig'
import { getSeasonsReducer, seasonDetailsReducer } from '../helpers/requestReducers/season/seasonReducers'
import { initialGetSeasonsState, initialSeasonDetailsState } from '../helpers/requestReducers/season/seasonActions'
// import { FETCH_SUCCESS, FETCH_ERROR } from "../actions";
import SeasonTable from '../components/SeasonTable'
import { FETCH_ERROR, FETCH_SUCCESS } from '../helpers/requestReducers/actions'

//#region STYLES

  const Container = styled.div`
    position: relative;
    min-width: 800px;
    max-width: 1400px;
    /* background: rgba(0,0,0,.1); */
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
    margin-bottom: 30px;
  `

  const Title = styled.p`
    text-align: center;
    color: #f5f5f5;
    font-size: 26px;
    margin-bottom: 30px;
  `

  const TournamentsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    width: 600px;
    margin-top: 20px;
  `

  const SeasonButton = styled.button`
    position: relative;
    display: flex;
    padding: 5px 10px;
    border: 2px solid rgba(255,255,255,.3);
    border-radius: 5px;
    background: transparent;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    color: #F5F5F5;

    transition: color .3s, background-color .3s;

    &:hover{
      color: #363062;
      background-color: rgba(245, 245, 245, 0.8);
    }
  ` 
//#endregion



const Season = () => {

  let isComponentUnmounted = false;
  
  const [state, dispatch] = useReducer(getSeasonsReducer, initialGetSeasonsState);

  const [currentSeasonId, setCurrentSeasonId] = useState('');

  const [seasonState, seasonDispatch] = useReducer(seasonDetailsReducer, initialSeasonDetailsState);

  const fetchSeasonDetails = async (seasonId) => {
    try {
      const response = await fetch(SEASONS_DETAILS_API_URL + seasonId);
      const seasonDetails = await response.json();
      if(!isComponentUnmounted){
        seasonDispatch({
          type: FETCH_SUCCESS,
          payload: seasonDetails
        });
      }
    } catch (error) {
      seasonDispatch({type: FETCH_ERROR, payload: error.message})
      console.error('Błąd podczas pobierania szczegółów sezonu z API', error);
    }
  };

  const fetchSeasons = async () => {
    try{
      const response = await fetch(SEASONS_API_URL);
      const seasons = await response.json();

      const oldestSeason = seasons.reduce((oldest, current) => {
        const oldestDate = Date.parse(oldest.startDate);
        const currentDate = Date.parse(current.startDate);
        
        return currentDate < oldestDate ? current : oldest;
      }, seasons[0]);
      
      if(!isComponentUnmounted){
        dispatch({
          type: FETCH_SUCCESS, 
          payload: seasons
        });
        setCurrentSeasonId(oldestSeason.seasonId);
      }
    } catch (error){
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  }

  function handleSeasonBtn(seasonId) {
    setCurrentSeasonId(seasonId);
  }

  useEffect(() => {
    fetchSeasons();

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isComponentUnmounted = true;
    }    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(currentSeasonId !== ''){
      fetchSeasonDetails(currentSeasonId);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isComponentUnmounted = true;
    }
  }, [currentSeasonId])

  const renderSeasons = () => {
    return state.seasons.map(season => (
      <SeasonButton key={season.seasonId} id={season.seasonId} onClick={() => handleSeasonBtn(season.seasonId)}>{season.name}</SeasonButton>
    ))
  }

  return (
    <Container>
      <Header>Suwalska Liga Darta</Header>

      {seasonState.season && seasonState.season.tournaments && 
        <>
          <Title>{seasonState.season.name}</Title>
          <SeasonTable season={seasonState.season}></SeasonTable>
        </>
      }

      <TournamentsContainer>
        {renderSeasons()}
      </TournamentsContainer>      
    </Container>
  )
}

export default Season