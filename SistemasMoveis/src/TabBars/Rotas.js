import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Home from './Home';
import Perfil from './Perfil';
import Pokedex from './Pokedex';
import Pokemons from './Pokemons';

const Tab = createBottomTabNavigator();

export default function Routes() {
  const [pokedex, setPokedex] = useState([]);

  return (
      <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen
          name="Home"
          initialParams={{ pokedex, setPokedex}}
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Pokémons"
          initialParams={{ pokedex, setPokedex }}
          component={Pokemons}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Pokédex"
          initialParams={{ pokedex, setPokedex }}
          component={Pokedex}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={Perfil}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
  );
}

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#b0463a',
        height: 70,
        color: 'white',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        bottom: 0,
        position: 'absolute',
        left: 0,
        right: 0,
      }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (route.name === 'Pokémons') {
              navigation.navigate('Pokémons');
            } else {
              navigation.navigate(route.name);
            }
          }
        };

        let iconName;
        if (route.name === 'Home') {
          iconName = isFocused
            ? require('../Imagens/pokemonCenterRender.png')
            : require('../Imagens/pokemonCenterRender.png');
        } else if (route.name === 'Pokémons') {
          iconName = isFocused
            ? require('../Imagens/pokeballRender.png')
            : require('../Imagens/pokeballRender.png');
        } else if (route.name === 'Pokédex') {
          iconName = isFocused
            ? require('../Imagens/pokedexRender.png')
            : require('../Imagens/pokedexRender.png');
        } else if (route.name === 'Perfil') {
          iconName = isFocused
            ? require('../Imagens/trainerRender.png')
            : require('../Imagens/trainerRender.png');
        }

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={iconName} style={{ width: 40, height: 40 }} />
            <Text style={{ color: isFocused ? 'white' : 'black', fontFamily: 'PressStart2P_400Regular', fontSize: 9}}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
