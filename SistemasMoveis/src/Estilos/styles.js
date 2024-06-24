import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  containerPokedex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
   imagemFundo: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    alignItems: 'center',
  },

  input: {
    fontFamily: 'PressStart2P_400Regular',
    textAlign: 'center',
    fontSize: 8,
    height: 40,
    width: 300,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white', 
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
   tentativas: {
     marginTop: 20,
     marginBottom: 10,
     justifyContent: 'center',
     alignItems: 'center',
   },
  
   button: {
    justifyContent: 'center',
    width: 120,
    backgroundColor: 'green',
    padding: 10,
    borderWidth: 2

  }, buttonRed: {
    justifyContent: 'center',
    width: 120,
    backgroundColor: '#b0463a',
    padding: 10,
    borderWidth: 2

  },
  buttonGreen: {
    justifyContent: 'center',
    width: 120,
    backgroundColor: 'green',
    padding: 10,
    borderWidth: 2

  },

  textButton: {
    fontSize: 9,
    textAlign: 'center',
    fontFamily: 'PressStart2P_400Regular',
    color: 'white'
  },
 
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  randomPokemon: {
    backgroundColor: 'white', 
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 2,
    width: 210, 
    height: 210
  },
  cardContainer: {
    backgroundColor: 'fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 20,
    width: 250,
  },
    containerTabBars: {
    flex: 1,
    justifyContend: 'center',
    alignItems: 'center'
    
  },
  textTabBars: {
    fontSize: 12,
    fontWeigth: 'bold',
    fontFamily: 'PressStart2P_400Regular'
    
  },

    containerPerfil: {
      flex: 1,
      backgroundColor: '#ededed'
    },
    
    capaPerfil: {
      height: 200,
      backgroundColor: 'red',
      borderBottomWidth: 5, 
    },

    fotoPerfil: {
      width: 130,
      height: 130,
      position: 'absolute',
      alignSelf: 'center',
      marginTop: 130,
      borderWidth: 5,
      borderRadius: 90,
      borderColor: 'black'
    },

    conteudoPrincipalPerfil: {
      marginTop: 55
    },

    infoPerfil: {
      flexDirection: 'column',
      padding: 20,
      alignItems: 'center'
    },

    nomePerfil: {
      fontSize: 12,
      fontFamily: 'PressStart2P_400Regular',
    },

    statsInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },

    statsItem: {
      paddingHorizontal: 10,
      alignItems: 'center'
    },
    
    statsTexto: {
      fontSize: 12,
      fontFamily: 'PressStart2P_400Regular'
    },

    iconesPerfil: {
      width: 20,
      height: 20,
      marginBottom: 5
    },

    emailPerfil: {
    marginTop: 30,  
    alignItems: 'center',  
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 20,
    width: '80%',
    alignSelf: 'center',
  },
  buttonSair: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 10,
    marginHorizontal: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'PressStart2P_400Regular',
    color: 'white',
    fontSize: 12,
  },

    centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
   },

   modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
   },

   modalViewPokedex: {
    margin: 10,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
   },
    
   modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'PressStart2P_400Regular'
   },

   textGeral: {
    color: 'white',
    fontSize: 8,
    fontFamily: 'PressStart2P_400Regular'
   },

   listaPokemons: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 100,
    paddingLeft: 50,
    gap: 50,
   },

   textoLista: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 7,
   },

   //estilos para o cadastro e login
  loginImageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  loginOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginTitleContainer: {
    marginTop: -200,
    marginBottom: 200,
  },
  loginTinyLogo: {
    width: 400,
    height: 73,
    marginTop: 80,
  },
  loginFormContainer: {
    width: '80%',
    padding: 30,
    backgroundColor: '#f5f5dc',
    borderRadius: 18,
  },
  loginInput: {
    height: 40,
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 14,
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 8,
    backgroundColor: 'rgb(49, 49, 49)',
    paddingHorizontal: 10,
    width: '100%',
    color: 'white',
  },
  loginLink: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 7,
    color: 'red',
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginBottom: 8,
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: 'blue',
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  loginButtonVoltar: {
    marginTop: 10,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    fontFamily: 'PressStart2P_400Regular',
    color: 'white',
    fontSize: 9,
  },


});