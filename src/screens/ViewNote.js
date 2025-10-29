import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

const ViewNote = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { noteTitle, noteContent, noteDate } = route.params || {};

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Unknown date";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.emoji}>📄</Text>
          <Text style={styles.title}>Note Details</Text>
        </View>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Entypo name="arrow-bold-left" size={28} color={"#f0f8ff"} />
        </Pressable>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.noteContainer}>
          <Text style={styles.noteTitle}>{noteTitle || "Untitled Note"}</Text>
          <Text style={styles.noteDate}>{formatDate(noteDate)}</Text>
          <View style={styles.separator} />
          <Text style={styles.noteContent}>
            {noteContent || "No content available"}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1F1F1F",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  emoji: {
    fontSize: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1c1c1e",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  noteContainer: {
    backgroundColor: "#1c1c1e",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  noteTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  noteDate: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 16,
    fontWeight: "400",
  },
  separator: {
    height: 1,
    backgroundColor: "#2C2C2E",
    marginBottom: 20,
  },
  noteContent: {
    fontSize: 18,
    lineHeight: 26,
    color: "#AEAEB2",
    fontWeight: "600",
  },
});

export default ViewNote;
