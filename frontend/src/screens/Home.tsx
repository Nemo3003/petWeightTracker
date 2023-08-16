import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import Footer from "../navigation/Footer";
import Navbar from "../navigation/Footer"; 
import CreateEntries from "../components/CreateEntries";
import Layout from "./Layout";
const Home = () => {


  return (
    <Layout >
    <View style={styles.container}>
      <CreateEntries/>
    </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  }
})


export default Home;
