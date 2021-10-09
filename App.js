import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Componentes
import Game from "./components/Game";

export default function App() {
  const [gameStart, setGameStart] = useState(true);

  if (gameStart) {
    return <Game />;
  } else {
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
