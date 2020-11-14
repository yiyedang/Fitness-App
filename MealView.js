import React from 'react';

import { StyleSheet, Text, View, TextInput, Modal, TouchableOpacity, ScrollView } from 'react-native';
import {DateTimePickerModal} from "react-native-modal-datetime-picker";
import { Card } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

class MealView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            showPicker: false,
            mode: 'date',
            name: '',
            mealCards: [],
            foods: [],
            id: '',
            datetime: new Date()
        }
    }

    componentDidMount() {
        fetch('https://mysqlcs639.cs.wisc.edu/meals', {
            method: 'GET',
            headers: {
                'x-access-token': this.props.token
            }
          })
        .then(response => response.json())
        .then(res => {
            this.setState({
                mealCards: res.meals
            });
        })
    }

    addCard = (meal, index) => {
        return (
            <Card key={index}>
                <Card.Title>{meal.name}</Card.Title>
                <Card.Divider/>
                <Text>Date: {this.getDate(new Date(meal.date))} {this.getTime(new Date(meal.date))}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.btn} onPress={() => this.openCard(meal.id)}>
                        <Text style={styles.btnText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => this.deleteCard(meal.id)}>
                        <Text style={styles.btnText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </Card>
        );
    }

    getAllCards = () => {
        let newCards = [];
        this.state.mealCards.forEach((card, index) => {
            newCards.push(this.addCard(card, index))
        });
        return newCards;
    }

    openCard = (id) => {
        let target = this.state.mealCards.find(card => card.id === id);
        this.setState({
            name: target.name,
            visible: true,
            id: target.id
        })
    }

    deleteCard = (id) => {
        fetch('https://mysqlcs639.cs.wisc.edu/meals/' + id, {
            method: 'DELETE',
            headers: {
                'x-access-token': this.props.token
            }
        })
        .then(response => response.json())
        .then(res => {
            alert(res.message);
            return fetch('https://mysqlcs639.cs.wisc.edu/meals', {
                method: 'GET',
                headers: {
                    'x-access-token': this.props.token,
                }
              })
              .then(response => response.json())
              .then(resp => {
                this.setState({
                    mealCards: resp.meals
                });
            })
        })
    }

    handleAdd = () => {
        if(this.state.mealCards.some(card => card.id === this.state.id)){
            fetch('https://mysqlcs639.cs.wisc.edu/meals/' + this.state.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': this.props.token
                },
                body: JSON.stringify({ 
                    name: this.state.name,
                    date: this.state.datetime
                })
            })
            .then(response => response.json())
            .then(res => {
                alert(res.message);
                return fetch('https://mysqlcs639.cs.wisc.edu/meals', {
                    method: 'GET',
                    headers: {
                        'x-access-token': this.props.token,
                    }
                })
                .then(response => response.json())
                .then(resp => {
                    this.setState({
                        mealCards: resp.meals
                    });
                })
            });
        } else{
            fetch('https://mysqlcs639.cs.wisc.edu/meals', {
                method: 'POST',
                headers: {
                    'x-access-token': this.props.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    name: this.state.name,
                    date: this.state.datetime
                })
            })
            .then(response => response.json())
            .then(res => {
                alert(res.message);
                return fetch('https://mysqlcs639.cs.wisc.edu/meals', {
                    method: 'GET',
                    headers: {
                        'x-access-token': this.props.token,
                    }
                })
                .then(response => response.json())
                .then(resp => {
                    this.setState({
                        mealCards: resp.meals
                    });
                })
            });
        }
        this.toggleVisible();
    }

    submitAndClear = () => {
        this.setState({
            name: '',
            datetime: new Date()
        })
    }
      
    toggleVisible = () => {
        this.setState({
            visible: !(this.state.visible)
        })
        this.submitAndClear();
    };

    getDate = (date) => {
        return date.getFullYear() + "-" + parseInt(date.getMonth()+1) + "-"+ date.getDate()
    }

    getTime = (time) => {
        return time.getHours() + ":" + parseInt(time.getMinutes()+1) + ":"+ time.getSeconds()
    }

    handleConfirm = (info) => {
        this.setState({
            showPicker:false,
            datetime: info
        });
        
    };
    
    showDatepicker = () => {
        this.setState({
            showPicker: true,
            mode: 'date'
        })
    };
    
    showTimepicker = () => {
        this.setState({
            showPicker: true,
            mode: 'time'
        })
    };

    onCancel = () => {
        this.setState({
            showPicker: false
        })
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{marginTop: 15}}>
                            <MaterialCommunityIcons name="food" size={50} color="#fb5b5a" />
                        </View>
                        <Text style={styles.logo}>Meals</Text>
                    </View>
                    <Text style={styles.plain}>Record your meals below.</Text>

                    <Modal animationType="slide" transparent={true} visible={this.state.visible}>
                        <View style={styles.modalBackground}>
                            <View style={styles.innerModal}>
                                <Text style={styles.title}>Meal Details</Text>
                                <Text style={styles.subtitle}>Meal Name</Text>
                                <View style={styles.inputView} >
                                    <TextInput  
                                    style={styles.inputText}
                                    placeholder="Meal" 
                                    placeholderTextColor="#fe8484"
                                    onChangeText={text => this.setState({name:text})}
                                    value={this.state.name}
                                    />
                                </View>
                                <Text style={styles.subtitle}>Meal Date and Time</Text>
                                <Text style={styles.plain}>{this.getDate(this.state.datetime)} {this.getTime(this.state.datetime)}</Text>
                                <View style={{flex:1, justifyContent: 'center',alignItems: 'center'}}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={styles.btn} onPress={this.showDatepicker}>
                                            <Text style={styles.btnText}>Set Date</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.btn} onPress={this.showTimepicker}>
                                            <Text style={styles.btnText}>Set Time</Text>
                                        </TouchableOpacity>
                                    </View>
                                    
                                    <DateTimePickerModal
                                        isVisible={this.state.showPicker}
                                            mode={this.state.mode}
                                            display="default"
                                            onConfirm={this.handleConfirm}
                                            onCancel={this.onCancel}
                                        />
                                 </View>
                                <Text style={styles.plain}>Looks good! Ready to save your meal?</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={styles.btn} onPress={this.handleAdd} >
                                        <Text style={styles.btnText}>SAVE</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btn} onPress={this.toggleVisible}>
                                        <Text style={styles.btnText}>NEVERMIND</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <TouchableOpacity style={styles.btn} onPress={this.toggleVisible}>
                        <Text style={styles.btnText}>Add Meal</Text>
                    </TouchableOpacity>
                    {this.getAllCards()}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    modalBackground:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    innerModal:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        width: 300,
        height: 500,
    },
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
        margin:15
    },
    title:{
        fontWeight:"bold",
        fontSize:20,
        color:"#fb5b5a",
        marginTop:10,
        marginBottom:10
    },
    subtitle: {
        fontWeight:"bold",
        fontSize:15,
        color:"#003f5c",
        marginBottom:5
    },
    plain:{
        marginTop: 5,
        marginBottom: 5,
        justifyContent:"center",
        color:"#003f5c"
    },
    inputView:{
        width:"70%",
        borderWidth: 1,
        height: 40,
        borderColor:"#fb5b5a",
        marginBottom:10,
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
        height:40,
        alignItems:"center",
        justifyContent:"center",
        margin:10
    },
    btnText:{
        color:"white"
    }
});

export default MealView;