import React, { Component } from 'react';
import { Alert, Button, Text, View, Image, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'; 


//Home Screen

class LogoTitle extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems:'center', justifyContent: 'center' }}>
        <Image
          source={require('./assets/spiro.png')}
          style={{width: 30, height: 30, tintColor: '#2196F3'  }}
        />
      </View>
    );
  }
}


class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };
  
  constructor()
    {
        super();
 
        this.state = { 
          nim: '',
          nama: '',
          judulSkripsi: '', 
          dos_1: '', 
          dos_2: '',
          ActivityIndicator_Loading: false, 

        }
    }
    //fungsi mengirim data ke database
    Insert_Data_Into_MySQL = () =>
    {
        this.setState({ ActivityIndicator_Loading : true }, () =>
        {
            fetch('https://nukeninkonoha.000webhostapp.com/kirimData.php',
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                  nim : this.state.nim,
                  nama : this.state.nama,
                  judulSkripsi : this.state.judulSkripsi,
                  dos_1 : this.state.dos_1,
                  dos_2 : this.state.dos_2,
                })
 
            }).then((response) => response.json()).then((responseJsonFromServer) =>
            {
                Alert.alert(responseJsonFromServer);
                this.setState({ ActivityIndicator_Loading : false });
            }).catch((error) =>
            {
                console.error(error);
                this.setState({ ActivityIndicator_Loading : false});
            });
        });
    }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style = { styles.MainContainer }>
                <View style={{ flex: 1, alignItems:'center', justifyContent: 'center' }}>
                 <Image
                    source={require('./assets/spiro.png')}//image
                    style={{width: 100, height: 100 }}
                  />
               </View>
                <TextInput 
                  placeholder = "NIM Mahasiswa"
                  style = { styles.TextInputStyleClass } 
                  underlineColorAndroid = "transparent"
                  returnKeyType="next"
                  keyboardType="numeric"
                  onSubmitEditing={() => this.namaInput.focus()}
                  onChangeText = {(TextInputText) => this.setState({ nim: TextInputText })} />

                <TextInput 
                  placeholder = "Nama Mahasiswa"
                  style = { styles.TextInputStyleClass } 
                  underlineColorAndroid = "transparent"
                  returnKeyType="next"
                  autoCapitalize="words"
                  ref={(input) => this.namaInput = input}
                  onSubmitEditing={() => this.judulInput.focus()}
                  onChangeText = {(TextInputText) => this.setState({ nama: TextInputText })} />
                
                <TextInput 
                  placeholder = "Judul Skripsi"
                  style = { styles.TextInputStyleClass } 
                  underlineColorAndroid = "transparent"
                  returnKeyType="next"
                  autoCapitalize="words"
                  ref={(input) => this.judulInput = input}
                  onSubmitEditing={() => this.dos1Input.focus()}
                  onChangeText = {(TextInputText) => this.setState({ judulSkripsi: TextInputText })} />

                <TextInput 
                  placeholder = "Dosen Pembimbing 1"
                  style = { styles.TextInputStyleClass } 
                  underlineColorAndroid = "transparent"
                  returnKeyType="next"
                  ref={(input) => this.dos1Input = input}
                  onSubmitEditing={() => this.dos2Input.focus()}
                  onChangeText = {(TextInputText) => this.setState({ dos_1: TextInputText })} />
 
                <TextInput  
                  placeholder = "Dosen Pembimbing 2" 
                  style = { styles.TextInputStyleClass } 
                  underlineColorAndroid = "transparent"
                  returnKeyType="next"
                  ref={(input) => this.dos2Input = input}
                  onChangeText = {(TextInputText) => this.setState({ dos_2
                    : TextInputText })} />
 
                <TouchableOpacity 
                  activeOpacity = { 0.5 }
                  style = { styles.TouchableOpacityStyle } 
                  onPress = { this.Insert_Data_Into_MySQL }>
                    <Text style = { styles.TextStyle }>Input Data Skripsi</Text>
                </TouchableOpacity>

                {
                  this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#2196F3' size='large'style={styles.ActivityIndicatorStyle} /> : null
                }
                
            </KeyboardAvoidingView> //penutup containerMain
     
      
    );
  }
}
export default HomeScreen;

const styles = StyleSheet.create(
{
    MainContainer:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20

    },
 
    TextInputStyleClass:
    {
      textAlign: 'center',
      height: 40,
      backgroundColor : "#fff",
      borderWidth: 1,
      borderColor: '#2196F3',
      borderRadius: 7 ,
      marginBottom: 10,
      width: '95%'
    },

    BoxClass:
    {
      alignItems: 'center',
      height: 40,
      backgroundColor : "#fff",
      borderWidth: 1,
      borderColor: '#2196F3',
      borderRadius: 7 ,
      marginBottom: 10,
      width: '95%'
    },
 
    TouchableOpacityStyle:
   {
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#2196F3',
      marginBottom: 20,
      width: '70%',
      borderRadius: 7 
 
    },
 
    TextStyle:
    {
       color: '#fff',
        textAlign: 'center',
        fontSize: 18
    },

    ActivityIndicatorStyle:{
      
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    
  }, 
  Header: {
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextHeader: {
        fontSize: 30,
        color: '#2196F3'
    },
});