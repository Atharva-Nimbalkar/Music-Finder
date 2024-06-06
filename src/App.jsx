
// import { Input } from 'postcss';
import './App.css'
import { FormControl, InputGroup, Container, Button } from "react-bootstrap";
// const clientId=import.meta.env.VITE_ClIENT_ID;
// const clientSecret=import.meta.env.VITE_CLINET_SECRET;

function App() {
  

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
        // onKeyDown={} // search function
        // onChange={} // setSearch
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

       <Button onClick={{}}>Search</Button>
      </InputGroup>
    </Container>
    </>
  )
}

export default App
