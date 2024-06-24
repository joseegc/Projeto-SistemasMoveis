import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import Estilos from '../Estilos/styles'; // Importa a folha de estilos

export default function Pokedex({ route }) {
  // Extrai os dados `pokedex` dos parâmetros da rota
  const { pokedex } = route.params;

  // Verifica se a Pokedex está vazia
  return (
    <View style={Estilos.containerPokedex}>
      {pokedex.length === 0 ? (
        <Text style={{ marginTop: 50, textAlign: 'center' }}>
          Você ainda não capturou nenhum Pokémon.
        </Text>
      ) : (
        <FlatList
          data={pokedex} // Passa os dados do pokedex como fonte de dados da lista
          keyExtractor={(item) => item.name} // Extrator de chave único para cada item
          numColumns={2} // Renderiza itens em 3 colunas
          renderItem={({ item }) => ( 
            <View style={styles.card}>
              <Image 
                style={styles.image}
                source={{ uri: item.image }} // Fonte da imagem do URL da imagem do item
              />
              <Text style={styles.name}>{item.name}</Text>
              {item.height !== 'nan' && (
                <Text>Altura: {item.height / 10} m</Text>
              )}
              {item.weight !== 'nan' && (
                <Text>Peso: {item.weight / 10} kg</Text>
              )}
              {item.types && item.types.length > 0 && (
                <>
                  <Text style={styles.header}>Tipo:</Text>
                  <View style={styles.typesContainer}>
                    {item.types.map((type, index) => (
                      <Text key={index} style={styles.type}>
                        {type.type.name}
                      </Text>
                    ))}
                  </View>
                </>
              )}
              {item.abilities && item.abilities.length > 0 && (
                <>
                  <Text style={styles.header}>Habilidades:</Text>
                  <View>
                    {item.abilities.map((ability, index) => (
                      <Text key={index} style={styles.ability}>
                        {ability.ability.name}
                      </Text>
                    ))}
                  </View>
                </>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  type: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 3,
  },
  ability: {
    marginTop: 3,
  },
});
