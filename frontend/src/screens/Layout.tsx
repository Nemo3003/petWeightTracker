// src/components/Layout.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from '../navigation/Navbar';
import Footer from '../navigation/Footer';

const Layout = ({ children }:any) => {
  return (
    <View style={styles.container}>
      <Navbar />
      {children}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Layout;
