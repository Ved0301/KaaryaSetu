import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const JobSeekerProfileScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [stream, setStream] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    if (!skills || !jobType || !salary || !stream || !name) {
      Alert.alert("Missing Info", "Please fill all fields.");
      return;
    }

    const profile = {
      name,
      email,
      skills,
      preferredJobType: jobType,
      expectedSalary: salary,
      stream,
      createdAt: new Date(),
    };
    

    try {
      const docRef = await addDoc(collection(db, "jobSeekers"), profile);
      console.log("Profile saved with ID:", docRef.id);
      Alert.alert("Profile Saved", `Welcome, ${name}!`, [
        { text: "OK", onPress: () => navigation.navigate("JobSeekerHome") },
      ]);
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert("Error", "Failed to save profile.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Profile</Text>

      <TextInput
        label="Full Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Skills (comma-separated)"
        value={skills}
        onChangeText={setSkills}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
      label="Email"
    value={email}
    onChangeText={setEmail}
    mode="outlined"
    keyboardType="email-address"
    style={styles.input}
      />

      <TextInput
        label="Preferred Job Type (Remote / On-site / Hybrid)"
        value={jobType}
        onChangeText={setJobType}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Expected Salary"
        value={salary}
        onChangeText={setSalary}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Stream (e.g., CS, ECE)"
        value={stream}
        onChangeText={setStream}
        mode="outlined"
        style={styles.input}
      />

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Submit Profile
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { marginBottom: 12 },
  button: { marginTop: 10 },
});

export default JobSeekerProfileScreen;
