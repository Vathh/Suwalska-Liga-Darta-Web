import React from 'react'
import styled from 'styled-components'

//#region STYLES

const Container = styled.div`
  position: relative;
  min-width: 800px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 0 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Table = styled.table`
  border: 1px solid white;
  border-collapse: collapse;
  min-width: 500px;
  color: #fff;
`

const TBody = styled.tbody`
    
`

const Thead = styled.thead`
  
`

const HeaderTr = styled.tr`
  
`

const HeaderTh = styled.th`
  border: 1px solid white;
  position: relative;
  padding: 10px 0;
`

const PlayerRow = styled.tr`
`

const PlayerTd = styled.td`
  border: 1px solid white;
  padding: 3px 0;
  text-align: center;
  color: #f5f5f5;
`

//#endregion

const TournamentDetailsTable = ({ tournament }) => {

  const renderPlayerRows = () => {
    return tournament.results.sort((a, b) => b.pointsEarned - a.pointsEarned).map(result => {
      const max = tournament.achievements.filter(achievement => achievement.playerName === result.playerName && achievement.type === "MAX");
      const oneSeventy = tournament.achievements.filter(achievement => achievement.playerName === result.playerName && achievement.type === "170PLUS");
      const qf = tournament.achievements.filter(achievement => achievement.playerName === result.playerName && achievement.type === "QF");
      const hf = tournament.achievements.filter(achievement => achievement.playerName === result.playerName && achievement.type === "HF");

      const renderQFs = () => {
        return qf.map(qf => {
          return <p key={qf.achievementId}>{qf.value}</p>
        });
      };

      const renderHFs = () => {
        return hf.map(hf => {
          return <p key={hf.achievementId}>{hf.value}</p>
        });
      };
      return <PlayerRow key={result.playerName}>
              <PlayerTd>{result.playerName}</PlayerTd>
              <PlayerTd>{result.pointsEarned}</PlayerTd>
              <PlayerTd>{max.length}</PlayerTd>
              <PlayerTd>{oneSeventy.length}</PlayerTd>
              <PlayerTd>
                {renderHFs()}
              </PlayerTd>
              <PlayerTd>
                {renderQFs()}
              </PlayerTd>
             </PlayerRow>
    });
  }

  return (
    <Container>
      <Table>
        <Thead>
          <HeaderTr>
            <HeaderTh>Zawodnik</HeaderTh>
            <HeaderTh>Punkty</HeaderTh>
            <HeaderTh>MAX</HeaderTh>
            <HeaderTh>170+</HeaderTh>
            <HeaderTh>HF</HeaderTh>
            <HeaderTh>QF</HeaderTh>
          </HeaderTr>
        </Thead>
        <TBody>
          {tournament && renderPlayerRows()}
        </TBody>
      </Table>
    </Container>
  )
}

export default TournamentDetailsTable
