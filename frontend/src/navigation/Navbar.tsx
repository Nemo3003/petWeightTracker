import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>PWT</Text>
      <TouchableOpacity onPress={toggleMenu}>
        <Feather name={menuOpen ? 'x' : 'menu'} size={24} color="white" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuOpen}
        onRequestClose={closeMenu}
      >
        <TouchableOpacity style={styles.menuOverlay} onPress={closeMenu}>
          <View style={styles.menuContent}>
            <Text style={styles.link}>Home</Text>
            <Text style={styles.link}>About</Text>
            <Text style={styles.link}>Services</Text>
            <Text style={styles.link}>Contact</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    margin: 10,
    backgroundColor: '#3498db',
    width: '100%',
    height: '15%',
    top:0
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '5%'
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  menuContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    minWidth: 200,
    alignItems: 'flex-start',
  },
  link: {
    color: 'black',
    fontSize: 18,
    marginVertical: 8,
  },
});

export default Navbar;
