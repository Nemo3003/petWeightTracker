import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import axios from 'axios';
import { Entries } from "../types/entries.type";
import PreviousEntries from "./PreviousEntries";

const CreateEntries = () => {
  const [petName, setPetName] = useState("");
  const [comments, setComments] = useState("");
  const [updateEntries, setUpdateEntries] = useState(false); // State for triggering update

  const handleSubmit = async () => {
    const newPet: Entries = {
      name: petName,
      comments: comments,
    };

    try {
      // Send a POST request to your server
      const response = await axios.post(`http://localhost:3000/pets/create`, newPet, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });

      // Handle success or show a message to the user
      console.log('Pet created:', response.data);

      // Trigger the update of PreviousEntries component
      setUpdateEntries(true);

      // Clear the input fields after successful submission
      setPetName("");
      setComments("");
    } catch (error) {
      // Handle error or show an error message to the user
      console.error('Error creating pet:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Seguimiento de peso de mascotas</Text>
      <TextInput
        placeholder="Nombre de Mascota"
        value={petName}
        onChangeText={(text) => setPetName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Añadir comentario"
        value={comments}
        onChangeText={(text) => setComments(text)}
        multiline={true} // Allow multiple lines of input
        numberOfLines={4} // Set the initial number of visible lines
        style={[styles.input, styles.multilineInput]} // Apply additional styling for multiline input
      />
      <Button title="Cargar" onPress={handleSubmit} />
      <PreviousEntries updateEntries={updateEntries} />
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
    fontSize: 18,
  },
  multilineInput: {
    height: 100, // Adjust this value to control the height of the multiline input
  },
  mainText:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default CreateEntries;
