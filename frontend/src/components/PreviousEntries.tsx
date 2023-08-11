import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { MapEntries } from "../types/entries.type";

// Import the mock data
import mockEntries from "../db/data.json";

const PreviousEntries = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previous Entries</Text>
      <Button title="Show Entries" onPress={handleClick} />
      {isVisible && (
        <ScrollView>
          {mockEntries.map((entry: MapEntries) => (
            <View key={entry.id} style={styles.entry}>
              <Text style={styles.name}>{entry.name}</Text>
              <Text style={styles.weight}>{entry.weight} lbs</Text>
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
    border: 1,
    borderRadius: 5,
  },
  name: {
    fontSize: 18,
  },
  weight: {
    fontSize: 16,
  },
});

export default PreviousEntries;