import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Estilos from '../Estilos/styles';
import ModalErro from '../../components/ModalErro';
import { useNavigation } from '@react-navigation/native';

export default function Perfil() {
  // Move a declaração do hook useNavigation para dentro do componente Perfil
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [acertos, setAcertos] = useState(0);
  const [sequencia, setSequencia] = useState(0); 
  const [modalVisible, setModalVisible] = useState(false);
  const [erroTexto, setErroTexto] = useState('');

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    try {
      const acertosSalvos = await AsyncStorage.getItem('acertos');
      const sequenciaSalva = await AsyncStorage.getItem('sequencia');
      const nomeSalvo = await AsyncStorage.getItem('nome');
      const emailSalvo = await AsyncStorage.getItem('email');

      if (acertosSalvos !== null) setAcertos(parseInt(acertosSalvos));
      if (sequenciaSalva !== null) setSequencia(parseInt(sequenciaSalva));
      if (nomeSalvo !== null) setNome(nomeSalvo);
      if (emailSalvo !== null) setEmail(emailSalvo);
    } catch (error) {
      console.error('Erro ao carregar os dados do AsyncStorage', error);
    }
  }

  const sair = () => {
    console.log('Botão de sair pressionado');
    navigation.navigate('LoginLogin');
  }

  const apagarConta = async () => {
    try {
      await AsyncStorage.clear(); // Limpa todos os dados do AsyncStorage

      // Define a mensagem de sucesso
      setErroTexto('Conta excluída com sucesso.');

      // Exibe o modal de sucesso
      setModalVisible(true);

      // Navega para a tela de login
      navigation.navigate('LoginLogin');
    } catch (error) {
      console.error('Erro ao apagar a conta:', error);
    }
  }

  return (
    <View style={Estilos.containerPerfil}>
      <View style={Estilos.capaPerfil}></View>
      <Image style={Estilos.fotoPerfil} source={{ uri: 'https://picsum.photos/130/130' }} />
      <View style={Estilos.conteudoPrincipalPerfil}>
        <View style={Estilos.infoPerfil}>
          <Text style={Estilos.nomePerfil}>
            {nome ? nome : 'Carregando...'}
          </Text>
        </View>

        <View style={Estilos.statsInfo}>
          <View style={Estilos.statsItem}>
            <Image source={require('../Imagens/starRender.png')} style={Estilos.iconesPerfil} />
            <Text style={Estilos.statsTexto}>Acertos</Text>
            <Text style={Estilos.statsTexto}>{acertos}</Text>
          </View>

          <View style={Estilos.statsItem}>
            <Image source={require('../Imagens/trophyRender.png')} style={Estilos.iconesPerfil} />
            <Text style={Estilos.statsTexto}>Recorde</Text>
            <Text style={Estilos.statsTexto}>{sequencia}</Text>
          </View>
        </View>

        <View style={Estilos.emailPerfil}>
          <Text style={Estilos.statsTexto}>Email: {email}</Text>
        </View>

        <View style={Estilos.separator} />

        <TouchableOpacity style={Estilos.buttonSair} onPress={sair}>
          <Text style={Estilos.buttonText}>Sair</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Estilos.buttonSair} onPress={apagarConta}>
          <Text style={Estilos.buttonText}>Apagar conta</Text>
        </TouchableOpacity>

        <ModalErro
          visible={modalVisible}
          texto={erroTexto}
          textoBotao="Ok"
          fecharModal={() => setModalVisible(false)}
        />
      </View>
    </View>
  );
}
