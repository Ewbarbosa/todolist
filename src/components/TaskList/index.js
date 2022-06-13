import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'

export default function TaskList({data, TaskDelete}){
    return(

        <Animatable.View style={styles.container}
        animation='bounceIn'
        >
            <TouchableOpacity onPress={() => TaskDelete(data)}>
                <Ionicons name='md-checkmark-circle' size={30} color='#121212'/>
            </TouchableOpacity>

            <View>
                <Text style={styles.txt}>{data.task}</Text>
            </View>

        </Animatable.View>   
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 7,
        elevation: 1.5,
        shadowColor: '#00ff00',
        shadowOpacity: 0.2,
        textShadowOffset: {
            width: 1,
            height: 3
        }
    },
    txt:{
        color: '#000000',
        fontSize: 20,
        paddingLeft: 10,
        paddingRight: 15
    }
})