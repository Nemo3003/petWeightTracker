import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/screens/Home';
import Navbar from './src/navigation/Navbar';
import Footer from './src/navigation/Footer';

export default function App() {
  return (
    <View style={styles.container}>
      <Navbar/>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Home/>
      <StatusBar style="auto" />
      <Footer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
