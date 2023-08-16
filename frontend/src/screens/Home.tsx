import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import axios from 'axios';
import { MONGODB_URI } from "@env";
import { Entries } from "../types/entries.type";
import PreviousEntries from "../components/PreviousEntries";

const Home = () => {
  const urlDB = MONGODB_URI;
  const [petName, setPetName] = useState("");
  const [comments, setComments] = useState(""); // State for comments

  const handleSubmit = async () => {
    const newPet: Entries = {
      name: petName,
      comments: comments,
    };

    try {
      // Send a POST request to your server
      const response = await axios.post(`https://petweighttracker-server.onrender.com/pets/create`, newPet, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });

      // Handle success or show a message to the user
      console.log('Pet created:', response.data);
    } catch (error) {
      // Handle error or show an error message to the user
      console.error('Error creating pet:', error);
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
        placeholder="Añadir comentario"
        onChangeText={(text) => setComments(text)}
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
    margin: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});

export default Home;
