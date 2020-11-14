import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default class ProfileView extends React.Component{
    constructor(props){
        super(props);
        this. state = {
            firstName: "",
            lastName: "",
            calories: "",
            protein: "",
            carbs: "",
            fat: ""
            // activity: ""
        }
    }

    componentDidMount(){
        fetch('https://mysqlcs639.cs.wisc.edu/users/' + this.props.username, {
            method: 'GET',
            headers: {
                'x-access-token': this.props.token
            }
          })
          .then(response => response.json())
          .then(res => {
            this.setState({firstName: res.firstName, 
                lastName: res.lastName,
                calories: res.goalDailyCalories,
                protein: res.goalDailyProtein,
                carbs: res.goalDailyCarbohydrates,
                fat: res.goalDailyFat,
                // activity: res.goalDailyActivity,
            });
        })
    }

    handleUpdate = () => {
        fetch('https://mysqlcs639.cs.wisc.edu/users/' + this.props.username, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': this.props.token
            },
            body: JSON.stringify({ 
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                goalDailyCalories: this.state.calories,
                // goalDailyActivity: this.state.activity,
                goalDailyCarbohydrates: this.state.carbs,
                goalDailyProtein: this.state.protein,
                goalDailyFat: this.state.fat
            })
        })
        .then(response => response.json())
        .then(res => {
            alert(res.message);
        })
    }

    render(){
        let { firstName, lastName, calories, protein, carbs, fat } = this.state;
        if (!firstName) firstName = ""
        else firstName = this.state.firstName
        if (!lastName) lastName = ""
        else lastName = this.state.lastName
        if (!calories) calories = ""
        else calories = this.state.calories.toString()
        if (!protein) protein = ""
        else protein = this.state.protein.toString()
        if (!carbs) carbs = ""
        else carbs = this.state.carbs.toString()
        if (!fat) fat = ""
        else fat = this.state.fat.toString()
        let activity = this.props.activity.toString()
        // if (!activity) activity = ""
        // else activity = this.state.activity.toString()

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.logo}>About Me</Text>
                    <Text style={styles.plain}>Let's get to know you! Specify your information below.</Text>
                    <Text style={styles.title}>Personal Information</Text>
                    <Text style={styles.subtitle}>First Name</Text>
                    <View style={styles.inputView} >
                        <TextInput  
                        style={styles.inputText}
                        placeholder="Bucky" 
                        placeholderTextColor="#fe8484"
                        onChangeText={text => this.setState({firstName:text})}
                        value={firstName}/>
                    </View>
                    <Text style={styles.subtitle}>LastName</Text>
                    <View style={styles.inputView} >
                        <TextInput  
                        style={styles.inputText}
                        placeholder="Badger" 
                        placeholderTextColor="#fe8484"
                        onChangeText={text => this.setState({lastName:text})}
                        value={lastName}/>
                    </View>
                    <Text style={styles.title}>Fitness Goals</Text>
                    <Text style={styles.subtitle}>Daily Calories (kcal)</Text>
                    <View style={styles.inputView} >
                        <TextInput  
                        style={styles.inputText}
                        placeholder="0" 
                        placeholderTextColor="#fe8484"
                        onChangeText={text => this.setState({calories:text})}
                        value={calories}/>
                    </View>
                    <Text style={styles.subtitle}>Daily Protein (grams)</Text>
                    <View style={styles.inputView} >
                        <TextInput  
                        style={styles.inputText}
                        placeholder="0" 
                        placeholderTextColor="#fe8484"
                        onChangeText={text => this.setState({protein:text})}
                        value={protein}/>
                    </View>
                    <Text style={styles.subtitle}>Daily Carbs (grams)</Text>
                    <View style={styles.inputView} >
                        <TextInput  
                        style={styles.inputText}
                        placeholder="0" 
                        placeholderTextColor="#fe8484"
                        onChangeText={text => this.setState({carbs:text})}
                        value={carbs}/>
                    </View>
                    <Text style={styles.subtitle}>Daily Fat (grams)</Text>
                    <View style={styles.inputView} >
                        <TextInput  
                        style={styles.inputText}
                        placeholder="0" 
                        placeholderTextColor="#fe8484"
                        onChangeText={text => this.setState({fat:text})}
                        value={fat}/>
                    </View>
                    <Text style={styles.subtitle}>Daily Activity (mins)</Text>
                    <View style={styles.inputView} >
                        <TextInput  
                        style={styles.inputText}
                        placeholder="0" 
                        placeholderTextColor="#fe8484"
                        // onChangeText={text => this.setState({activity:text})}
                        onChangeText={text => this.props.setActivity(text)}
                        value={activity}
                        />
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={this.props.handleGoalUpdate}>
                        <Text style={styles.btnText}>SAVE PROFILE</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        margin:10
    },
    title:{
        fontWeight:"bold",
        fontSize:20,
        color:"#fb5b5a",
        marginBottom:10
    },
    subtitle: {
        fontWeight:"bold",
        fontSize:15,
        color:"#003f5c",
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
        width:"50%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:10
    },
    btnText:{
        color:"white"
    }
});