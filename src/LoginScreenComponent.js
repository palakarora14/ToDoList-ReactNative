import React,{useState} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import firebase from 'firebase';

const LoginScreenComponent = () => {

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

    return <View>
        <Text> Email : </Text>
        <TextInput style={styles.textInputStyle}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(currentText)=>setEmail(currentText)}
        />

        <Text>Password :</Text>
        <TextInput style={styles.textInputStyle}
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={(currentText)=>setPassword(currentText)}
        />

        <View style={styles.buttonStyle}>
        <Button  
        title={"LogIn"}
        onPress={() => firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("Login Successful")
            })
            .catch(() => {
                console.log("Some error occured !")
            })
        }
        />
        </View>
        <View style={styles.buttonStyle}>
        <Button 
        title={"SignUp"}
        onPress={()=>{
            firebase.auth()
            //a promise
            .createUserWithEmailAndPassword(email,password)
            //if true
            .then(() => {
                setEmail("")
                setPassword("")
                console.log("SignUp Successful")
            })
            //if false
            .catch(()=> console.log("Some error occured !"))
        }}
        />
        </View>
        
    </View>
}

const styles = StyleSheet.create({
    textInputStyle:{
        width: 300,
        borderWidth :3,
        margin: 10,
        padding: 10,
        borderRadius: 3
    },
    buttonStyle:{
        marginBottom: 20
    }
});


export default LoginScreenComponent;