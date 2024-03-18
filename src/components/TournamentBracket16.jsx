import React from 'react'
import styled from 'styled-components'

//#region STYLES

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
overflow-x: auto;
margin: 0 auto;
padding-bottom: 50px;
`

const Header = styled.div`
color: #f5f5f5;
font-size: 20px;
font-weight: bold;
letter-spacing: .5px;
padding: 15px 0;
`

const Bracket = styled.div`
position: relative;
display: flex;
align-items: stretch;
justify-content: center;
color: #f5f5f5;
white-space: nowrap;
`

const Round = styled.div`
display: block;
display: flex;
flex-direction: column;
justify-content: space-around;
margin-right: 20px;
`

const Match = styled.div`
position: relative;
display: flex;
flex-direction: column;
align-items: center;
width: 120px;
font-size: 14px;
border: 1px solid #f5f5f5;
margin-bottom: 10px;
border-radius: 10px;
z-index: 2;
background-color: #363062;
/* padding: 5px; */

&::before{
  content: '';
  position: absolute;
  border: 1px solid white;
}

&::after{
  content: '';
  position: absolute;
  border: 1px solid white;
}

${({ variant }) => {
  switch (variant) {
    case 'blank':
      return `
        &::before{
          display: none;
        }

        &::after{
          display: none;
        }
      `;
    case 'variantPA1':
      return `
        &::before{
          top: 50%;
          right: -21px;
          width: 20px;
        }

        &::after{
          display: none;
        }
      `;
    case 'variantPB1':
      return `
        &::before{
          top: 50%;
          right: -11px;
          width: 10px;
        }

        &::after{
          right: -11px;
          top: 19px;
          height: 130%;
        }
      `;
    case 'variantPB2':
      return `
        &::before{
          top: 50%;
          right: -11px;
          width: 10px;
        }

        &::after{
          right: -19%;
          top: -7px;
          width: 10%;
        }
      `;
      case 'variantPC1' :
        return `
          &::before{
            top: 50%;
            right: -11px;
            width: 10px;
          }

          &::after{
            right: -11px;
            top: 19px;
            height: 265%;
          }
        `;
      case 'variantPC2' :
        return `
          &::before{
            top: 50%;
            right: -11px;
            width: 10px;
          }

          &::after{
            right: -19%;
            top: -85%;
            width: 10%;
          }
        `;
      case 'variantPD1' :
        return `
          &::before{
            top: 50%;
            right: -11px;
            width: 10px;
          }

          &::after{
            right: -11px;
            top: 19px;
            height: 530%;
          }
        `;
      case 'variantPD2' :
        return `
          &::before{
            top: 50%;
            right: -11px;
            width: 10px;
          }

          &::after{
            right: -19%;
            top: -222%;
            width: 10%;
          }
        `
      case 'variantPE1' :
        return `
          &::before{
            top: 50%;
            right: -11px;
            width: 10px;
          }

          &::after{
            right: -11px;
            top: 19px;
            height: 1070%;
          }
        `;
      case 'variantPE2':
        return `
          &::before{
            top: 50%;
            right: -11px;
            width: 10px;
          }

          &::after{
            right: -19%;
            top: -485%;
            width: 10%;
          }
        `;
    default:
      return '';
  }
}}


`;

const Player = styled.div`

font-weight: ${props => (props.winner === "1" ? 'bold' : 'normal')};

