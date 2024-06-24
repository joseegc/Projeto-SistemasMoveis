import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ImageBackground,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Estilos from '../Estilos/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalErro from '../../components/ModalErro';
import { useNavigation } from '@react-navigation/native';
import TelaPrincipal from './TelaPrincipal';

export default function Cadastro() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [erroTexto, setErroTexto] = useState('');

  // Confirmar o cadastro
  const cadastrar = async () => {
    console.log('Tentativa de cadastro:', nome, email, senha);

    // Não enviar os campos em branco
    if (!nome || !email || !senha) {
      setErroTexto('Por favor, preencha todos os campos.');
      setModalVisible(true);
      console.log('Campos em branco detectados');
      return;
    }

    // Aqui entram as validações usando o Regex
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regexEmail.test(email)) {
      console.log('Email válido');
    } else {
      setErroTexto('Por favor, insira um e-mail válido.');
      setModalVisible(true);
      console.log('Email inválido');
      return;
    }

    const regexSenha = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{6,}$/;

    if (regexSenha.test(senha)) {
      console.log('Senha válida');
    } else {
      setErroTexto(
        'A senha deve conter seis dígitos, tendo pelo menos um número e um caractere especial.'
      );
      setModalVisible(true);
      console.log('Senha inválida');
      return;
    }

    try {
      await AsyncStorage.setItem('nome', nome);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('senha', senha);
      // Recuperar os dados existentes da Pokédex (caso existam)
    const pokedexSalva = await AsyncStorage.getItem('pokedex');
    let pokedexAtualizada = [];

    if (pokedexSalva) {
      pokedexAtualizada = JSON.parse(pokedexSalva);
    }

    // Adicionar o novo perfil à Pokédex
    pokedexAtualizada.push({ nome: nome, pokemons: [] });

    // Salvar os dados atualizados da Pokédex no AsyncStorage
    await AsyncStorage.setItem('pokedex', JSON.stringify(pokedexAtualizada));

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      console.log('Cadastro realizado com sucesso');
      navigation.navigate('LoginLogin');
    } catch (error) {
      console.error('Erro ao salvar no AsyncStorage', error);
      setErroTexto('Erro ao salvar os dados. Tente novamente.');
      setModalVisible(true);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/fundoCadastro.jpg')}
      style={Estilos.loginImageBackground}
    >
      <View style={Estilos.loginOverlay}>
        <View style={Estilos.loginTitleContainer}>
          <Image
            style={Estilos.loginTinyLogo}
            source={require('../../assets/Cadastro.png')}
          />
        </View>
        <View style={Estilos.loginFormContainer}>
      <Text style={Estilos.loginTitle}>Nome de Usuário:</Text>
      <TextInput
        style={Estilos.loginInput}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite seu nome"
        placeholderTextColor="gray"
      />
      <Text style={Estilos.loginTitle}>Email:</Text>
      <TextInput
        style={Estilos.loginInput}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu email"
        placeholderTextColor="gray"
      />
      <Text style={Estilos.loginTitle}>Senha:</Text>
      <TextInput
        style={Estilos.loginInput}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true}
        placeholder="Digite sua senha"
        placeholderTextColor="gray"
      />
      <TouchableOpacity
        title="Cadastrar"
        style={Estilos.loginButton}
        onPress={cadastrar}
      >
        <Text style={Estilos.loginButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        title="Voltar"
        style={Estilos.loginButtonVoltar}
        onPress={() => navigation.goBack()}
      >
        <Text style={Estilos.loginButtonText}>Voltar</Text>
      </TouchableOpacity>

      <ModalErro
        visible={modalVisible}
        texto={erroTexto}
        textoBotao="Voltar"
        fecharModal={() => setModalVisible(false)}
      />
    </View>
    </View>
    </ImageBackground>
);
}
