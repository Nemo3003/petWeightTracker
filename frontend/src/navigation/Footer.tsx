import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.linkTextTwo}>
      <TouchableOpacity style={styles.link}>
        <Text style={styles.linkText}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link}>
        <Text style={styles.linkText}>Terms of Service</Text>
      </TouchableOpacity>
      </View>
      <Text style={styles.copyRight}>&copy; 2023 Pet Weight Tracker. All rights reserved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    bottom:0
  },
  linkTextTwo :{
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  link: {
    paddingHorizontal: 2,
  },
  linkText: {
    color: '#333',
    fontSize: 14,
  },
  copyRight: {
    color: '#888',
    fontSize: 12,
  },
});

export default Footer;
