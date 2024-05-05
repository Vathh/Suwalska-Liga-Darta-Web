import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react'
import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { AUTHENTICATE_API_URL } from '../helpers/apiConfig';
import styled from 'styled-components';

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

  const ErrorMsg = styled.p`
    color: #c5c5c5;
    margin-bottom: 10px;
  `

  const Header = styled.h1`
    color: #c5c5c5;
  `

  const Form = styled.form`
    display: flex;
    flex-direction: column;   
    align-items: center;
    justify-content: center;
    padding-top: 20px;
  `

  const Label = styled.label`
    padding-bottom: 15px;
    font-size: 18px;
    color: #c5c5c5;
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
    
    :first-of-type{
      margin-bottom: 20px;
    }
  `

  const Button = styled.button`
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

//#endregion

const Login = () => {

  const { setAuth } = useAuth();
  const userRef = useRef();
  const errorRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userDTO = {
        userName: userName,
        password: password
      }

      const response = await fetch(AUTHENTICATE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        body: JSON.stringify(userDTO)
      });
      let data = await response.json();
      
      const accessToken = data?.accessToken;
      const role = data?.role;

      setAuth({ userName, role, accessToken });
      setUserName('');
      setPassword('');    
      navigate(from, { replace: true });
    } catch (err) {
      if(!err?.response){
        setErrorMsg('Nazwa użytkownika lub hasło jest nieprawidłowe');
      } else if(err.response?.status === 400){
        setErrorMsg('Missing Username or Password');
      } else if(err.response?.status === 401){
        setErrorMsg('Unauthorized');
      } else {
        setErrorMsg('Login Failed');
      }
      errorRef.current.focus();
    }

  }

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrorMsg('');
  }, [userName, password]);

  return (
    <Container>
      <ErrorMsg ref={errorRef} aria-live='assertive'>{errorMsg}</ErrorMsg>
      <Header>Zaloguj się</Header>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor='userName'>Nazwa użytkownika:</Label>
        <Input
          type='text'
          id='userName'
          ref={userRef}
          autoComplete='off'
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          required
        />

        <Label htmlFor='password'>Hasło:</Label>
        <Input
          type='password'
          id='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <Button>Zaloguj</Button>
      </Form>
    </Container>
  )
}

export default Login
