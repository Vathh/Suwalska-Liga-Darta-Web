import React, { useState } from 'react'
import styled from 'styled-components'
import useAuth from '../hooks/useAuth'
import { TOURNAMENT_DETAILS_API_URL } from '../helpers/apiConfig'
import Popup from './Popup'

//#region STYLES

const Tournament = styled.div`
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

const TournamentHeader = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #F5F5F5;
  margin-bottom: 20px;
`

const TournamentBtn = styled.button`
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

//#endregion

const ActiveTournamentTile = ({ tournamentId, dateString, fetchTournaments }) => {

  const { auth } = useAuth();

  const [isCancelConfirmationVisible, setIsCancelConfirmationVisible] = useState(false);

  const handleCancelClick = () => {
    setIsCancelConfirmationVisible(true);
  }

  const cancelTournament = async () => {
    try{
      const response = await fetch(TOURNAMENT_DETAILS_API_URL + tournamentId, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${auth?.accessToken}`
        }
      });

      if(response.ok){
        console.log(`Anulowano turniej o id: ${tournamentId}`);
        fetchTournaments();
      }else {
        console.error('Blad podczas anulowania turnieju', response.statusText);
      }
    } catch (error) {
      console.error('Blad podczas strzalu do API', error);
    }
  }

  const handleCancelConfirmation = (confirmed) => {
    if(confirmed){
      cancelTournament();
    }

    setIsCancelConfirmationVisible(false);
  }

  const cancelHeader = "Czy na pewno chcesz anulować ten turniej?";

  return (
    <Tournament>
      <TournamentHeader>{dateString}</TournamentHeader>
      <TournamentBtn onClick={handleCancelClick}>Anuluj</TournamentBtn>

      {isCancelConfirmationVisible && <Popup handleConfirmation={handleCancelConfirmation} header={cancelHeader} title={dateString} isConfirmationVisible={isCancelConfirmationVisible}/>}
    </Tournament>
  )
}

export default ActiveTournamentTile
