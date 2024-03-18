import React, { useReducer } from 'react'
import styled from 'styled-components'
import { initialPostPlayerState, resetInputs, setName } from '../helpers/requestReducers/player/playerActions'
import { postPlayerReducer } from '../helpers/requestReducers/player/playerReducers'
import { PLAYERS_API_URL } from '../helpers/apiConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

//#region STYLES

const Wrapper = styled.div`
  position:fixed;
  top: 0;
  left: 0;
  z-index:999;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,.75);
`

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #363062;
  border: 2px solid rgba(255,255,255,.3);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0,0,0,.3);
  color: #fff;
  border-radius: 10px;
  padding-top: 50px;
`

const AddSeasonForm = styled.form`
  display: flex;
  flex-direction: column;   
  align-items: center;
  justify-content: center;
  padding: 10px 20px; 
`

const Label = styled.label`
  padding-bottom: 15px;
`

const Input = styled.input`
  margin-left: 10px;
  border-radius: 5px;
  padding: 10px 25px 10px 10px;
  background: transparent;
  border: 2px solid rgba(255,255,255,.3);
  outline: none;
  font-size: 16px;
  color: #fff;
  color-scheme: dark;
`

const SubmitInput = styled.input`
  margin-top: 20px;
  padding: 5px 10px;
  border-radius: 5px;
  background: transparent;
  border: 2px solid rgba(255,255,255,.3);
  outline: none;
  color: #fff;
  font-size: 17px;
  cursor: pointer;
  transition: color .3s, background-color .3s;

  &:hover{
    color: #363062;
    background-color: rgba(245, 245, 245, 0.8);
  }
`

const CancelBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 6px;
  border-radius: 6px;
  border: 1px solid transparent;
  transition: color .3s, background-color .3s, border .3s;

  &:hover{
    color: rgba(245, 245, 245, 0.8);
    background-color: #363062;
    border: 1px solid rgba(245, 245, 245, 0.8);
  }
`

const iconStyles = {
  marginRight: '5px'
}

//#endregion

const AddPlayerPanel = ({ isVisible, onClose, fetchPlayers }) => {

  const panelStyle = {
    display: isVisible ? 'block' : 'none'
  };

  const [state, dispatch] = useReducer(postPlayerReducer, initialPostPlayerState);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    switch(name) {
      case 'name':
        dispatch(setName(value));
        break;
      default:
        break;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const playerDTO = {
        name: state.name
      };

      const response = await fetch(PLAYERS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(playerDTO)
      });

      if(response.ok){
        console.log('Dodano nowego gracza');
        onClose();
        fetchPlayers();
        resetData();
      }else {
        console.error('Blad podczas dodawania gracza', response.statusText);
      }
    } catch (error) {
      console.error('Blad podczas strzalu do API', error);
    }
  }

  const resetData = () => {
    dispatch(resetInputs());
  }

  const handleCloseBtn = () => {
    resetData();
    onClose();
  }


  return (
    <Wrapper style={panelStyle}>
      <Container>
        <AddSeasonForm>
              <Label>
                Imię gracza:            
                <Input 
                  type='text' 
                  name='name'
                  value={state.name}
                  onChange={handleInputChange}
                  required
                />
              </Label>


              <SubmitInput type='submit' value='Dodaj gracza' onClick={handleSubmit}/>
              </AddSeasonForm>
              <CancelBtn onClick={handleCloseBtn}><FontAwesomeIcon icon={faX} size="sm" style={iconStyles}/>Anuluj</CancelBtn>
              
      </Container>
    </Wrapper>
  )
}

export default AddPlayerPanel
