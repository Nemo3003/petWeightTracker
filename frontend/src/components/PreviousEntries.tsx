import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import axios from "axios";
import { MONGODB_URI } from "@env";
import { MapEntries } from "../types/entries.type";

const PreviousEntries = ({ updateEntries }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [entries, setEntries] = useState<MapEntries[]>([]);

  useEffect(() => {
    fetchEntries();
  }, [updateEntries]); // Trigger the effect when updateEntries changes

  const fetchEntries = async () => {
    try {
      // Send a GET request to fetch previous entries from the server
      const response = await axios.get(`https://petweighttracker-server.onrender.com/pets`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });

      // Update the entries state with the received data
      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previous Entries</Text>
      <Button title="Show Entries" onPress={handleClick} />
      {isVisible && (
        <ScrollView>
          {entries.map((entry: MapEntries) => (
            <View key={entry.id} style={styles.entry}>
              <Text style={styles.name}>{entry.name}</Text>
              <Text style={styles.comments}>{entry.comments}</Text>
              
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  entry: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  name: {
    fontSize: 18,
  },
  comments: {
    fontSize: 16,
  },
});

export default PreviousEntries;