color: ${props => (props.show === "1" ? '#f5f5f5' : 'transparent')};
`



//#endregion


const TournamentBracket16 = ({ tournament }) => {

  const renderMatch = (markup, variant) => {

    const match = tournament.matches.filter(match => match.markup === markup)[0];

    console.log(match);

    return (
      <Match variant={variant}>
        <Player show={match.playerA ? "1" : "0"} 
        winner={match.winner && match.winner.name === match.playerA.name ? "1" : "0"}>
          {match.playerA ? match.playerA.name : "Nieznany"}
        </Player>
        <Player show={match.playerB ? "1" : "0"}
        winner={match.winner && match.winner.name === match.playerB.name ? "1" : "0"}>
          {match.playerB ? match.playerB.name : "Nieznany"}
        </Player>
      </Match>
    )
  }

  return (
    <Container>    
        <Header Header>Drabinka prawa</Header>
      <Bracket>
        <Round>
          {renderMatch("PA1", "variantPB1")}
          {renderMatch("PA2", "variantPB2")}
          {renderMatch("PA3", "variantPB1")}
          {renderMatch("PA4", "variantPB2")}
          {renderMatch("PA5", "variantPB1")}
          {renderMatch("PA6", "variantPB2")}
          {renderMatch("PA7", "variantPB1")}
          {renderMatch("PA8", "variantPB2")}
          {renderMatch("PA9", "variantPB1")}
          {renderMatch("PA10", "variantPB2")}
          {renderMatch("PA11", "variantPB1")}
          {renderMatch("PA12", "variantPB2")}
          {renderMatch("PA13", "variantPB1")}
          {renderMatch("PA14", "variantPB2")}
          {renderMatch("PA15", "variantPB1")}
          {renderMatch("PA16", "variantPB2")}          
        </Round>
        <Round>
          {renderMatch("PB1", "variantPC1")}
          {renderMatch("PB2", "variantPC2")}
          {renderMatch("PB3", "variantPC1")}
          {renderMatch("PB4", "variantPC2")}
          {renderMatch("PB5", "variantPC1")}
          {renderMatch("PB6", "variantPC2")}
          {renderMatch("PB7", "variantPC1")}
          {renderMatch("PB8", "variantPC2")}      
        </Round>
        <Round>
          {renderMatch("PC1", "variantPD1")}
          {renderMatch("PC2", "variantPD2")}
          {renderMatch("PC3", "variantPD1")}
          {renderMatch("PC4", "variantPD2")}      
        </Round>
        <Round>
          {renderMatch("PD1", "variantPE1")}
          {renderMatch("PD2", "variantPE2")}
        </Round>
        <Round>
          {renderMatch("PE1", "variantPA1")}
        </Round>
        <Round>
          {renderMatch("PF1", "blank")}
        </Round>
        {/* <Round>
          {renderMatch("PG1", "variantPA1")}
        </Round> */}
      </Bracket>
      {<Header>Drabinka lewa</Header>}
      <Bracket>
        <Round>
          {renderMatch("LA1", "variantPA1")}
          {renderMatch("LA2", "variantPA1")}
          {renderMatch("LA3", "variantPA1")}
          {renderMatch("LA4", "variantPA1")}
          {renderMatch("LA5", "variantPA1")}
          {renderMatch("LA6", "variantPA1")}
          {renderMatch("LA7", "variantPA1")}
          {renderMatch("LA8", "variantPA1")}
        </Round>
        <Round>
          {renderMatch("LB1", "variantPB1")}
          {renderMatch("LB2", "variantPB2")}
          {renderMatch("LB3", "variantPB1")}
          {renderMatch("LB4", "variantPB2")}
          {renderMatch("LB5", "variantPB1")}
          {renderMatch("LB6", "variantPB2")}
          {renderMatch("LB7", "variantPB1")}
          {renderMatch("LB8", "variantPB2")}          
        </Round>
        <Round>
          {renderMatch("LC1", "variantPA1")}
          {renderMatch("LC2", "variantPA1")}
          {renderMatch("LC3", "variantPA1")}
          {renderMatch("LC4", "variantPA1")}        
        </Round>
        <Round>
          {renderMatch("LD1", "variantPC1")}
          {renderMatch("LD2", "variantPC2")}
          {renderMatch("LD3", "variantPC1")}
          {renderMatch("LD4", "variantPC2")}
        </Round>
        <Round>
          {renderMatch("LE1", "variantPA1")}
          {renderMatch("LE2", "variantPA1")}
        </Round>
        <Round>
          {renderMatch("LF1", "variantPD1")}
          {renderMatch("LF2", "variantPD2")}
        </Round>
        <Round>
          {renderMatch("LG1", "variantPA1")}
        </Round>
        <Round>
          {renderMatch("LH1", "blank")}
        </Round>
      </Bracket>
    </Container>
  )
}

export default TournamentBracket16
