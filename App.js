import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable, Alert, TouchableOpacity, TextInput } from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { Audio } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign, Entypo } from '@expo/vector-icons'; 

/* import Sound from "react-native-sound";
 */
const App = () => {


  const [sound, setSound] = React.useState();
  const [muted, setMuted] = useState(false)
  const [started, setStarted] = useState(false)

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('./assets/Hello.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');

    /* COMMENTED OUT PLAYING SOUND */
    
   /*  await sound.playAsync(); */
  sound.setStatusAsync({ isLooping: true }) }

  const muteSound = () => {
    if(!muted){
      sound.stopAsync()
      setMuted(true)
      return
    }
    if(muted){
      playSound()
      setMuted(false)
      return
    }
    
  }
  
const randomWordURL = "https://random-words-api.vercel.app/word";
const [word,setWord] = useState({})
const [wordShow,setWordShow] = useState(false)
const [clues,setClues] = useState()
const [name, setName] = useState("");
const [change, setChange] = useState("");
const [randomized, setRandomized] = useState("");
const [randomizedShow, setRandomizedShow] = useState(false);
const [score, setScore] = useState(0);
const [lives, setLives] = useState(3);
const [newGame, setNewGame] = useState(true);



useEffect( () => {
  getRandomWord()
  playSound()
},[])

const getRandomWord = async () => { 
  let tempLives = lives;
  if(tempLives<2)
{
  Alert.alert("game over")
  setLives(3)
  setScore(0)
  setStarted(false)
}
  const response = await fetch(randomWordURL)
  const data = await response.json()
  setWord({word: data[0].word, definition: data[0].definition, letters: data[0].word.length})
  const myArr = Array.from(data[0].word)
   setClues(myArr)
  setWordShow(false)
  setChange("")
  setName("")
  let randomizedWord = Array.from(data[0].word).sort( () => .5 - Math.random() );
setRandomized(randomizedWord)
  console.log(myArr)
  setRandomizedShow(false)
  
  }

  const startGame = () => {
    setStarted(true)
  }
 
  const setWordShowFN = () => {
    setWordShow(!wordShow)
  }
  
  
 const onSubmit2 = () => {
if(lives<2)
{
  alert("game over")
}

console.log("word is: ",word.word)
console.log("change is: ",change)
let tempScore = score;
let tempLives = lives;
if(change){ 
if(change.toLowerCase() == word.word.toLowerCase())
  {
    console.log("right")
    if(randomizedShow)
    {
      
      tempScore+=word.letters*5
      /* let tempScore  = score+=word.letters*10 */
      setScore(tempScore)
    }
    else{
      
      tempScore+=word.letters*10
     setScore(tempScore)
      
    }
    getRandomWord()
  }
  else{
    console.log("wrong")
    tempLives-=1
    setLives(tempLives)
    getRandomWord()
    /* if(tempLives<1)
{
  Alert.alert("game over")
  setLives(3)
  setScore(0)
  setStarted(false)
} */


  }
}
 setChange("")
 }

  return (
    <View style={styles.container}>
      <Entypo name={!muted? "sound" : "sound-mute"} onPress={() => muteSound()} style={{position: "absolute", top: 50, right: 30, zIndex: 100}} size={24} color="#2196f3" />  
     
      {/* This is Openint Title wth Start button */}
     
      {!started ? (
        <View style={{flex: 1, alignItems: "center",
        justifyContent: "center",}}>
        <Text style={styles.mainTitle}>Guezz the Word!</Text>
        <TouchableOpacity
         onPress={startGame}
         style={{backgroundColor: "#2196f3",
         marginTop: 30,
         paddingVertical: 10,
         borderRadius: 4,
         width: 200,    
        }}>
       <Text style={{color:"white", textAlign:"center"}}>START GAME</Text>
          </TouchableOpacity></View>):(
    
    
    /* this is the game page */
    <>
    <View style={styles.text}>
    {/* <AntDesign name="arrowleft" style={{position: "absolute", top: 10}} size={24} color="black" /> */}  

        <Text style={styles.score}>Score: {score}</Text>
        <Text style={styles.lives}>Lives: {lives}</Text>
        <Text style={styles.points}>for {!randomizedShow ? word.letters*10 : word.letters*5 } points</Text>
        <Text>Definition: {word.definition}</Text>
      <Text>Letters: {word.letters}</Text> 
      {/* <Text>Word: {wordShow ? word.word : ""}</Text> */}
      {/* <Text>You guessed: {name ? name : ""}</Text> */}
      <View style={{flexDirection: "row"}}> 
      {randomizedShow && (
      <Text>Clue: {randomized}</Text>)}
     </View>
     <TextInput
        style={styles.input} 
        placeholder="Guess the word!"
        /* onSubmitEditing={
          (value) => setName(value.nativeEvent.text)
        } */
        onChangeText={(value) => setChange(value)}
        onSubmitEditing={ (value)=>  {setName(value.nativeEvent.text) , onSubmit2()}}
        value={change}
                />
    </View>
    <View style={styles.buttons}>
      <Button style={styles.button}
       onPress={()=> {getRandomWord(),setLives(lives-1)}}
        title="New Word"
        disabled={lives<2 ? true: false} />
      <Button style={styles.button}
       onPress={setWordShowFN}
        title={wordShow ? "hide" : "show"} />
      {/* <Button style={styles.button}
       title="clue" /> */}
       <Pressable 
        onPress={() => setRandomizedShow(true)}
        style={{backgroundColor: "#2196f3",
         margin: 10,
         paddingVertical: 10,
        borderRadius: 4,
       alignItems: "center",
       justifyContent: "center"
       }}>
        <Text style={{color:"white"}}>
          CLUE
        </Text>
       </Pressable>
      
    {/*  <TouchableOpacity 
        onPress={() => Alert.alert('Simple Button pressed')}
        style={{backgroundColor: "#2196f3",
         margin: 10,
         paddingVertical: 10,
        borderRadius: 4,
       alignItems: "center",
       justifyContent: "center"
       }}>
        <Text style={{color:"white", fontFamily: "fantasy"}}>
          Clue
        </Text>
       </TouchableOpacity> */}
      </View>
      <StatusBar style="auto" />
      </>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEEDD',
    padding: 30,
   /*  alignItems: 'center', */
    /* justifyContent: 'center', */
  },
  text: {
    /* flex: 1, */
    /* alignItems: 'center', */
    justifyContent: 'center',
  },
  mainTitle: {
    /* flex: 0.3, */
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 40,
  },
  buttons: {
   /* flex: 2, */ 
   flexDirection: "row",
   padding: 10,
    /* alignItems: 'center',
    justifyContent: 'center', */
  },
   button: {
   
    margin: 5,
    paddingHorizontal: 10,
     /* alignItems: 'center',
     justifyContent: 'center', */
   },
   input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
    
    /* position: "fixed", */
   /*  top: 30, */
  },
  lives: {
    fontSize: 20,
    fontWeight: "bold",
    /* position: "fixed", */
    /* top: 60, */
  },

});

export default App;