
// import { Input } from 'postcss';
import { useState } from 'react';
import './App.css'
import {useEffect} from 'react';
import { FormControl, InputGroup, Container, Button } from "react-bootstrap";
const clientId=import.meta.env.VITE_CLIENT_ID;
const clientSecret=import.meta.env.VITE_CLIENT_SECRET;

function App() {

  const [searchInput,setSearchInput]=useState('');
  const [accessToken,setAccessToken]=useState('');
  const [error, setError] = useState('');
  const [albums,setAlbums]=useState([]);

  //  POST request to the Spotify API to obtain an access token using client credentials authentication.
// Set the access token in the component's state
  useEffect(()=>{
    const fetchAccessToken=async()=>{
      const authParams = {
        method: 'POST',
        /*  This header indicates to the server that the data being sent in the request body is formatted as URL-encoded key-value pairs, which is a common format
      for submitting form data over HTTP. This is necessary for the Spotify API to correctly
      interpret and process the data being sent in the request body during the authentication
      process. */
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        /* The `body` property in the `authParams` object is specifying the data that will be sent in the
     request body when making a POST request to the Spotify API endpoint for token authentication. */
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
      };
    
      try {
        const response = await fetch('https://accounts.spotify.com/api/token', authParams);
        if (!response.ok) {
          throw new Error(`Failed to get access token: ${response.statusText}`);
        }
        const data = await response.json();
        setAccessToken(data.access_token);
        // console.log('Access Token:', data.access_token); // Log Access Token
      } catch (error) {
        setError(error.message);
        console.error('Error fetching access token:', error);
      }
    };

    fetchAccessToken();

    

    },[]);

    const search = async () => {
      if (!accessToken) {
        setError('Access token is not available.');
        return;
      }

      const artistParams = {
        method: 'GET',
        /*. By including this access token in the Authorization header with the prefix "Bearer ", the request is being authorized
to access protected resources on the Spotify API server on behalf of the authenticated user or
client. This is a common practice in API authentication where the access token is sent in the
Authorization header to validate and authorize the request. */
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };

      try{
        // Get Artist Id
        const artistResponse = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, artistParams);
        if (!artistResponse.ok) {
          throw new Error(`Search request failed: ${artistResponse.statusText}`);
        }
        const artistData = await artistResponse.json();
        console.log('Artist Data:', artistData); // Log artist data response
        const artistID = artistData.artists.items[0]?.id;
        // console.log("Artist ID: "+artistID);
        if (!artistID) {
          throw new Error('No artist found.');
        }
        // Get Artist Albums
  const albumsResponse = await fetch(
    `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`,
    artistParams
  );
  if (!albumsResponse.ok) {
    throw new Error(`Albums request failed: ${albumsResponse.statusText}`);
  }
  const albumsData = await albumsResponse.json();
  setAlbums(albumsData.items);

  console.log('Search Input:', searchInput);
  console.log('Artist ID:', artistID);
  console.log('Albums:', albumsData.items); // Log albums response

      
    } catch (error) {
      setError(error.message);
      console.error('Error during search:', error);
    }

  
  // console.log("Search Input: "+searchInput);


  };

  return (
   <>
{/* The `<Container>` component in this code snippet is a part of the React Bootstrap library. It is
used to wrap a set of React Bootstrap components within a container element. The container helps to
center and align the content within a specified width, providing a responsive layout for the
components inside it.  */}
    <Container>
{/* The `<InputGroup>` component in this code snippet is a part of the React Bootstrap library. It is
used to group together form controls and buttons in a single horizontal row. In this specific
context, the `<InputGroup>` component is being used to wrap the `<FormControl>` input field and the
`<Button>` element, creating a visually cohesive and functional search bar interface for the user. */}
      <InputGroup>
        <FormControl
        placeholder="Search For Artist"
        type="input"
        aria-label="Search for an Artist"
        onKeyDown={(event)=>{
          if(event.key==="Enter"){
            search();
          }
        }} // search function
        onChange={(event)=>setSearchInput(event.target.value)} // setSearch
        style={{
          width: "300px",
          height: "35px",
          borderWidth: "0px",
          borderStyle: "solid",
          borderRadius: "5px",
          marginRight: "10px",
          paddingLeft: "10px",
        }}
      />

       <Button onClick={search}>Search</Button>
      </InputGroup>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Container>
    </>
  )
}

export default App
