import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from "react-native";

// Assets
import TestImage from "../assets/pngegg.png";

export default function Fruta() {

	const window = Dimensions.get("window");
  const maxHeight = window.height;
  const maxWidth = window.width;

	const [frutaTop, setFrutaTop] = useState(10)
	const [frutaLeft, setFrutaLeft] = useState(10)
	const [showFruta, setShowFruta] = useState(true)

  function gerarNovaPosicao() {
		setFrutaTop(Math.random() * (maxHeight - 50) + 50)
		setFrutaLeft(Math.random() * (maxWidth - 50) + 50)
		console.log(`frutaTop: ${frutaTop}`)
		console.log(`frutaLeft: ${frutaLeft}`)
	}

	function clicarNaFruta() {
		setShowFruta(false);
		gerarNovaPosicao()
		setShowFruta(true);
	}

	const styles = StyleSheet.create({
		fruta: {
			position: "absolute",
			top: frutaTop,
			left: 350,
			height: 50,
			width: 50
		},
		img: {
			height: 50,
			width: 50
		},
	});

	if(showFruta) {
		return (
			<TouchableOpacity onPress={clicarNaFruta} style={styles.fruta} >
				<Image source={TestImage} onPress={clicarNaFruta} style={styles.img} />
			</TouchableOpacity>
		)
	}
}


