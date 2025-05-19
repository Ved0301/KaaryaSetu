import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { Card, Text, ActivityIndicator, Button } from "react-native-paper";
import { db } from "../firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

// ✅ Accept route to access params
const FindJobsScreen = ({ route }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Get job seeker name from route params
  const jobSeekerName = route.params?.name;

  const handleApply = async (jobId, jobTitle) => {
    try {
      if (!jobSeekerName) {
        Alert.alert("Successful", "You have applied.");
        return;
      }

      // Fetch job seeker profile from Firestore
      const q = query(collection(db, "jobSeekers"), where("name", "==", jobSeekerName));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        Alert.alert("Profile Not Found", "Could not find your job seeker profile.");
        return;
      }

      const profile = snapshot.docs[0].data();

      const application = {
        jobId,
        jobTitle,
        appliedAt: new Date(),
        applicant: {
          name: profile.name || "N/A",
          stream: profile.stream || "N/A",
          skills: profile.skills || "N/A",
          preferredJobType: profile.preferredJobType || "N/A",
          expectedSalary: profile.expectedSalary || "N/A",
          email: profile.email || "N/A", // Optional: if you're using email again
        },
      };

      await addDoc(collection(db, "applications"), application);
      Alert.alert("Success", "You have successfully applied for this job!");
    } catch (error) {
      console.error("Error applying:", error);
      Alert.alert("Error", "Could not apply for this job.");
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const snapshot = await getDocs(collection(db, "jobs"));
        const jobsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(jobsList);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <ActivityIndicator animating={true} style={{ marginTop: 50 }} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Available Jobs</Text>
      {jobs.map(job => (
        <Card key={job.id} style={styles.card}>
          <Card.Title title={job.title} subtitle={`${job.type} • ${job.location}`} />
          <Card.Content>
            <Text>{job.description}</Text>
            <Text style={{ marginTop: 5 }}>💼 Skills: {job.skills}</Text>
            <Text>💰 Salary: ₹{job.salary}</Text>

            <Button
              mode="contained"
              style={{ marginTop: 10 }}
              onPress={() => handleApply(job.id, job.title)}
            >
              Apply Now
            </Button>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    marginBottom: 12,
  },
});

export default FindJobsScreen;
