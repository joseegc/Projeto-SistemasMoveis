import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cadastro from "./src/TabBars/Cadastro";
import TelaPrincipal from "./src/TabBars/TelaPrincipal";
import LoginLogin from "./src/TabBars/LoginLogin";
import Perfil from "./src/TabBars/Perfil";
import Estilos from './src/Estilos/styles';

import {
  View
} from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    
    <View style={Estilos.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginLogin" component={LoginLogin} options={{ headerShown: false }} />
          <Stack.Screen name='Cadastro' component={Cadastro} options={{ headerShown: false }} />
          <Stack.Screen name='TelaPrincipal' component={TelaPrincipal} options={{ headerShown: false }} /> 
          <Stack.Screen name='Perfil' component={Perfil} options={{ headerShown: false }} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
