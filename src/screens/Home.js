import { Text, FlatList, Pressable, View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import NoteItems from "../components/NoteItems/NoteItems";
import { Entypo } from "@expo/vector-icons";
import AddNotePopup from "../components/AddNotePopup/AddNotePopup";
import { useNoteList } from "../queries/notes";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const Home = () => {
  const navigation = useNavigation();
  const [showAddNotePopup, setShowAddNotePopup] = React.useState(false);

  const { data: notes, error, isPending } = useNoteList();

  if (isPending) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.emoji}>📝</Text>
          <Text style={styles.title}>Native Note</Text>
        </View>
        <Text style={styles.subtitle}>
          Your thoughts, beautifully organized
        </Text>
      </View>

      {/* Notes List */}
      <View style={styles.content}>
        <FlatList
          data={notes}
          renderItem={({ item }) => <NoteItems item={item}></NoteItems>}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>📄</Text>
              <Text style={styles.emptyTitle}>No notes yet</Text>
              <Text style={styles.emptySubtitle}>
                Tap the + button to create your first note
              </Text>
            </View>
          }
        />
      </View>

      {/* Floating Action Button */}
      <Pressable
        style={styles.fab}
        onPress={() => {
          console.log("Pressed!!");
          setShowAddNotePopup(true);
        }}
      >
        <View style={styles.fabShadow} />
        <View style={styles.fabButton}>
          <Entypo name="plus" size={28} color={"#1F2937"} />
        </View>
      </Pressable>

      {/* Add Note Modal */}
      <AddNotePopup
        isOpen={showAddNotePopup}
        onClose={() => setShowAddNotePopup(false)}
        onConfirm={(value) => {
          console.log("Confirmed!!", value);
          setShowAddNotePopup(false);
        }}
        title="Add Note"
        confirmLabel="Add"
        cancelLabel="Cancel"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F0F0F",
  },
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },
  header: {
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
    marginBottom: 4,
  },
  emoji: {
    fontSize: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 16,
    color: "#9CA3AF",
    fontWeight: "400",
  },
  content: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100, // Extra padding for FAB
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 22,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  fabShadow: {
    position: "absolute",
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#F59E0B",
    opacity: 0.3,
    shadowColor: "#F59E0B",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  fabButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F59E0B",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#F59E0B",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});

export default Home;
