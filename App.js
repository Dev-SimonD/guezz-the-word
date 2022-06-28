import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable, Alert, TouchableOpacity, TextInput } from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { Audio } from 'expo-av';

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
    await sound.playAsync();
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
  /* React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
          sound.setStatusAsync({ isLooping: true }); }
          
      : undefined;
  }, [sound]); */
 
const randomWordURL = "https://random-words-api.vercel.app/word";
const [word,setWord] = useState({})
const [wordShow,setWordShow] = useState(false)
const [clues,setClues] = useState()
const [name, setName] = useState("");
const [change, setChange] = useState("");



useEffect( () => {
  getRandomWord()
  playSound()
},[])

const getRandomWord = async () => { 
  const response = await fetch(randomWordURL)
  const data = await response.json()
  setWord({word: data[0].word, definition: data[0].definition, letters: data[0].word.length})
  const myArr = Array.from(data[0].word)
   setClues(myArr)
  setWordShow(false)
  setChange("")
  setName("")
  }

  const startGame = () => {
    setStarted(true)
  }
 
  const setWordShowFN = () => {
    setWordShow(!wordShow)
  }
  
  const getClue = () => {
    
   const randomWordIndex = Math.floor(Math.random() * word.letters)
   const letter = word.word.charAt(randomWordIndex);
   const myArr = Array.from(word.word)
   setClues(myArr)
   console.log(randomWordIndex, letter, myArr)
  }


 const onSubmit2 = () => {
console.log("word is: ",word.word)
console.log("change is: ",change)
if(change){ 
if(change == word.word)
  {
    console.log("right")
    getRandomWord()
  }
  else{
    console.log("wrong")
  }
}
 setChange("")
 }

  return (
    <View style={styles.container}>
      {!started ? (
      <View style={{alignItems: "center",
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
    <View style={styles.container}>
    <View style={styles.text}>
      <Text>Definition: {word.definition}</Text>
      <Text>Letters: {word.letters}</Text> 
      <Text>Word: {wordShow ? word.word : ""}</Text>
      <Text>You guessed: {name ? name : ""}</Text>
      <View style={{flexDirection: "row"}}> 
      {/* {clues ? (clues.map(a=>{
       return <Text key={a}>_</Text>
     })):(<Text>a</Text>)} */}
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
    <View /* style={styles.buttons} */>
      <Button style={styles.button}
       onPress={getRandomWord}
        title="new word" />
      <Button style={styles.button}
       onPress={setWordShowFN}
        title={wordShow ? "hidee" : "showe"} />
      {/* <Button style={styles.button}
       title="clue" /> */}
       <Pressable 
        onPress={getClue}
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
       {/* <Button title="Play Sound" onPress={playSound} /> */}
       <Button title={!muted ? "mute" : "play"} onPress={muteSound} />
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
      </View>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEEDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    /* flex: 0.3, */
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 40,
  },
  buttons: {
   flexDirection: "row",
   padding: 10,
    /* alignItems: 'center',
    justifyContent: 'center', */
  },
   button: {
   
    margin: 50,
    paddingHorizontal: 48,
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

});

export default App;