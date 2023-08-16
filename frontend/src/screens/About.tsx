import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Layout from "./Layout";

const About = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>About Pet Weight Tracker</Text>
        <Text style={styles.description}>
          Pet Weight Tracker is an app designed to help pet owners keep track of their
          pets' weight over time. It allows you to create and manage entries for each
          pet, along with comments about their progress.
        </Text>
        <Text style={styles.description}>
          With Pet Weight Tracker, you can easily record your pets' weight, add comments,
          and even edit or delete entries as needed. This app is a convenient tool for
          monitoring your pets' health and maintaining their well-being.
        </Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
});

export default About;
