import './App.css';
import getGoogleUrl from './utils/getGoogleUrl';
import { ChakraProvider } from '@chakra-ui/react'
import { Button } from "@chakra-ui/react";
import axios from "axios";
function App() {
  const handleLoginGoogle = (e) => {
    e.preventDefault();
    const url = getGoogleUrl();
    window.location.replace(url);
  }
  const { REACT_APP_BACKEND_URI } = process.env;
  const handlerequest = async () => {
    const data = await axios.get(
      `${REACT_APP_BACKEND_URI}/getAllUrls`
    );
    console.log(data);
  }
  return (
    <div className="App">
      <ChakraProvider>
        <Button
          m={'1% 0'}
          variant={'solid'}
          color={'white'}
          bg={'blue'}
          colorScheme={'blue'}
          type={'button'}
          onClick={handleLoginGoogle}
        >
          Login With Google
        </Button>
        {/* <ChakraProvider> */}
        <Button
          m={'1% 0'}
          variant={'solid'}
          color={'white'}
          bg={'blue'}
          colorScheme={'blue'}
          type={'button'}
          onClick={handlerequest}
        >
          GetDetails
        </Button>

      </ChakraProvider>
    </div>
  );
}

export default App;
