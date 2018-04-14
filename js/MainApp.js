import React, { Component } from 'react';
import { Alert, Button, Text, View, Image, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'; 

import HomeScreen from './HomeScreen'; //memanggil file HomeScreen
import DetailsScreen from './DetailsScreen';
import DataScreen from './DataScreen'; //memanggil file DataScreen
import LoginScreen from './LoginScreen';
import SearchScreen from './SearchScreen';

export default class MainApp extends React.Component {
  render() {
    return (
      <AppRouter /> //memanggil AppRouter Screen
    );
  }
}
const LoginStack = StackNavigator({
  Login: { screen: LoginScreen },
  }, {
    navigationOptions: {
      header: false,
    }
});
const SearchStack = StackNavigator({
  Search: { screen: SearchScreen },
  }, {
    navigationOptions: {
      header: false,
    }
});

const HomeStack = StackNavigator({
  Home: { screen: HomeScreen }, //memanggil class HomeScreen yang ada di file HomeScreen 
  }, {
    navigationOptions: {
      header: false,
    }
});

const DataStack = StackNavigator(
  {
    Data: { screen: DataScreen }, //memanggil class DataScreen yang ada di file DataScreen
    Details: { screen: DetailsScreen },
  }, 
  {
    navigationOptions: {
      header: false,
    }
  }
);


const ScreenTab =  TabNavigator(
  {
    Home: { screen: HomeStack }, //memanggil stack navigator HomeStack
    Search: { screen: SearchStack }, //memanggil stack navigator search
    Data: { screen: DataStack }, //memanggil stack navigator DataStack 
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-create${focused ? '' : '-outline'}`;
        } else if (routeName === 'Data') {
          iconName = `ios-document${focused ? '' : '-outline'}`;
        } else if (routeName === 'Search') {
          iconName = `ios-search${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#2196F3',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);
export const AppRouter = StackNavigator(
  {
    Login: { screen: LoginStack }, 
    Tabs: { screen: ScreenTab },
  },
  {
    navigationOptions: 
    {
      header: false,
      gesturesEnabled: false
    }
  }
);
