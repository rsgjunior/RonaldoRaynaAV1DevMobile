import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from "react-native";
import timer from "react-native-timer";

// Assets
import Logo from "../assets/Logo_FruitWar.png";
import Kiwi from "../assets/frutas/boa/kiwi_bom.png";
import Limao from "../assets/frutas/boa/limao_bom.png";
import Maca from "../assets/frutas/boa/maca_boa.png";
import Tomate from "../assets/frutas/boa/tomate_bom.png";
import StartButton from "../assets/Button_Start.png"
import HowToPlayButton from "../assets/Button_HowtoPlay.png"

export default function Game() {
  
  const window = Dimensions.get("window");
  const maxHeight = window.height - 100;
  const maxWidth = window.width - 50;
  
  let frutas = [Kiwi, Limao, Maca, Tomate];

  const [minutos, setMinutos] = useState(2)
  const [segundos, setSegundos] = useState(0)
  const [splash, setSplash] = useState(true)
  const [preGame, setPreGame] = useState(false)
  const [terminou, setTerminou] = useState(false)
  const [gameStart, setGameStart] = useState(false)
  const [frutaTop, setFrutaTop] = useState(novaPosicaoVertical())
  const [frutaLeft, setFrutaLeft] = useState(novaPosicaoHorizontal())
  const [score, setScore] = useState(0)
  const [selectedImage, setSelectedImage] = useState(Kiwi)

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

  function novaFrutaAleatoria() {
    return setSelectedImage(frutas[Math.floor((Math.random() * 4))])
  }

  function clicarNaFruta() {
    setScore(score+1)
    novaFrutaAleatoria()
    gerarNovaPosicao()
    //alert(`width: ${maxWidth} height: ${maxHeight}`)
  }

  function terminarJogo() {
    setTerminou(true)
    setGameStart(false)
  }

  function howToPlay() {
    alert("Você deve clicar no máximo de frutas possíveis dentro de 2 minutos! Cada fruta vale 1 ponto")
  }

  function goToGameStart() {
    setSplash(false)
    setGameStart(true)
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

  if(score === 12) {
    terminarJogo()
  }

  const styles = StyleSheet.create({
    fruta: {
      position: "absolute",
      top: frutaTop,
      left: frutaLeft,
      height: 50,
      width: 50
    },
    img: {
      height: 60,
      width: 60
    },
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#613e28"
    },
    containerCentered: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#613e28"
    },
    logo: {
      height: 150,
      width: 300
    },
    scoreText: {
      marginTop: 35,
      fontSize: 30
    },
    textPadrao: {
      color: "white"
    },
    textTitulo: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold"
    },
    button: {
      width: 250,
      height: 95,
      marginTop: 20
    }
  });

  if(splash) {

    return (
      <View style={styles.containerCentered}>
        <Image source={Logo} style={styles.logo}/>
        <Text style={styles.textTitulo}>Bem-Vindo!</Text>
        <Text style={styles.textTitulo}>Grupo do trabalho:</Text>
        <Text style={styles.textPadrao}>Ronaldo Guimarães - 0050017331</Text>
        <Text style={styles.textPadrao}>Rayná Araujo - 0050013521</Text>
        <Text style={styles.textTitulo}>Professor:</Text>
        <Text style={styles.textPadrao}>Alex Vanderlei Salgado</Text>
        <Text style={styles.textPadrao}>Desenvolvimento Mobile</Text>

        <TouchableOpacity onPress={goToGameStart} style={styles.button}>
          <Image source={StartButton} style={styles.button} />
        </TouchableOpacity>

        <TouchableOpacity onPress={howToPlay} style={styles.button}>
          <Image source={HowToPlayButton} style={styles.button} />
        </TouchableOpacity>
      </View>
    );

  }else if(gameStart) {

    return (
      <View style={styles.container}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.scoreText}>Contador: {minutos}:{segundos}</Text>
  
        <TouchableOpacity onPress={clicarNaFruta} style={styles.fruta} >
          <Image source={selectedImage} onPress={clicarNaFruta} style={styles.img} />
        </TouchableOpacity>
  
        <StatusBar style="auto" />
      </View>
    );

  }else if(terminou){

    return (
      <View style={styles.containerCentered}>
        <Text>Fim de Jogo!</Text>
      </View>
    );

  }
}

