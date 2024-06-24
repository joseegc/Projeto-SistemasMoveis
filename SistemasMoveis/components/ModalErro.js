import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Estilos from '../src/Estilos/styles';

export default function ModalErro({ visible, texto, textoBotao, fecharModal }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={fecharModal}>
       <View style={Estilos.centeredView}>
            <View style={Estilos.modalView}>
              <Text style={Estilos.modalText}>{texto}</Text>
          <TouchableOpacity onPress={fecharModal} style={Estilos.buttonRed}>
            <Text style={Estilos.textButton}>{textoBotao}</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </Modal>
  );
}