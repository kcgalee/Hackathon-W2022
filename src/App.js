import './App.css';
import React, { useEffect, useState} from 'react';
import Dashboard from "./Dashboard";
import axios from 'axios';
import { Button } from './Button';
import { Container, Form } from 'react-bootstrap';
import io from 'socket.io-client'
import Space from './Space';
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

let socket; 
const CONNECTION_PORT = 'localhost:3000/'

function App(){
  const CLIENT_ID = "814c4cd6f699496faf7fb59dac61f66a"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([])
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  

  useEffect( ()=> {
    socket = io(CONNECTION_PORT)
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if(!token && hash){
      token = hash.substring(1).split("&").find(elem=> elem.startsWith("access_token")).split("=")[1]

      window.location.hash=""
      window.localStorage.setItem("token",token)
    }
    setToken(token)
  }, [])

  const connectToRoom = () => {
    socket.emit('join_room', room)
  }

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  const searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "artist"
      }
    })
    setArtists(data.artists.items)
  }

  const renderArtists=()=> {
    return artists.map(artist=> (
      <Button onClick={connectToRoom}>
        <div key={artist.id}>
        {artist.images.length ? <img width ={"10%"} src = {artist.images[0].url} alt="img" /> : <div>No image</div>}
        <div style={{margin: 10}}>{artist.name}</div>
       
      </div>
      </Button>
      
    ))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>MUSE</h1>
        
        
        {!token ?
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
        : <button onClick={logout}>Logout</button>}

        {token ?
          <form className="d-flex flex-column py-2" style={{height: "10vh"}} onSubmit={searchArtists}>
           <TextInput type="text" style={styles.input} placeholder="Name" onChange={(e) => {
              setUserName(e.target.value);
            }}/> 
            <TextInput type="text" style={styles.input} placeholder="Search" onChange={e => setSearchKey(e.target.value)}/>
            <button type={"submit"}>Search</button>
          </form>
          : <h2>Please login</h2>
        }

        {renderArtists()}

      </header>
     
    </div>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    color: 'white',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'white'
  },
});
export default App;

