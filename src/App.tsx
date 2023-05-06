import React from 'react';
import Card from './Card';
import { ChakraProvider } from '@chakra-ui/react'
import './App.css';
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Card />
      </div>
    </ChakraProvider>
  );
}

export default App;
