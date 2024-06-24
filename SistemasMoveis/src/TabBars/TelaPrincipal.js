import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Rotas from './Rotas';

import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';

export default function App() {
  let [fonte] = useFonts({
    PressStart2P_400Regular,
  });

  return (
      <Rotas/> 
  );
}
