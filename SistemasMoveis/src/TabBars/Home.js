import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from 'react-native';
import Estilos from '../Estilos/styles';
import Perfil from './Perfil';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Array de Tentativas Restantes
var vidas = ['❤', '❤', '❤', '❤'];

export default function Home({ route }) {

  // useState: Atual Pokémon Gerado Aleatoriamente
  const [pokemon, setPokemon] = useState({});

  // useState: ID do Atual Pokémon Gerado Aleatoriamente
  const [idPokemon, setIdPokemon] = useState(0);

  // useState: Texto Digitado pelo Usuário em Input
  const [inputName, setInputName] = useState('');

  // useState: Nº de Tentativas Restantes
  const [tentativas, setTentativas] = useState(4);

  // useState: Nº de Pokémons que Adivinhou
  const [acertos, setAcertos] = useState(0);

  // useState: Nº de Pokémons que Não Adivinhou
  const [erros, setErros] = useState(0);

  // useState: Nº da Sequência de Pokémons que Adivinhou Sem Errar
  const [sequencia, setSequencia] = useState(0); 

  // useState: Recorde da Sequência de Pokémons que Adivinhou Sem Errar
  const [recorde, setRecorde] = useState(0);

  // useState: Intensidade em que a Foto do Pokémon está Borrada
  const [blurRadius, setBlurRadius] = useState(0);

  // useState: Cor de Preenchimento da Foto do Pokémon
  const [tintColor, setTintColor] = useState('black');

  // useState: Exibição do Modal Quando Adivinha um Pokémon
  const [modalAcertoVisible, setModalAcertoVisible] = useState(false);

  // useState: Exibição do Modal Quando Não Adivinha um Pokémon
  const [modalErroVisible, setModalErroVisible] = useState(false);

  // useState: Exibição do Modal Quando Não Digita Nada
  const [modalTextoVazioVisible, setModalTextoVazioVisible] = useState(false);

  // useState: Pokémon que o Usuário Adivinhou
  const [capturedPokemon, setCapturedPokemon] = useState(null);

  // useState: AsyncStorage com Pokémons Adivinhados
  const { pokedex, setPokedex } = route.params;


  // useEffect: Gera um Pokémon Aleatório e carrega as estatísticas 
  // mais recentes ao Renderizar a Tela
   useEffect(() => {
    getPokemon();
    carregarStats();
  }, []);

  // useEffect: Salva as estatísticas sempre 
  // que um desses estados forem atualizados
   useEffect(() => {
    salvarStats(acertos, erros, recorde);
  }, [acertos, erros, recorde]);

  // Função para Resgatar um Pokémon da API PokéAPI
  const getPokemon = () => {
    // Redefine condições iniciais do jogo
    vidas = ['❤', '❤', '❤', '❤'];
    setTentativas(4);
    setBlurRadius(0);
    setTintColor('black');

  // useState: Número Aleatório de 0 a 150 para buscar um Pokémon na API
  const randomPokemonNumber = Math.floor(Math.random() * 151);
    // URL de GET da PokéAPI limitado a 151 Pokémons (1ª Geração)
       const url = `https://pokeapi.co/api/v2/pokemon/${randomPokemonNumber + 1}`;
    
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setIdPokemon(randomPokemonNumber);
        setPokemon(data);
      });
  };

  // aqui iremos carregar as estatísticas do jogador na criação do componente
  // através do asyncStorage
  const carregarStats = async () => {
    const acertosSalvos = await AsyncStorage.getItem('acertos');
    const errosSalvos = await AsyncStorage.getItem('erros');
    const sequenciaSalva = await AsyncStorage.getItem('sequencia');

    if (acertosSalvos !== null) setAcertos(parseInt(acertosSalvos));
    if (errosSalvos !== null) setErros(parseInt(errosSalvos));
    if (sequenciaSalva !== null) setRecorde(parseInt(sequenciaSalva));
  }

  // aqui salvaremos as estatísticas no AsyncStorage
  // sempre que forem atualizadas  
  const salvarStats = async (novosAcertos, novosErros, novaSequencia) => {
    await AsyncStorage.setItem('acertos', JSON.stringify(novosAcertos));
      await AsyncStorage.setItem('erros', JSON.stringify(novosErros));
      await AsyncStorage.setItem('sequencia', JSON.stringify(novaSequencia));
  }


   // Tratamento da Tentativa do Usuário de Adivinhar o Pokémon
  const verificarTentativa = () => {
    const pokemonName = pokemon.name.toLowerCase().replace(' ', '');
    const inputNameFormatted = inputName.toLowerCase().replace(' ', '');

    if (inputNameFormatted === pokemonName) {
      // Se verdadeiro, adivinhou o Pokémon
      setAcertos(acertos + 1); 
      setSequencia(sequencia + 1);

      // Registra no AsyncStorage o Pokémon adivinhado
      const newPokemon = {
        ...pokemon,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          idPokemon + 1
        }.png`,
      }; 
      setCapturedPokemon(newPokemon);
      setPokedex([...pokedex, newPokemon]);
      AsyncStorage.setItem('pokedex', JSON.stringify([...pokedex, newPokemon]));

      
      // Exibe Modal de Acerto
      setModalAcertoVisible(true);
      setInputName('');
    } else {
      // Se Errou o nome, segue para a próxima tentativa
      proximaTentativa();
    }
  };

  const proximaTentativa = () => {
    // Perde 1 tentativa
    setTentativas(tentativas - 1);
    vidas.splice(vidas.length - tentativas, 1);

    // Ao errar da primeira vez, tira a "sombra" preta e borra o Pokémon
    if (tentativas == 4) {
      setBlurRadius(6);
      setTintColor();
    } else if (tentativas == 1) {
      // Se perde todas as tentativas, exibe Modal de que não adivinhou, zera a sequência e aumenta a variável de Erros
      setModalErroVisible(true);
      if (sequencia > recorde) {
        setRecorde(sequencia);
      }

      setSequencia(0);
      setErros(erros + 1);


    } else {
      // Enquanto possui tentativas, diminuir o borrão da foto em 3
      setBlurRadius(blurRadius - 3);
    }
  };

  // Um novo Pokémon só será gerado após fechar o Modal
  const fecharModalErro = () => {
    setModalErroVisible(false);
    setInputName('');
    getPokemon();
  };

  const fecharModalAcerto = () => {
    setModalAcertoVisible(false);
    getPokemon();
  };

  // Componentes da Tela
  return (
    <View style={Estilos.container}>
      {/*  Imagem de Fundo */}
      <ImageBackground
        style={Estilos.imagemFundo}
        source={require('../Imagens/bg65.png')}>
        {/*  Imagem "Quem é Esse Pokémon?" */}
        <Image
          source={require('../Imagens/Title.png')}
          style={{ height: 100, width: 234.17, marginTop: -100 }}
        />
        {/* Tentativas Restantes */}
        <View style={Estilos.tentativas}>
          <Text style={Estilos.textGeral}> Tentativas Restantes:</Text>
          <Text>
            {tentativas === 0 ? '' : ''}
            {tentativas > 0 ? vidas.join(' ') : ''}
            {tentativas < 4 ? vidas.slice(tentativas).join('❤') : ''}
          </Text>
        </View>
        {/*  Foto do Pokémon Gerado Aleatoriamente */}
        <View style={Estilos.randomPokemon}>
          <Image
            style={{ width: 150, height: 150 }}
            tintColor={tintColor}
            blurRadius={blurRadius}
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                idPokemon + 1
              }.png`,
            }}
          />
        </View>
        {/*  Campo de Texto para Adivinhar o Nome do Pokémon */}
        <View style={Estilos.center}>
          <TextInput
            style={Estilos.input}
            placeholder="Digite o nome de um Pokémon..."
            value={inputName}
            onChangeText={(text) => setInputName(text)}
          />
        </View>
        {/*  Linha de Botões "Adivinhar" e "Revelar" */}
        <View style={Estilos.row}>
          <TouchableOpacity
            title="Adivinhar"
            style={Estilos.button}
            onPress={verificarTentativa}>
            <Text style={Estilos.textButton}>ADIVINHAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            title="Revelar"
            style={Estilos.buttonRed}
            onPress={proximaTentativa}>
            <Text style={Estilos.textButton}>REVELAR</Text>
          </TouchableOpacity>
        </View>
        {/*  Linha de Erros, Acertos e Exibição de Sequência (quando > 0) */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 260,
            marginTop: 10,
          }}> 
          <View style={{ justifyContent: 'flex-start' }}>
            <Text style={Estilos.textGeral}> Acertos: {acertos} </Text>
          </View>

          <View style={{ justifyContent: 'flex-end' }}>
            <Text style={Estilos.textGeral}>
              {' '}
              Sequência: {sequencia}{' '}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 260,
            marginTop: 10,
          }}>
          <View style={{ justifyContent: 'flex-start' }}>
            <Text style={Estilos.textGeral}> Erros: {erros} </Text>
          </View>

          <View style={{ justifyContent: 'flex-end' }}>
            <Text style={Estilos.textGeral}>
              {' '}
              Recorde: {recorde}{' '}
            </Text>
          </View>
        </View>

        {/*  Modal quando adivinha um Pokémon */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalAcertoVisible}
          onRequestClose={() => setModalAcertoVisible(false)}>
          <View style={Estilos.centeredView}>
            <View style={Estilos.modalView}>
              <Text style={Estilos.modalText}>
                {' '}
                Parabéns! Você capturou o Pokémon:{' '}
                {capturedPokemon?.name.slice(0, 1).toUpperCase() +
                  capturedPokemon?.name.slice(1, capturedPokemon?.name.length)}
                !
              </Text>
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: capturedPokemon?.image }}
              />
              <TouchableOpacity
                style={{ ...Estilos.button }}
                onPress={fecharModalAcerto}>
                <Text style={Estilos.textButton}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal quando não adivinha um Pokémon e acabam as tentativas */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalErroVisible}
          onRequestClose={() => setModalErroVisible(false)}>
          <View style={Estilos.centeredView}>
            <View style={Estilos.modalView}>
              <Text style={Estilos.modalText}>
                Você esgotou suas tentativas. Tente adivinhar outro Pokémon!
              </Text>
              <TouchableOpacity
                style={{ ...Estilos.buttonRed }}
                onPress={fecharModalErro}>
                <Text style={Estilos.textButton}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal quando não digita nada */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalTextoVazioVisible}
          onRequestClose={() => setModalTextoVazioVisible(false)}>
          <View style={Estilos.centeredView}>
            <View style={Estilos.modalView}>
              <Text style={Estilos.modalText}>
                Oops! Você não digitou nada!
              </Text>
              <TouchableOpacity
                style={{ ...Estilos.buttonRed }}
                onPress={() => setModalTextoVazioVisible(false)}>
                <Text style={Estilos.textButton}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
}
