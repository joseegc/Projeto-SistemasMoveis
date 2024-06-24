import React, { useState } from 'react';
import ModalErro from '../../components/ModalErro';
import Estilos from '../Estilos/styles';

import {
  View,
  Text,
  TextInput,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Estiloshlogineet,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginLogin({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [erroTexto, setErroTexto] = useState('');


  const handleCadastrar = () => {
    navigation.navigate('Cadastro');
  };

  const handleTelaPrincipal = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('nome');
      const storedPassword = await AsyncStorage.getItem('senha');

      if (storedUsername === username && storedPassword === password) {
        navigation.navigate('TelaPrincipal');
      } else {
         setErroTexto('Usuário ou senha incorretos');
      setModalVisible(true);
      console.log('Usuário ou senha incorretos');
      return;
      }
    } catch (error) {
      console.error('Erro ao recuperar os dados do AsyncStorage', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/TelaInicial.jpg')}
      style={Estilos.loginImageBackground}
    >
      <View style={Estilos.loginOverlay}>
        <View style={Estilos.loginTitleContainer}>
          <Image
            style={Estilos.loginTinyLogo}
            source={require('../../assets/Titulo.png')}
          />
        </View>
        <View style={Estilos.loginFormContainer}>
          <Text>Usuário:</Text>
          <TextInput
            style={Estilos.loginInput}
            placeholder="Nome de Usuário"
            placeholderTextColor="rgb(144, 144, 144)"
            value={username}
            onChangeText={setUsername}
          />
          <Text>Senha:</Text>
          <TextInput
            style={Estilos.loginInput}
            placeholder="Senha"
            placeholderTextColor="rgb(144, 144, 144)"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={handleCadastrar}>
            <Text style={Estilos.loginLink}>Cadastre-se aqui</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleTelaPrincipal} style={Estilos.loginButton}>
            <Text style={Estilos.loginButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
        <ModalErro
        visible={modalVisible}
        texto={erroTexto}
        textoBotao="Voltar"
        fecharModal={() => setModalVisible(false)}
      />
      </View>
    </ImageBackground>
  );
}

export default LoginLogin;
