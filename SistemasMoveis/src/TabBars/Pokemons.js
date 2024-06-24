import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, SafeAreaView, StyleSheet } from 'react-native';
import Estilos from '../Estilos/styles';

export default function Pokemons({ route }) {
  const { pokedex, setPokedex } = route.params;
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    getPokemonList();
  }, []);

  const getPokemonList = () => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(data.results);
      });
  };

  const capturePokemon = (pokemon) => {
    setPokedex([...pokedex, pokemon]);
    setPokemonList((prevList) => prevList.filter((item) => item.name !== pokemon.name));
  };

  const renderItem = ({ item, index }) => {
    if (pokedex.some((capturedPokemon) => capturedPokemon.name === item.name)) {
      // Se o Pokémon já foi capturado, não renderize
      return null;
    }

    return (
      <View>
        <Image
          style={styles.image}
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/')[6]}.png`,
          }}
        />
        <Text style={Estilos.textoLista}> #{index + 1} {item.name.slice(0, 1).toUpperCase() + item.name.slice(1, item.name.length)}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={Estilos.container}>
      <FlatList
        style={Estilos.listaPokemons}
        data={pokemonList}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        numColumns={3}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});
