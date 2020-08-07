import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// props store attributes /pass attributes from parent to child component
const SingleNodeSummaryComponent = (props) => {
    console.log(props)
    return <View  backgroundColor={randomBackground()} style={styles.textViewStyle}>
        <Text> {props.myNoteDate} </Text>
        <Text style={styles.textProperties}> {props.myNoteText}</Text>
    </View>
}

//random background function to give random colors dynamically to different items
const randomBackground = () => {
    var red = Math.floor(Math.random() * 400) // 123
    var green = Math.floor(Math.random() * 400) // 45
    var blue = Math.floor(Math.random() * 400) // 43

    // String Interpolation
    // In a string -> isnert a value of some other data type
    // use write string :""  '' 
    // use back ticks to use string inyterpolation in js ``

    return `rgb(${red}, ${green}, ${blue})` // rgb(123, 45, 43)
}

const styles = StyleSheet.create({
    dateProperties:{
        fontSize:15,
        //paddingRight:50
    },
    textProperties: {
        fontSize: 20
        //paddingLeft:5
    },
    textViewStyle: {
        height: 150,
        width: 150,
        margin: 10,
        //backgroundColor: 'rgb(100, 100, 100)',
        borderRadius: 10,
        padding: 5,
        //alignItems: "center",
        //justifyContent: "center"
        
    }
});


export default SingleNodeSummaryComponent;

