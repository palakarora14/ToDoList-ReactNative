
import React ,{Component, useState,useEffect} from 'react';
import  {Text, FlatList, View, StyleSheet, TextInput,Button}  from 'react-native';
import SingleNodeSummaryComponent from './SingleNodeSummaryComponent';
import CreateNoteComponent from './CreateNoteComponent';
import firebase from 'firebase'
import _ from 'lodash'

// a react component is nothing but a javascript function

const NotesScreenComponent = () => {

    // var data = [
    //     {"date": "24-10-1998", "text": "I am going to Dubai"},
    //     {"date": "24-02-2002", "text": "I have to bring vegatbles"},
    //     {"date" :"14-01-1999", "text": "It's my Birthday"},
    //     {"date" :"14-01-1997", "text": "It's my Birthday"},
    //     {"date" :"14-01-1996", "text": "It's my Birthday"},
    //     {"date" :"14-01-1995", "text": "It's my Birthday"}
    // ]

    const [data, setData] = useState([]);
    //function to add new date
    //...data = spread operator
    // const addNewnote
    const addNewNote = (text) => {
        if(text.length >0){
        setData([{"text": text, "date": new Date()},...data])
        }
        // A= ['a', 'b', 'c', 'd'] -> ...A -> 'a', 'b', 'c', 'd'
    }


     //A function can return only single thing , 
    //so View tag is used to group multiple components
    // to write javascript inside jsx, i need to enclose javascript code in {}
    // {name: 'abc', 'age': 12} -> {name} -> {name: 'abc'}
    //  index , item 

    //  /users/{id}/
    const loggedInUserId = firebase.auth().currentUser.uid

    //data of the current loggedIn user
    useEffect(() =>{ firebase.database().ref(`/users/${loggedInUserId}/`)
    //value is the variable firebase is keeping a watch on the above reference
    //value on the reference change it will notify and run the below function
        .on('value',(completeNewData) => {
            //data in firebase is an object so we need to change it to list
            console.log(completeNewData)
            
            // Object {
//     "-MD_0ehQ55AEBBlQzmRJ": Object {
//       "date": "Fri Jul 31 2020",
//       "text": "yooooo",
//     },
//     "-MD_0sYGRokDygxRNusJ": Object {
//       "date": "Fri Jul 31 2020",
//       "text": "another note",
//     },
//   }

// [
    // {
        //       "date": "Fri Jul 31 2020",
        //       "text": "yooooo",
        //     },
        // {
            //       "date": "Fri Jul 31 2020",
            //       "text": "another note",
            //     },
// ]

            //we give a fun. that will be called for every item in the call one by one(key,value) -> so we'll return the value
            const newDataList =_.map(completeNewData.val(),(value,key) => {
                console.log("Value",value)
                console.log("Key",key)
                return{...value}
            })
            console.log(newDataList)
            setData(newDataList.reverse())
        })},[])
        

    return <View style={styles.viewProperties}>

        <View style={styles.viewProperties}>
        <Button 
            title={"Log Out"}
            onPress={() => firebase.auth().signOut()}
        />
        </View>
        

    <CreateNoteComponent onCreateButtonPress={
            (text) => addNewNote(text) 
        }/>

        <FlatList 
            showsVerticalScrollIndicator={false}
            //horizontal={true}
            style={styles.listProperties}
            data={data}
            //every item in the list is given a key/identifier(always a string and unique) to identify the item
            //key extract to extract a key is a arrow function for an item parameter
            keyExtractor={(item, index) => {
                return index.toString()
            }
        }
            numColumns={2}

            //arrow function , with dereferencing of only item
            renderItem={({item}) => {
                // console.log(index, item)
                return <SingleNodeSummaryComponent myNoteDate={item.date} 
                myNoteText={item.text}/>
            }
        }     
        />
    </View>

}

//to create css and assign to style variable
const styles = StyleSheet.create({
    viewProperties : {
        marginTop: 50,
        marginBottom :10
    },
    textInputstyle :{
        borderWidth: 2,
        marginLeft: 10,
        width :320,
        height: 140,
        borderRadius: 10,
        padding: 10
    }
    // listProperties : {
    //     marginRight: 70
    // },
});

//to display from App.js
export default NotesScreenComponent;

// Javascript object JSON - JavaScript Object Notation


// {
//     'name': 'Naman',
//     'age': 'blah',
//     'hobby': 'meh',
//     'friends': [
//         "A", "B", "C"
//     ],
//     'scbool' : {
//         'name': 'BHS',
//         'location': 'Rajasthan'
//     },
//     'fav_city': 'abc'

// }