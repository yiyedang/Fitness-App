import React from 'react';

import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

class TodayView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseCards: [],
            mealCards: []
        }
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', 
            () => fetch('https://mysqlcs639.cs.wisc.edu/activities', {
                    method: 'GET',
                    headers: {
                        'x-access-token': this.props.token,
                    }
                })
                .then(response => response.json())
                .then(res => {
                    let cardsForToday = res.activities.filter(card => this.sameDay(card.date));
                    this.setState({
                        exerciseCards: cardsForToday
                    });
                })
        );

        this.focusListener = this.props.navigation.addListener('focus', 
            () => fetch('https://mysqlcs639.cs.wisc.edu/meals', {
                    method: 'GET',
                    headers: {
                        'x-access-token': this.props.token,
                    }
                })
                .then(response => response.json())
                .then(res => {
                    let cardsForToday = res.meals.filter(card => this.sameDay(card.date));
                    this.setState({
                        mealCards: cardsForToday
                    });
                })
        );
    }

    sameDay(cardDate) {
        const d1 = new Date();
        const d2 = new Date(cardDate);
        return d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate();
    }

    addCard = (exercise, index) => {
        return (
            <Card key={index}>
                <Card.Title>{exercise.name}</Card.Title>
                <Card.Divider/>
                <Text>Date: {this.getDate(new Date(exercise.date))} {this.getTime(new Date(exercise.date))}</Text>
                <Text>Calories Burnt: {exercise.calories}</Text>
                <Text>Duration: {exercise.duration}</Text>
            </Card>
        );
    }

    getAllCards = () => {
        let newCards = [];
        this.state.exerciseCards.forEach((card, index) => {
            newCards.push(this.addCard(card, index))
        });
        return newCards;
    }

    addMeal = (meal, index) => {
        return (
            <Card key={index}>
                <Card.Title>{meal.name}</Card.Title>
                <Card.Divider/>
                <Text>Date: {this.getDate(new Date(meal.date))} {this.getTime(new Date(meal.date))}</Text>
            </Card>
        );
    }

    getMeals = () => {
        let newCards = [];
        this.state.mealCards.forEach((card, index) => {
            newCards.push(this.addMeal(card, index))
        });
        return newCards;
    }

    getDate = (date) => {
        return date.getFullYear() + "-" + parseInt(date.getMonth()+1) + "-"+ date.getDate()
    }

    getTime = (time) => {
        return time.getHours() + ":" + parseInt(time.getMinutes()+1) + ":"+ time.getSeconds()
    }

    getTotalDuration = () => {
        let duration = 0;
        this.state.exerciseCards.forEach((card, index) => {
            duration += card.duration
        });
        return duration;
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{marginTop: 17}}>
                            <FontAwesome name="gear" size={40} color="#fb5b5a" />
                        </View>
                        <Text style={styles.logo}>Today</Text>
                    </View>
                    <Text style={styles.plain}>What's on the agenda for today?</Text>
                    <Text style={styles.plain}>Below are all of your goals and exercises.</Text>
                    <Card>
                        <Card.Title>Goal Status</Card.Title>
                        <Card.Divider/>
                        <Text>Daily Activity {this.getTotalDuration()}/{this.props.activityGoal} minutes</Text> 
                    </Card>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{marginTop: 15}}>
                            <MaterialCommunityIcons name="run" size={24} color="#fb5b5a" />
                        </View>
                        <Text style={styles.title}>Exercises</Text>
                    </View>
                    {this.getAllCards()}
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{marginTop: 15}}>
                            <MaterialCommunityIcons name="food-variant" size={24} color="#fb5b5a" />
                        </View>
                        <Text style={styles.title}>Meals</Text>
                    </View>
                    {this.getMeals()}

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
        margin:15
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

export default TodayView;