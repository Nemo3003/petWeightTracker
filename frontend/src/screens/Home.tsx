import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import axios from 'axios';
import {MONGODB_URI} from "@env";
import { Entries } from "../types/entries.type";
import PreviousEntries from "../components/PreviousEntries";

const Home = () => {
  const urlDB = MONGODB_URI
  const [petName, setPetName] = useState("");
  const [petWeight, setPetWeight] = useState(0);

  const handleSubmit = () => {
    const newPet: Entries = {
      name: petName,
      weight: petWeight,
    };

    // TODO: Save the pet to the database
  };

  const updatePetWeight = (text: string | number) => {
    if (typeof text === "number") {
      setPetWeight(Number(text));
    }
  };

  return (
    <View style={styles.container}>
      <Text>Seguimiento de peso de mascotas</Text>
      <TextInput
        placeholder="Nombre de Mascota"
        onChangeText={(text) => setPetName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Peso de Mascota (kg)"
        onChangeText={(text) => updatePetWeight(text)}
        style={styles.input}
      />
      <Button title="Submit" onPress={handleSubmit} />
      <PreviousEntries />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: "100%",
  },
  input: {
    width: 350,
    height: 45,
    margin:10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});

export default Home;