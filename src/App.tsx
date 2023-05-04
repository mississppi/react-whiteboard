import React from 'react';
import Card from './Card';
import { ChakraProvider } from '@chakra-ui/react'
import './App.css';

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
