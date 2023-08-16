import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import axios from "axios";
import { MONGODB_URI } from "@env";
import { MapEntries } from "../types/entries.type";
import Layout from "./Layout";

const Mascotas = ({ updateEntries }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [entries, setEntries] = useState<MapEntries[]>([]);

  useEffect(() => {
    fetchEntries();
  }, [updateEntries]);

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`https://petweighttracker-server.onrender.com/pets`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://petweighttracker-server.onrender.com/pets/del/${id}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      updateEntries();
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      await axios.put(`https://petweighttracker-server.onrender.com/pets/upd/${id}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      updateEntries();
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Mascotas Cargadas</Text>
        <ScrollView>
          {entries.map((entry: MapEntries) => (
            <View key={entry.id} style={styles.entry}>
              <Text style={styles.name}>{entry.name}</Text>
              <Text style={styles.comments}>{entry.comments}</Text>
              <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={() => handleDelete(entry.id)}>
                  <Text style={styles.buttonText}>Delete</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => handleUpdate(entry.id)}>
                  <Text style={styles.buttonText}>Update</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </Layout>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Mascotas;
