import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const JobSeekerHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Kaaryasetu</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("FindJobs")}
        style={styles.button}
      >
        Find Jobs
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("LearnSkills")}
        style={styles.button}
      >
        Learn New Skills
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
    width: "80%",
  },
});

export default JobSeekerHome;
