import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Card, Text, TextInput, ActivityIndicator } from "react-native-paper";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const ViewJobSeekersScreen = () => {
  const [seekers, setSeekers] = useState([]);
  const [filteredSeekers, setFilteredSeekers] = useState([]);
  const [searchSkill, setSearchSkill] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeekers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "jobSeekers"));
        const seekerList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSeekers(seekerList);
        setFilteredSeekers(seekerList);
      } catch (error) {
        console.error("Error fetching job seekers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeekers();
  }, []);

  // 🔍 Filter function
  const handleSearch = (text) => {
    setSearchSkill(text);
    const filtered = seekers.filter(seeker =>
      seeker.skills.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSeekers(filtered);
  };

  if (loading) {
    return <ActivityIndicator animating={true} style={{ marginTop: 50 }} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Available Job Seekers</Text>

      <TextInput
        label="Filter by Skill (e.g. React, Figma)"
        value={searchSkill}
        onChangeText={handleSearch}
        mode="outlined"
        style={styles.input}
      />

      {filteredSeekers.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 20 }}>No matching profiles found.</Text>
      )}

      {filteredSeekers.map(seeker => (
        <Card key={seeker.id} style={styles.card}>
          <Card.Title title={seeker.name} subtitle={`Stream: ${seeker.stream}`} />
          <Card.Content>
            <Text>💼 Skills: {seeker.skills}</Text>
            <Text>💰 Expected Salary: ₹{seeker.expectedSalary}</Text>
            <Text>🌐 Job Type: {seeker.preferredJobType}</Text>
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
  input: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 12,
  },
});

export default ViewJobSeekersScreen;
