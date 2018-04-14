import React, { Component } from 'react';
import { RefreshControl, Button, Text, View, Image, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, FlatList, List, ListItem } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json

//Data Screen
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
export default class DataScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };

constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      ActivityIndicator_Loading: false, 
    };
}

  componentDidMount()  {
    this.setState({ ActivityIndicator_Loading : true }, () =>
    {
        this.setState({refreshing: true});
        const url = 'https://nukeninkonoha.000webhostapp.com/getData.php';
       //this.setState({ loading: true });
        fetch (url)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("comp");
          console.log(responseJson);
          this.setState({
            data: responseJson,
            error: responseJson.error || null,
            loading: false,
            refreshing: false,
            ActivityIndicator_Loading: false, 

          });
        }
      );
    });
  }
  _keyExtractor = (item, index) => item.nim;

GetIDFunction=(nim, nama, judulSkripsi, dos_1, dos_2)=>{

          this.props.navigation.navigate('Details', { 

            nim : nim,
            nama : nama,
            judulSkripsi : judulSkripsi,
            dos_1 : dos_1,
            dos_2 : dos_2,

          });
        }

  render() {
    return (
<View style={ styles.MainContainer }>
  <View style={{ flex: 0.5, alignItems:'center', justifyContent: 'center' }}>
                 <Image
                    source={require('./assets/spiro.png')}//image
                    style={{width: 100, height: 100 }}
                  />
               </View>
      <View style={ styles.Header }>
        <Text style={ styles.TextHeader }> Data Skripsi Mahasiswa </Text>
      </View>
         
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) =>
            <View style={styles.BoxClass}>
              <Text>NIM : {item.nim}</Text>
              <Text>Nama : {item.nama}</Text>
              <Text>Judul Skripsi : {item.judulSkripsi}</Text>
              <Text>Pembimbing 1 : {item.dos_1}</Text>
              <Text>Pembimbing 2 : {item.dos_2}</Text>
              <View style={styles.EditClass}>
              <TouchableOpacity 
                  activeOpacity = { 0.5 }
                  style = { styles.UpdateOpacity } 
                  onPress={this.GetIDFunction.bind(
                        this, item.nim,
                         item.nama, 
                         item.judulSkripsi, 
                         item.dos_1, 
                         item.dos_2
                         )} > 
                    <Text style = { styles.TextStyle }>Edit Data</Text>
                </TouchableOpacity>
                </View>
            </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.componentDidMount.bind(this)}
          />
        }
        /> 
        

   </View>   
      
    );
  }
}
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
      alignItems: 'flex-start',
      height: 150,
      backgroundColor : "#fff",
      borderWidth: 1,
      borderColor: '#2196F3',
      borderRadius: 7 ,
      marginBottom: 10,
      width: 270,
      paddingTop: 5,
      paddingBottom: 5
    },
    EditClass:
    {
      flexDirection: 'row',
      alignItems: 'flex-start',
      height: 30,
      backgroundColor : "#fff",
      borderColor: '#fff',
      borderRadius: 7 ,
      marginTop: 15,
      marginBottom: 1,
      width: 260,
      paddingTop: 10,
      justifyContent: 'center',
      alignItems: 'center'
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
      DeleteOpacity:
   {
      paddingTop:10,
      paddingBottom:10,
      paddingLeft: 10,
      backgroundColor:'red',
      marginBottom: 20,
      width: '40%',
      borderRadius: 7 
 
    },
    UpdateOpacity:
   {
      paddingTop:10,
      paddingBottom:10,
      paddingRight: 10,
      backgroundColor:'#2196F3',
      marginBottom: 20,
      width: '40%',
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
        fontSize: 20,
        color: '#2196F3'
    },
});