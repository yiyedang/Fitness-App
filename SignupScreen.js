import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class SignupScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          username:"",
          password:""
        }
    }
    
    handleSignup = () => {
        if(this.state.password.length < 5){
            alert("Password is too short!");
        } else{
            fetch('https://mysqlcs639.cs.wisc.edu/users', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    username: this.state.username,
                    password: this.state.password
                })
            })
            .then(response => response.json())
            .then(res => {
                alert(res.message);
            })
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>FitnessTracker</Text>
                <Text style={styles.plain}>New here? Let's get started!</Text>
                <Text style={styles.plain}>Please create an account below.</Text>
                <View style={styles.inputView}>
                    <TextInput  
                    accessible={true}
                    accessibilityLiveRegion="polite"
                    accessibilityLabel="Enter username"
                    accessibilityHint="Tap me and enter your username"
                    style={styles.inputText}
                    secureTextEntry
                    placeholder="Username" 
                    placeholderTextColor="#fe8484"
                    onChangeText={text => this.setState({username:text})}/>
                </View>
                <View style={styles.inputView}>
                    <TextInput
                    accessible={true}
                    accessibilityLiveRegion="polite"
                    accessibilityLabel="Enter password"
                    accessibilityHint="Tap me and enter your password"
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password" 
                    placeholderTextColor="#fe8484"
                    onChangeText={text => this.setState({password:text})}/>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.btn} onPress={this.handleSignup}
                        accessible={true} 
                        accessibilityLabel="Create account"
                        accessibilityHint="Tap me to create a new account with provided username and password" >
                        <Text style={styles.btnText}>CREATE ACCOUNT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.goBack()}
                        accessible={true} 
                        accessibilityLabel="Exit"
                        accessibilityHint="Tap me to exit the Fitness tracking app" >
                        <Text style={styles.btnText}>NEVERMIND!</Text>
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