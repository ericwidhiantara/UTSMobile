import React, { Component } from 'react';
import { Alert, Button, Text, View, Image, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'; 

//Home Screen

class LoginScreen extends React.Component {
  constructor()
    {
        super();
 
        this.state = { 
          username: '',
          password: '',
          ActivityIndicator_Loading: false, 

        }
    }
    //fungsi mengirim data ke database
    UserLoginFunction = () =>{
 this.setState({ ActivityIndicator_Loading : true }, () =>
        {
fetch('https://nukeninkonoha.000webhostapp.com/login.php', 
{
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
 
    username : this.state.username,
    password : this.state.password,
 
  })
 
}).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ ActivityIndicator_Loading : false });
        // If server response message same as Data Matched
       if(responseJson === 'Login berhasil!')
        {

            //Then open Profile activity and send user email to profile activity.
            this.props.navigation.navigate('Tabs');

        }
        else{

          Alert.alert(responseJson);
        }

      }).catch((error) => {
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
                    source={require('./assets/NavLogo.png')}//image
                    style={{width: 150, height: 150 }}
                  />
               </View>
               <View style={{ flex: 0.3, alignItems:'center', justifyContent: 'center' }}>
                 <Text style={{fontWeight: 'bold', color: '#2196F3' }}>Skripsi Mahasiswa</Text>
               </View>
                <TextInput 
                  placeholder = "Username"
                  style = { styles.TextInputStyleClass } 
                  underlineColorAndroid = "transparent"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => this.passInput.focus()}
                  onChangeText = {(TextInputText) => this.setState({ username: TextInputText })} />

                <TextInput 
                  placeholder = "Password"
                  style = { styles.TextInputStyleClass } 
                  underlineColorAndroid = "transparent"
                  returnKeyType="go"
                  autoCapitalize="none"
                  secureTextEntry
                  ref={(input) => this.passInput = input}
                  onChangeText = {(TextInputText) => this.setState({ password: TextInputText })} />
                
 
                <TouchableOpacity 
                  activeOpacity = { 0.5 }
                  style = { styles.TouchableOpacityStyle } 
                  onPress = { this.UserLoginFunction }>

                    <Text style = { styles.TextStyle }>Login</Text>

                </TouchableOpacity>

                {
        
                this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#2196F3' size='large'style={styles.ActivityIndicatorStyle} /> : null
                
                }
                
            </KeyboardAvoidingView> //penutup containerMain
     
      
    );
  }
}
export default LoginScreen;

const styles = StyleSheet.create(
{
    MainContainer:
    {
      flex: 0.8,
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