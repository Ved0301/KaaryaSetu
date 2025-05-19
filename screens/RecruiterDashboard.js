import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { query, where } from "firebase/firestore";


const RecruiterDashboard = () => {
  const navigation = useNavigation();

  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  // Fetch jobs from Firestore on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const snapshot = await getDocs(collection(db, "jobs"));
        const jobsList = [];
    
        for (const docSnap of snapshot.docs) {
          const job = { id: docSnap.id, ...docSnap.data() };
    
          // Fetch number of applications for this job
          const appQuery = query(
            collection(db, "applications"),
            where("jobId", "==", job.id)
          );
          const appSnapshot = await getDocs(appQuery);
    
          job.applicationCount = appSnapshot.size; // Add count to job
          jobsList.push(job);
        }
    
        setJobs(jobsList);
      } catch (error) {
        console.error("Error fetching jobs or application counts:", error);
      }
    };
    

    fetchJobs();
  }, []);

  // Handle job posting
  const handlePostJob = async () => {
    if (!title || !description || !skills || !salary || !location || !type) {
      Alert.alert("Missing Info", "Please fill all fields.");
      return;
    }

    const newJob = {
      title,
      description,
      skills,
      salary,
      location,
      type,
      createdAt: new Date(),
    };

    try {
      const docRef = await addDoc(collection(db, "jobs"), newJob);
      setJobs([{ id: docRef.id, ...newJob }, ...jobs]);

      // Clear form
      setTitle("");
      setDescription("");
      setSkills("");
      setSalary("");
      setLocation("");
      setType("");
    } catch (error) {
      console.error("Error posting job:", error);
      Alert.alert("Error", "Failed to post job.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Post a New Job</Text>

      <TextInput
        label="Job Title"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Job Description"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        multiline
        style={styles.input}
      />
      <TextInput
        label="Required Skills (comma-separated)"
        value={skills}
        onChangeText={setSkills}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Salary"
        value={salary}
        onChangeText={setSalary}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Location"
        value={location}
        onChangeText={setLocation}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Job Type (Remote, On-Site)"
        value={type}
        onChangeText={setType}
        mode="outlined"
        style={styles.input}
      />

      <Button mode="contained" onPress={handlePostJob} style={styles.button}>
        Post Job
      </Button>

      <Text style={styles.subheading}>All Posted Jobs</Text>

      {jobs.map((job) => (
        <Card key={job.id} style={styles.card}>
          <Card.Title title={job.title} subtitle={`${job.type} • ${job.location}`} />
          <Card.Content>
            <Text>{job.description}</Text>
            <Text style={{ marginTop: 5 }}>💼 Skills: {job.skills}</Text>
            <Text>💰 Salary: ₹{job.salary}</Text>
            <View style={styles.meta}>
  <Text>📥 Applications: {job.applicationCount || 0}</Text>
</View>

            <Button
  mode="outlined"
  onPress={() => navigation.navigate("ViewApplicants", { jobId: job.id })}
  style={{ marginTop: 10 }}
>
  View Applicants
</Button>

          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginVertical: 10,
  },
  subheading: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
  },
});

export default RecruiterDashboard;
