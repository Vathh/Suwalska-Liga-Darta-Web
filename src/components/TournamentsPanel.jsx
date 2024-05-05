import React, { useState } from 'react'
import styled from 'styled-components'
import OpenTournamentTile from './OpenTournamentTile'
import ClosedTournamentTile from './ClosedTournamentTile'
import ActiveTournamentTile from './ActiveTournamentTile'

//#region STYLES

const Container = styled.div`
  padding: 30px 0;
  width: 80%;
  flex-direction: column;
  align-items: center;
`

const Subcontainer = styled.div`
  margin-bottom: 30px;
`

const TournamentsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const TournamentsContainerHeader = styled.p`
  font-size: 18px;
  color: #f5f5f5;
  margin-bottom: 20px;
  text-align: center;
`

const displayFlex = {
  display: 'flex'
}

const displayNone = {
  display: 'none'
}

const SeasonSelect = styled.select`
  
`

const SeasonOption = styled.option`
  
`

//#endregion

const TournamentsPanel = ({ currentComponent, openTournaments, closedTournaments, activeTournament, fetchTournaments }) => {
  
  const [chosenSeason, setChosenSeason] = useState("");
  
  const renderOpenTournaments = () => {
    return openTournaments.map(tournament => {
      var date = new Date(tournament.date);
      var year = date.getFullYear();
      var month = ("0" + (date.getMonth() + 1)).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);
      var dateString = `${year}-${month}-${day}`;
      return <OpenTournamentTile key={tournament.tournamentId} tournamentId={tournament.tournamentId} dateString={dateString} fetchTournaments={fetchTournaments}/>
    });
  }

  const renderClosedTournaments = () => {
    return closedTournaments.filter(tournament => tournament.seasonName === chosenSeason).map(tournament => {
      var date = new Date(tournament.date);
      var year = date.getFullYear();
      var month = ("0" + (date.getMonth() + 1)).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);
      var dateString = `${year}-${month}-${day}`;
      return <ClosedTournamentTile key={tournament.tournamentId} dateString={dateString}/>
    });
  }

  const renderActiveTournament = () => {
    return activeTournament.map(tournament => {
      var date = new Date(tournament.date);
      var year = date.getFullYear();
      var month = ("0" + (date.getMonth() + 1)).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);
      var dateString = `${year}-${month}-${day}`;
      return <ActiveTournamentTile key={tournament.tournamentId} tournamentId={tournament.tournamentId} dateString={dateString} fetchTournaments={fetchTournaments}/>
    })
  }

  const seasonNamesSet = new Set(closedTournaments.map(tournament => tournament.seasonName));
  
  const seasonNames = [...seasonNamesSet];

  if(seasonNames.length > 0 && chosenSeason === ""){
    setChosenSeason(seasonNames[0]);
  }

  const renderSeasonOptions = () => {
    return seasonNames.map(name => {
      return <SeasonOption key={name} value={name}>{name}</SeasonOption>
    });
  }
  
  return (
    <Container style={currentComponent === 1 ? displayFlex : displayNone}>

      {activeTournament.length > 0 && 
        <Subcontainer>
          <TournamentsContainerHeader>Aktywny turniej</TournamentsContainerHeader>
          <TournamentsContainer>
            {renderActiveTournament()}
          </TournamentsContainer>
        </Subcontainer>
      }

      {openTournaments && 
        <Subcontainer>
          <TournamentsContainerHeader>Turnieje do rozegrania</TournamentsContainerHeader>
          <TournamentsContainer>
            {renderOpenTournaments()}
          </TournamentsContainer>
        </Subcontainer>
      }

      {closedTournaments && 
        <Subcontainer>
          <TournamentsContainerHeader>Turnieje zakończone
            <SeasonSelect 
              onChange={(e) => setChosenSeason(e.target.value)}>
              {renderSeasonOptions()}
            </SeasonSelect>
          </TournamentsContainerHeader>
          <TournamentsContainer>
            {renderClosedTournaments()}
          </TournamentsContainer>
        </Subcontainer>
      }
    </Container>
  )
}

export default TournamentsPanel
