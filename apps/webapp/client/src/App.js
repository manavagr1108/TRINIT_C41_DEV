import './App.css';
import getGoogleUrl from './utils/getGoogleUrl';
import { ChakraProvider } from '@chakra-ui/react'
import { Button } from "@chakra-ui/react";
import axios from "axios";
import Charts from './comps/Charts/Charts';
import { useState } from 'react';

function App() {
  const [usageData, setUsageData] = useState( [] );

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
    setUsageData( data.data.data );
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

        <Charts data={usageData} />
      </ChakraProvider>
    </div>
  );
}

export default App;
