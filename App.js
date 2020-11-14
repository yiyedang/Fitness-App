import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import { TouchableOpacity, View } from 'react-native';
import HomeScreen from './HomeScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: undefined,
      token: undefined,
      isLoggedIn: false
    }
  }

  login = (newUsername, newToken) => {
    this.setState(
      {username: newUsername,
      token: newToken,
      isLoggedIn: true}
    )
  }

  logout = () => {
    this.setState({
      accessToken: undefined,
      isLoggedIn: false
    })
  }

  render(){
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            headerStyle: {
              backgroundColor: '#fb5b5a',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              this.state.isLoggedIn ?
              <TouchableOpacity color="#fb5b5a" onPress={this.logout}>
                <MaterialCommunityIcons name="exit-to-app" size={24} color="white" />
              </TouchableOpacity>
              : <View></View>
            ), 
            headerRightContainerStyle: {
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'center',
              marginRight:20
            }
        }}>
          {this.state.isLoggedIn ? (
            <Stack.Screen name="HomeScreen" options={{ title: 'Fiteness App' }} >
              {(props) => <HomeScreen {...props} 
              username={this.state.username} 
              token={this.state.token}/>}
            </Stack.Screen>
          ) : (
          <>
            <Stack.Screen name="LoginScreen" options={{ title: 'Fiteness App' }}>
            {(props) => <LoginScreen {...props} login={this.login}/>}
          </Stack.Screen>
          <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ title: 'Fiteness App' }}>
          </Stack.Screen>
          </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
