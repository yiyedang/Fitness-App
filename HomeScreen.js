import React from 'react';
import TodayView from './TodayView';
import ExerciseView from './ExerciseView';
import { StyleSheet } from 'react-native';
import ProfileView from './ProfileView';
import MealView from './MealView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activityGoal: ''
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
            this.setState({
                activityGoal: res.goalDailyActivity,
            });
        })
    }

    handleGoalUpdate = () => {
        fetch('https://mysqlcs639.cs.wisc.edu/users/' + this.props.username, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': this.props.token
            },
            body: JSON.stringify({ 
                goalDailyActivity: this.state.activityGoal,
            })
        })
        .then(response => response.json())
        .then(res => {
            alert(res.message);
        })
    }

    setActivity = (goal) => {
        this.setState({
            activityGoal: goal
        });
    }

    render() {
        let { activityGoal } = this.state;
        if (!activityGoal) activityGoal = ''
        else activityGoal = this.state.activityGoal

        const Tab = createBottomTabNavigator();
        
        return (
        <Tab.Navigator>
            <Tab.Screen name='TodayView'
                options={{
                    tabBarLabel: 'Today',
                    tabBarIcon: () => (
                        <MaterialIcons name="today" size={24} color="#fb5b5a" />
                    ),
                  }}>
                {(props) => <TodayView {...props} 
                username={this.props.username} 
                token={this.props.token}
                activityGoal={this.state.activityGoal}/>}
            </Tab.Screen>
            <Tab.Screen name='ExerciseView'
                options={{
                    tabBarLabel: 'Exercises',
                    tabBarIcon: () => (
                        <FontAwesome5 name="running" size={24} color="#fb5b5a" />                    
                        ),
                  }}>
                {(props) => <ExerciseView {...props} 
                username={this.props.username} 
                token={this.props.token}/>}
            </Tab.Screen> 
            <Tab.Screen name='MealView'
                options={{
                    tabBarLabel: 'Meals',
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="food" size={24} color="#fb5b5a" />               
                    ),
                  }}>
                {(props) => <MealView {...props} 
                username={this.props.username} 
                token={this.props.token}/>}
            </Tab.Screen> 
            <Tab.Screen name='ProfileView' 
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: () => (
                        <Ionicons name="md-person" size={24} color="#fb5b5a" />
                    ),
                  }}>
                {(props) => <ProfileView {...props} 
                username={this.props.username} 
                token={this.props.token}
                activity={activityGoal}
                setActivity={this.setActivity}
                handleGoalUpdate={this.handleGoalUpdate}/>}
            </Tab.Screen>
            
        </Tab.Navigator>
      )
    }
}

const styles = StyleSheet.create({
    
});

export default HomeScreen;