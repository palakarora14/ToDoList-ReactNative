
import React, {useState} from 'react';
import {StyleSheet, TextInput, Button, View} from 'react-native';
import firebase from 'firebase';


const CreateNoteComponent = (props) => {
    console.log(props)

    //1.creating state:
    // [current state(state variable),function to update state] = useState(initial value) -> [react Hoops]
    // F(newvalue)
    const [newNoteText, setNewNoteText] = useState('')

    return <View >
    <TextInput 
        style={styles.textInputStyles}
        autoCorrect={false}
        autoCapitalize="none"
        multiline={true}
        value={newNoteText}
        onChangeText={(currentText) => setNewNoteText(currentText)}
        />
        <Button style={styles.buttonProperties}
            title={"Create Note"}
            
            //function to change state(initial state)
            onPress={() => {
                if(newNoteText != ''){
                //Notes are loaded when we click a button
                //props.onCreateButtonPress(newNoteText)
                //Store new nodes to firebase
                //new nodes will be added when we firebase DB is loaded
                //  /user/{id}
                const loggedInUserId = firebase.auth().currentUser.uid
                const pathForData = `/users/${loggedInUserId}/`

                firebase.database()
                    .ref(pathForData)
                    .push({
                        'date': new Date().toDateString(),
                        'text': newNoteText
                    })
                setNewNoteText('')
                }
            }}
        />
        </View>
}

const styles = StyleSheet.create({
    textInputStyles: {
        borderWidth: 2,
        width: 320,
        height: 140,
        borderRadius: 10,
        marginBottom:5
    },
    buttonProperties:{
        width :320,
        borderRadius :20
    }
});

export default CreateNoteComponent;


//1. As soon as the new node is created store it in firebase DB
//2. As soon as a new node is added in firebase DB update the list of nodes in my view
