import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Kaaryasetu 🚀</Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Login as Job Seeker"
          onPress={() => navigation.navigate("Login", { role: "jobseeker" })}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Login as Recruiter"
          onPress={() => navigation.navigate("Login", { role: "recruiter" })}
          color="#4CAF50"
        />
      </View>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  buttonContainer: {
    width: "80%",
    marginVertical: 10,
  },
});

export default WelcomeScreen;
