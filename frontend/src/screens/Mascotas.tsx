import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Modal, TextInput } from "react-native";
import axios from "axios";
import { MapEntries } from "../types/entries.type";
import Layout from "./Layout";

const Mascotas = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [entries, setEntries] = useState<MapEntries[]>([]);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editFormData, setEditFormData] = useState<MapEntries | null>(null);
  const [name, setName] = useState("");
  const [comments, setComments] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/pets`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  const handleEdit = (entry: MapEntries) => {
    setEditFormData(entry);
    setName(entry.name);
    setComments(entry.comments);
    setIsEditFormVisible(true);

    console.log("ID:", entry._id);
  };

  const handleUpdate = async () => {
    if (!editFormData) return;

    try {
      await axios.put(`http://localhost:3000/pets/upd/${editFormData._id}`, {
        name,
        comments,
      });

      setIsEditFormVisible(false);
      fetchEntries(); // Refresh the entries after updating
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  const handleDelete = async (entryId: string) => {
    try {
      await axios.delete(`http://localhost:3000/pets/del/${entryId}`);
      fetchEntries(); // Refresh the entries after deleting
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const filteredEntries = entries.filter((entry) =>
    entry.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Mascotas Cargadas</Text>
        <TextInput
          placeholder="Buscar"
          onChangeText={(text) => setSearchQuery(text)}
          style={styles.searchInput}
        />
        <ScrollView>
          {filteredEntries.map((entry: MapEntries) => (
            <View key={entry._id} style={styles.entry}>
              <Text style={styles.name}>{entry.name}</Text>
              <Text style={styles.comments}>{entry.comments}</Text>
              <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={() => handleEdit(entry)}>
                  <Text style={styles.buttonText}>Editar</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => handleDelete(entry._id)}>
                  <Text style={styles.buttonText}>Borrar</Text>
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
                multiline={true}
                numberOfLines={4}
                style={[styles.input, styles.multilineInput]}
              />
              <Pressable style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Actualizar</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={() => setIsEditFormVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </Pressable>
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
    padding: 25,
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
    margin: 5,
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
  multilineInput: {
    height: 100,
  },
  searchInput: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    margin:10
  },
});

export default Mascotas;
