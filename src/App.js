import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import { Credentials } from './Credentials';
import axios from 'axios';

const App = () => {

  const spotify = Credentials();

  console.log('RENDERING APP.JS');

  const data = [
    {value: 1, name: 'A'},
    {value: 2, name: 'B'},
    {value: 3, name: 'C'}
];

const [token, setToken] = useState('');
const [genres, setGenres] = useState([]);

useEffect(() => {
  axios('https://accounts.spotify.com/api/token', {
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
    },
    data: 'grant_type=client_credentials',
    method: 'POST'
  })
  .then(tokenResponse => {      
    setToken(tokenResponse.data.access_token);

    axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
    })
    .then (genreResponse => {        
      setGenres(genreResponse.data.categories.items)
    });
    
  });

}, []); 

return (
  <form>
    <div className="container">
    <Dropdown options={genres}/>
    <Dropdown options={data}/>
    <button type='submit'>
      Search
    </button>
    </div>
  </form>

);
}

export default App;
