import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { db, auth } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

const categories = [
  {
    title: "Tech",
    skills: ["React", "Python", "Mobile App Dev"],
  },
  {
    title: "Business",
    skills: ["Marketing", "Finance", "Startup Strategy"],
  },
  {
    title: "Design",
    skills: ["UI/UX", "Graphic Design", "Motion Graphics"],
  },
];

const LearnSkillsScreen = () => {
  const [learnedSkills, setLearnedSkills] = useState([]);

  // Load current user's learned skills
  useEffect(() => {
    const fetchSkills = async () => {
      const userRef = doc(db, "jobSeekers", auth.currentUser.uid);
      const snapshot = await getDoc(userRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        setLearnedSkills(data.learnedSkills || []);
      }
    };
    fetchSkills();
  }, []);

  const handleLearnSkill = async (skill) => {
    const userRef = doc(db, "jobSeekers", auth.currentUser.uid);
    await setDoc(userRef, { learnedSkills: arrayUnion(skill) }, { merge: true });
    setLearnedSkills(prev => [...new Set([...prev, skill])]);
  };

  const isLearned = (skill) => learnedSkills.includes(skill);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Skill Learning Hub</Text>

      {categories.map((cat, i) => (
        <Card key={i} style={styles.card}>
          <Card.Title title={cat.title} />
          <Card.Content>
            {cat.skills.map((skill, j) => (
              <Card key={j} style={styles.skillCard}>
                <Card.Content style={styles.skillRow}>
                  <Text>{skill}</Text>
                  <Button
                    mode={isLearned(skill) ? "outlined" : "contained"}
                    onPress={() => handleLearnSkill(skill)}
                    disabled={isLearned(skill)}
                    style={styles.button}
                  >
                    {isLearned(skill) ? "Learned" : "Mark as Learned"}
                  </Button>
                </Card.Content>
              </Card>
            ))}
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: { marginBottom: 16 },
  skillCard: {
    marginVertical: 5,
    padding: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  skillRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    marginLeft: 10,
  },
});

export default LearnSkillsScreen;
