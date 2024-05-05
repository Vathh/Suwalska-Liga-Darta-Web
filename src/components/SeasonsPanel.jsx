import React, { useState } from 'react'
import styled from 'styled-components'
import AddSeasonPanel from './AddSeasonPanel'
import { SEASONS_DETAILS_API_URL } from '../helpers/apiConfig'
import Popup from './Popup'
import useAuth from '../hooks/useAuth'

//#region STYLES

const Container = styled.div`
  padding: 30px 0;
  width: 80%;
  flex-direction: column;
  align-items: center;
`

const SeasonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const Season = styled.div`
  padding: 10px 20px;
  border-radius: 15px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #363062;
  border: 2px solid rgba(255,255,255,.3);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0,0,0,.3);
  margin-right: 20px;
  margin-bottom: 20px;

  &:last-of-type{
    margin-right: 0;
  }
`

const SeasonHeader = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #F5F5F5;
  margin-bottom: 20px;
`

const SeasonBtn = styled.button`
  padding: 5px 10px;
  border-radius: 5px;
  background: transparent;
  border: 2px solid rgba(255,255,255,.3);
  outline: none;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 15px;
  transition: color .3s, background-color .3s;

  &:last-of-type{
    margin-bottom: 0;
  }

  &:hover{
    color: #363062;
    background-color: rgba(245, 245, 245, 0.8);
  }
`

const AddSeasonBtn = styled.button`
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

const displayFlex = {
  display: 'flex'
}

const displayNone = {
  display: 'none'
}

//#endregion

const SeasonsPanel = ({ currentComponent, seasons, fetchSeasons, fetchTournaments }) => {

  const { auth } = useAuth();

  const [addSeasonVisibility, setAddSeasonVisibility] = useState(false);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);

  const showAddSeasonPanel = () => {
    setAddSeasonVisibility(true);
  }

  const hideAddSeasonPanel = () => {
    setAddSeasonVisibility(false);
  }

  const handleDeleteClick = () => {
    setIsDeleteConfirmationVisible(true);
  }

  const deleteSeason = async (seasonId) => {
    try{
      const response = await fetch(SEASONS_DETAILS_API_URL + seasonId, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth?.accessToken}`
        }
      });

      if(response.ok){
        console.log('Usunieto sezon o id: ' + seasonId);
        fetchSeasons();
      }else{
        console.error('Blad podczas usuwania sezonu', response.statusText);
      }
    } catch (error) {
      console.error('Blad podczas strzalu do API (usuwanie sezonu)', error);
    }
  }

  const deleteHeader = "Czy na pewno chcesz usunąć ten sezon?";

  const renderSeasons = () => {
    return seasons.map(season => {

      const handleDeleteConfirmation = (confirmed) => {
        if(confirmed){
          deleteSeason(season.seasonId);
        }
    
        setIsDeleteConfirmationVisible(false);
      }

      return <Season key={season.seasonId}>
              <SeasonHeader>{season.name}</SeasonHeader>
              <SeasonBtn>Szczegóły</SeasonBtn>
              <SeasonBtn data-id={season.seasonId} onClick={handleDeleteClick}>Usuń</SeasonBtn>
      
              {isDeleteConfirmationVisible && <Popup handleConfirmation={handleDeleteConfirmation} header={deleteHeader} title={season.name} isConfirmationVisible={isDeleteConfirmationVisible}/>}
            </Season>
      
    })
  }

  return (
    <Container style={currentComponent === 0 ? displayFlex : displayNone}>
      {seasons && 
        <SeasonsContainer>
          {renderSeasons()}
        </SeasonsContainer>
      }
      <AddSeasonBtn onClick={showAddSeasonPanel}>Dodaj nowy sezon</AddSeasonBtn>
      <AddSeasonPanel isVisible={addSeasonVisibility} onClose={hideAddSeasonPanel} fetchSeasons={fetchSeasons} fetchTournaments={fetchTournaments}/>
    </Container>
  )
}

export default SeasonsPanel
