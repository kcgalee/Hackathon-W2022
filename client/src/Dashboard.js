import React, { useState, useEffect } from "react"
import useAuth from "./useAuth"
import { Container, Form } from "react-bootstrap"

export default function Dashboard({ code }) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    // const [searchResults, setSearchResults] = useState([])
    // const [playingTrack, setPlayingTrack] = useState()
    // const [lyrics, setLyrics] = useState("")
  
    // function chooseTrack(track) {
    //   setPlayingTrack(track)
    //   setSearch("")
    //   setLyrics("")
    // }
  
    // useEffect(() => {
    //   if (!playingTrack) return
  
    //   axios
    //     .get("http://localhost:3001/lyrics", {
    //       params: {
    //         track: playingTrack.title,
    //         artist: playingTrack.artist,
    //       },
    //     })
    //     .then(res => {
    //       setLyrics(res.data.lyrics)
    //     })
    // }, [playingTrack])
  
    // useEffect(() => {
    //   if (!accessToken) return
    //   spotifyApi.setAccessToken(accessToken)
    // }, [accessToken])
  
    // useEffect(() => {
    //   if (!search) return setSearchResults([])
    //   if (!accessToken) return
  
    //   let cancel = false
    //   spotifyApi.searchTracks(search).then(res => {
    //     if (cancel) return
    //     setSearchResults(
    //       res.body.tracks.items.map(track => {
    //         const smallestAlbumImage = track.album.images.reduce(
    //           (smallest, image) => {
    //             if (image.height < smallest.height) return image
    //             return smallest
    //           },
    //           track.album.images[0]
    //         )
  
    //         return {
    //           artist: track.artists[0].name,
    //           title: track.name,
    //           uri: track.uri,
    //           albumUrl: smallestAlbumImage.url,
    //         }
    //       })
    //     )
    //   })
  
    //   return () => (cancel = true)
    // }, [search, accessToken])
  
    return (
      <Container>
        <Form.Control
          type="search"
          placeholder="Search Songs/Artists"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        
      </Container>
    )
  }