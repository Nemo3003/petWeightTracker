import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Modal, TextInput, Button } from "react-native";
import axios from "axios";
import { MONGODB_URI } from "@env";
import { MapEntries } from "../types/entries.type";
import Layout from "./Layout";

const Mascotas = ({ updateEntries }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [entries, setEntries] = useState<MapEntries[]>([]);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editFormData, setEditFormData] = useState<MapEntries | null>(null);
  const [name, setName] = useState("");
  const [comments, setComments] = useState("");

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
  
  const handleUpdate =async (entry: MapEntries) => {
    setEditFormData(entry);
    setName(entry.name); // Pre-fill the name field with the current name
    setComments(entry.comments); // Pre-fill the comments field with the current comments
    setIsEditFormVisible(true);
    const id = entry.id; // Get the id of the entry
  
    try {
      await axios.put(
        `https://petweighttracker-server.onrender.com/pets/upd/${id}`,
        {
          name,
          comments,
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
  
      // Fetch updated entries after successful update
      fetchEntries();
      closeEditForm();
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  const closeEditForm = () => {
    setIsEditFormVisible(false);
    setEditFormData(null);
    setName("");
    setComments("");
  };

  const handleSubmitUpdate = async () => {
    try {
      await axios.put(
        `https://petweighttracker-server.onrender.com/pets/upd/${editFormData?.id}`,
        {
          name,
          comments,
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      );

      // Fetch updated entries after successful update
      fetchEntries();
      closeEditForm();
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
                <Pressable style={styles.button} onPress={() => handleUpdate(entry)}>
                    <Text style={styles.buttonText}>Update</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
        {isEditFormVisible && (
            <Modal visible={isEditFormVisible} animationType="slide">
                <View style={styles.editFormContainer}>
                <Text>Edit Entry</Text>
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Comments"
                    value={comments}
                    onChangeText={setComments}
                    style={styles.input}
                />
                <Button title="Update" onPress={handleSubmitUpdate} />
                <Button title="Cancel" onPress={closeEditForm} />
                </View>
            </Modal>
        )}
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
  editFormContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default Mascotas;
