import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import base64 from 'base-64';

export default class LoginScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username:"",
      password:""
    }
  }
 
  handleLogin = () => {
    fetch('https://mysqlcs639.cs.wisc.edu/login', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + base64.encode(this.state.username + ":" + this.state.password)
      }
    })
    .then(response => response.json())
    .then(res => {
      if(res.message !== undefined){
        alert("Username or password is incorrect!");
      } else {
        this.props.login(this.state.username, res.token);
      }
    })

  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.logo} accessible={true} >FitnessTracker</Text>
        <Text style={styles.plain}>Welcome! Please login or signup to continue.</Text>
        <View style={styles.inputView}>
          <TextInput accessibilityLiveRegion="polite"
            accessible={true}
            secureTextEntry
            // accessibilityActions={[
            //   { name: 'activate'}
            // ]}
            
            // onAccessibilityAction={(event) => {
            //   if (event.nativeEvent.actionName === 'activate') {
            //     Alert.alert('Alert', 'You can now enter your username');
            //   }
            //   if (event.nativeEvent.actionName === 'longpress') {
            //     Alert.alert('Alert', 'You can now paste your username');
            //   }
            // }}
            accessibilityLabel="Enter username"
            accessibilityHint="Tap me and enter your username"
            style={styles.inputText}
            placeholder="Username" 
            placeholderTextColor="#fe8484"
            onChangeText={text => this.setState({username:text})}/>
        </View>
        <View style={styles.inputView}>
          <TextInput accessibilityLiveRegion="polite"
            accessible={true} 
            accessibilityLabel="Enter password"
            accessibilityHint="Tap me and enter your password"
            // accessibilityActions={[
            //   { name: 'activate'},
            // ]}
            // onAccessibilityAction={(event) => {
            //   if (event.nativeEvent.actionName === 'activate') {
            //     Alert.alert('Alert', 'You can now enter your passwor');
            //   }
            // }}
            secureTextEntry
            style={styles.inputText}
            placeholder="Password" 
            placeholderTextColor="#fe8484"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity 
            accessible={true} 
            accessibilityLabel="Log in"
            accessibilityHint="Tap me to login with your provided username and password" 
            style={styles.btn} 
            onPress={this.handleLogin}>
            <Text style={styles.btnText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          accessible={true} 
          accessibilityLabel="Sign up"
          accessibilityHint="Tap me to be directed to the sign up page" 
          style={styles.btn} 
          onPress={() => this.props.navigation.navigate('SignupScreen')}>
            <Text style={styles.btnText}>SIGNUP</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:40,
    color:"#fb5b5a",
    marginBottom:10
  },
  plain:{
    marginBottom: 20,
    justifyContent:"center",
    color:"#003f5c"
  },
  inputView:{
    width:"70%",
    borderWidth: 1,
    height: 40,
    borderColor:"#fb5b5a",
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"#003f5c"
  },
  forgot:{
    color:"#003f5c",
    fontSize:11
  },
  btn:{
    width:"40%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    margin:10
  },
  btnText:{
    color:"white"
  }
});
