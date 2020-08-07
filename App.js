import { StatusBar } from 'expo-status-bar';
import React,{useState}from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';
import NotesScreenComponent from './src/NotesScreenComponent';
import LoginScreenComponent from './src/LoginScreenComponent';
import CreateNoteComponent from './src/CreateNoteComponent';
import { FlatList } from 'react-native-gesture-handler';
import SingleNodeSummaryComponent from './src/SingleNodeSummaryComponent';

export default function App() {

  const [userLoggedIn, setUserLoggedIn] = useState(false)

  if(firebase.apps.length === 0){
    var firebaseConfig = {
      apiKey: "AIzaSyDM-sMEecj9vtUdV5l2y4ZMdM3imZGiE6s",
      authDomain: "todo-reactnative-fbcdd.firebaseapp.com",
      databaseURL: "https://todo-reactnative-fbcdd.firebaseio.com",
      projectId: "todo-reactnative-fbcdd",
      storageBucket: "todo-reactnative-fbcdd.appspot.com",
      messagingSenderId: "405538110965",
      appId: "1:405538110965:web:603f539f03b583a22374bc"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
  
//if user logIn or LogOut
firebase.auth().onAuthStateChanged((user) => {
  if(user === null) {
    setUserLoggedIn(false)
  } else {
    setUserLoggedIn(true)
  }
});

if(userLoggedIn) {
  return (
    <View style={styles.container}>
      <NotesScreenComponent/>
      {/* <LoginScreenComponent/> */}
    </View>
  );
} else {
  return (
    <View style={styles.container}>
      {/* <NotesScreenComponent/> */}
      <LoginScreenComponent/>
    </View>
  );
}

  // return (
  //   // <View style={styles.container}>
  //   //   <Text>Palak arora</Text>
  //   //   <Text> I m a beginner</Text>
  //   //   <StatusBar style="auto" />
  //   // </View>
  //   <View style={styles.container}>
  //     {/* <NotesScreencomponent/> */}
  //     <LoginScreenComponent/>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


//           NotesScreenComponent
//           |                 |
// CreateNoteComponent       FlatList
//   (NewNoteText)
//         |                   |
//       View                  SNSC - - - - - - SNSC(SingleNodeSummaryComponent)
//       |   |                   |
// TextInput Button             View
//                              |  |
//                            Text Text



//React navigation : https://reactnavigation.org/docs/navigating
//FleaxBox : https://reactnative.dev/docs/flexbox
//Generating Android APK in React Native :https://docs.google.com/document/d/1nyn4n5bMKH7RJ2iBxNN35NayVSiu5LZxfh76m2iPjNQ/edit
//namanbhalla1998@gmail.com