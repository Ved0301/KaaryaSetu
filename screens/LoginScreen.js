import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";

const LoginScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [college, setCollege] = useState("");
  const [stream, setStream] = useState("");

  const role = route.params?.role || "jobseeker"; // ✅ Inside the component

  const isTextOnly = (text) => /^[A-Za-z\s]+$/.test(text.trim());

  const handleSubmit = () => {
    const trimmedName = name.trim();
    const trimmedCollege = college.trim();
    const trimmedGender = gender.trim().toLowerCase();
    const trimmedStream = stream.trim();

    if (!trimmedName || !age || !trimmedGender || !trimmedCollege || !trimmedStream) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (!isTextOnly(trimmedName)) {
      Alert.alert("Error", "Name must contain only letters.");
      return;
    }

    if (!isTextOnly(trimmedCollege)) {
      Alert.alert("Error", "College name must contain only letters.");
      return;
    }

    const ageNumber = parseInt(age);
    if (isNaN(ageNumber) || ageNumber < 20 || ageNumber > 100) {
      Alert.alert("Error", "Age must be a number between 20 and 100.");
      return;
    }

    if (!["male", "female", "other"].includes(trimmedGender)) {
      Alert.alert("Error", "Gender must be Male, Female, or Other.");
      return;
    }

    if (!isTextOnly(trimmedStream)) {
      Alert.alert("Error", "Stream must contain only letters.");
      return;
    }

    const properGender = trimmedGender.charAt(0).toUpperCase() + trimmedGender.slice(1);

    Alert.alert("Form Submitted", `Welcome, ${name}!`, [
      {
        text: "OK",
        onPress: () => {
          if (role === "recruiter") {
            navigation.navigate("RecruiterDashboard");
          } else {
            navigation.navigate("JobSeekerProfile");
          }
        }
      }
    ]);
  }; // ✅ Closing bracket added

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {role === "recruiter" ? "Recruiter Login" : "Job Seeker Login"}
      </Text>

      <TextInput
        label="Full Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Age"
        value={age}
        onChangeText={setAge}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        label="Gender (Male/Female/Other)"
        value={gender}
        onChangeText={setGender}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="College"
        value={college}
        onChangeText={setCollege}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Stream (e.g., CS, ECE, ME)"
        value={stream}
        onChangeText={setStream}
        mode="outlined"
        style={styles.input}
      />

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    width: "100%",
  },
});

export default LoginScreen;
