import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Text, ActivityIndicator } from "react-native-paper";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const ViewApplicantsScreen = ({ route }) => {
  const { jobId } = route.params;
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const q = query(collection(db, "applications"), where("jobId", "==", jobId));
        const snapshot = await getDocs(q);
  
        const applicantsList = snapshot.docs.map(docSnap => {
          const data = docSnap.data();
          const profile = data.applicant || {};
          return {
            name: profile.name || "N/A",
            stream: profile.stream || "N/A",
            skills: profile.skills || "N/A",
            expectedSalary: profile.expectedSalary || "N/A",
            preferredJobType: profile.preferredJobType || "N/A",
            appliedAt: data.appliedAt?.toDate().toLocaleDateString() || "Unknown",
          };
        });
  
        setApplicants(applicantsList);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchApplicants();
  }, []);
  

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Applicants for this Job</Text>
      {applicants.length === 0 ? (
        <Text>No applicants yet.</Text>
      ) : (
        applicants.map((applicant, i) => (
          <Card key={i} style={styles.card}>
            <Card.Title title={applicant.name} subtitle={`Applied on ${applicant.appliedAt}`} />
            <Card.Content>
              <Text>🎓 Stream: {applicant.stream}</Text>
              <Text>💼 Skills: {applicant.skills}</Text>
              <Text>🌐 Preferred: {applicant.preferredJobType}</Text>
              <Text>💰 Expected Salary: ₹{applicant.expectedSalary}</Text>
            </Card.Content>
          </Card>
        ))
      )}
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

export default ViewApplicantsScreen;
