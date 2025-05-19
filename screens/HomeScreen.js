import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Kaaryasetu! 🚀</Text>
      <Text style={styles.subtitle}>Your AI-Powered Career Guide</Text>

      <Button title="Find Jobs" onPress={() => navigation.navigate("Jobs")} />
      <Button title="Learn New Skills" onPress={() => navigation.navigate("Skills")} />
      <Button title="Logout" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default HomeScreen;
