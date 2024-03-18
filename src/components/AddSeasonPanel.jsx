import React, { useReducer, useState } from 'react'
import { initialPostSeasonState, resetInputs, setEndDate, setName, setRankCount, setStartDate } from '../helpers/requestReducers/season/seasonActions';
import { eachDayOfInterval, format, isFriday } from 'date-fns';
import { SEASONS_API_URL } from '../helpers/apiConfig';
import { postSeasonReducer } from '../helpers/requestReducers/season/seasonReducers';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

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

const FridaysBtn = styled.button`
  padding: 5px 10px;
  border-radius: 5px;
  background: transparent;
  border: 2px solid rgba(255,255,255,.3);
  outline: none;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: color .3s, background-color .3s;

  &:hover{
    color: #363062;
    background-color: rgba(245, 245, 245, 0.8);
  }
`

const FridaysPanel = styled.div`
  width: 400px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const FridaysHeader = styled.p`
  text-align: center;
  margin-bottom: 10px;
`

const FridaysContainer = styled.div`
  display: flex;    
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

const FridaysLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 5px 0;
  min-width: 140px;
`

const FridaysCheckbox = styled.input`
  margin-right: 5px;
`

const FridaysCount = styled.p`
  margin: 15px 0;
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

const AddSeasonPanel = ({ isVisible, onClose, fetchSeasons, fetchTournaments }) => {
  const panelStyle = {
    display: isVisible ? 'block' : 'none'
  };

  const [state, dispatch] = useReducer(postSeasonReducer, initialPostSeasonState);
  const [fridayDates, setFridayDates] = useState([]);
  const [selectedFridays, setSelectedFridays] = useState([]);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    switch(name) {
      case 'name':
        dispatch(setName(value));
        break;
      case 'startDate':
        dispatch(setStartDate(value));
        break;
      case 'endDate' :
        dispatch(setEndDate(value));
        break;
      case 'rankCount' :
        dispatch(setRankCount(value));
        break;
      default:
        break;
    }
  }

  const handleDateCalculation = (e) => {
    e.preventDefault();
    const start = new Date(state.startDate);
    const end = new Date(state.endDate);
    const daysBetween = eachDayOfInterval({start, end});

    const fridays = daysBetween.filter((day) => isFriday(day));
    setFridayDates(fridays);
  }
  
  const handleCheckboxChange = (date) => {
    const updatedSelectedFridays = [...selectedFridays];
    const index = updatedSelectedFridays.indexOf(date);
    
    if(index === -1){
      updatedSelectedFridays.push(date);
    }else {
      updatedSelectedFridays.splice(index,1);
    }
    
    setSelectedFridays(updatedSelectedFridays);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Wprowadzone dane', {state, selectedFridays});

    try{
      const seasonDTO = {
        name: state.name,
        startDate: state.startDate,
        endDate: state.endDate,
        toDelete: false,
        rankCount: state.rankCount,
        tournamentFridays: selectedFridays
      };

      const response = await fetch(SEASONS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(seasonDTO)
      });

      if(response.ok){
        console.log('Dodano nowy sezon');
        onClose();
        fetchSeasons();
        fetchTournaments();
        resetData();
      }else{
        console.error('Blad podczas dodawania sezonu', response.statusText);
      }
    } catch (error) {
      console.error('Blad podczas strzalu do API', error);
    }
  };

  const resetData = () => {
    dispatch(resetInputs());
    setFridayDates([]);
    setSelectedFridays([]);
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
                Nazwa sezonu:            
                <Input 
                  type='text' 
                  name='name'
                  value={state.name}
                  onChange={handleInputChange}
                  required
                />
              </Label>

              <Label>
                Data rozpoczęcia:            
                <Input 
                  type='date' 
                  name='startDate'
                  value={state.startDate}
                  onChange={handleInputChange}
                  required
                />
              </Label>

              <Label>
                Data zakończenia:            
                <Input 
                  type='date' 
                  name='endDate'
                  value={state.endDate}
                  onChange={handleInputChange}
                  required
                />
              </Label>

              <FridaysBtn onClick={handleDateCalculation}>Wyznacz piątki</FridaysBtn>

              {fridayDates.length > 0 && (
                <FridaysPanel>
                  <FridaysHeader>Wybierz piątki turniejowe:</FridaysHeader>
                  <FridaysContainer>
                    {fridayDates.map((date) => (
                      <FridaysLabel key={date}>
                        <FridaysCheckbox 
                          type="checkbox" 
                          value={format(date, 'yyyy-MM-dd')}
                          checked={selectedFridays.includes(date)}
                          onChange={() => handleCheckboxChange(date)}
                        />
                        {format(date, 'dd.MM.yyyy')}
                      </FridaysLabel>
                    ))}
                  </FridaysContainer>
                  <FridaysCount><i>Łącznie turniejów: </i>{selectedFridays.length}</FridaysCount>
                  <Label>
                    <i>Rankingowych :</i>            
                    <Input 
                      type='number' 
                      name='rankCount'
                      min="1"
                      max={selectedFridays.length}
                      value={state.rankCount}
                      onChange={handleInputChange}
                      required
                    />
                  </Label>
                </FridaysPanel>
              )}


              <SubmitInput type='submit' value='Dodaj sezon' onClick={handleSubmit}/>
              </AddSeasonForm>
              <CancelBtn onClick={handleCloseBtn}><FontAwesomeIcon icon={faX} size="sm" style={iconStyles}/>Anuluj</CancelBtn>
              
      </Container>
    </Wrapper>
  )
}

export default AddSeasonPanel
