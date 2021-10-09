import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from "react-native";
import timer from "react-native-timer";

// Assets
import TestImage from "../assets/pngegg.png";

export default function Game() {
  
  const window = Dimensions.get("window");
  const maxHeight = window.height - 50;
  const maxWidth = window.width - 50;

  const [minutos, setMinutos] = useState(2)
  const [segundos, setSegundos] = useState(0)
  const [frutaTop, setFrutaTop] = useState(novaPosicaoVertical())
  const [frutaLeft, setFrutaLeft] = useState(novaPosicaoHorizontal())
  const [score, setScore] = useState(0)
  const [terminou, setTerminou] = useState(false)

  function novaPosicaoHorizontal() {
    return Math.random() * (maxWidth - 50) + 50
  }

  function novaPosicaoVertical() {
    return Math.random() * (maxHeight - 50) + 50;
  }

  function gerarNovaPosicao() {
    setFrutaTop(novaPosicaoVertical())
    setFrutaLeft(novaPosicaoHorizontal())
    console.log(`frutaTop: ${frutaTop}`)
    console.log(`frutaLeft: ${frutaLeft}`)
  }

  function clicarNaFruta() {
    gerarNovaPosicao()
    setScore(score+1)
    //alert(`width: ${maxWidth} height: ${maxHeight}`)
  }

  function terminarJogo() {
    setTerminou(true)
  }
    
  function atualizarContador() {
    
    if(minutos === 0 && segundos === 0) {
      timer.clearInterval(this, 'atualizarContador')
      return terminarJogo()
    } 

    if(minutos > 0 && segundos === 0) {
      setMinutos(minutos-1)
      setSegundos(59)
      return
    }

    setSegundos(segundos-1)

  }

  timer.setInterval(this, 'atualizarContador', atualizarContador, 1000)

  const styles = StyleSheet.create({
    fruta: {
      position: "absolute",
      top: frutaTop,
      left: frutaLeft,
      height: 50,
      width: 50
    },
    img: {
      height: 50,
      width: 50
    },
    container: {
      flex: 1,
      alignItems: "center",
    },
    scoreText: {
      marginTop: 35,
      fontSize: 30
    }
  });

  if(terminou) {

    return (
      <View>
        <Text>Fim de Jogo!</Text>
      </View>
    );

  }else {

    return (
      <View style={styles.container}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.scoreText}>Contador: {minutos}:{segundos}</Text>
  
        <TouchableOpacity onPress={clicarNaFruta} style={styles.fruta} >
          <Image source={TestImage} onPress={clicarNaFruta} style={styles.img} />
        </TouchableOpacity>
  
        <StatusBar style="auto" />
      </View>
    );
  }
}

