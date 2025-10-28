import React from "react";
import {
  Text,
  View,
  Alert,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useAddNote } from "@/src/queries/notes";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function AddNotePopup({
  isOpen = false,
  onClose,
  onConfirm,
  cancelLabel = "Cancel",
  confirmLabel = "Add",
}) {
  const [noteTitle, setNoteTitle] = React.useState("");
  const [noteContent, setNoteContent] = React.useState("");
  const [emptyTitleError, setEmptyTitleError] = React.useState("");
  const [emptyContentError, setEmptyContentError] = React.useState("");

  const { mutate: addNote, isPending } = useAddNote();

  const handleClose = () => {
    setNoteTitle("");
    setNoteContent("");
    setEmptyTitleError("");
    setEmptyContentError("");
    if (onClose) onClose();
  };

  const handleConfirm = async () => {
    //   If not title, set error and return
    if (noteTitle.trim() === "") {
      setEmptyTitleError("Note Title is required");
      setEmptyContentError("");
      return;
    }
    //   If not content, set error and return
    if (noteContent.trim() === "") {
      setEmptyContentError("Note Content is required");
      setEmptyTitleError("");
      return;
    }
    //   If both are valid, call onConfirm
    if (onConfirm) onConfirm(noteTitle, noteContent);

    addNote(
      {
        title: noteTitle,
        content: noteContent,
      },
      {
        onSuccess: () => {
          Alert.alert("Successfully added the note");
        },
        onError: () => {
          Alert.alert("Something went wrong!");
          return;
        },
      }
    );

    console.log("Confirmed!!", noteTitle);
    setEmptyTitleError("");
    setEmptyContentError("");
    setNoteTitle("");
    setNoteContent("");
    if (onClose) onClose();
  };

  console.log("Title", noteTitle);
  console.log("Content", noteContent);

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>✏️ Add New Note</Text>
          </View>

          {/* Body */}
          <View style={styles.body}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                placeholder={
                  emptyTitleError !== ""
                    ? emptyTitleError
                    : "Enter Note Title here..."
                }
                value={noteTitle}
                onChangeText={setNoteTitle}
                keyboardType="default"
                autoCorrect={false}
                autoCapitalize="sentences"
                autoComplete="off"
                textContentType="none"
                returnKeyType="next"
                blurOnSubmit={false}
                style={[
                  styles.input,
                  emptyTitleError !== "" && styles.inputError,
                ]}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Content</Text>
              <TextInput
                placeholder={
                  emptyContentError !== ""
                    ? emptyContentError
                    : "Write your note here..."
                }
                value={noteContent}
                onChangeText={setNoteContent}
                keyboardType="default"
                autoCorrect={false}
                autoCapitalize="sentences"
                autoComplete="off"
                textContentType="none"
                multiline={true}
                numberOfLines={8}
                style={[
                  styles.textArea,
                  emptyContentError !== "" && styles.inputError,
                ]}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.cancelButtonText}>{cancelLabel}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.addButton, isPending && styles.addButtonDisabled]}
              onPress={handleConfirm}
              disabled={isPending}
            >
              {isPending ? (
                <LoadingSpinner />
              ) : (
                <Text style={styles.addButtonText}>{confirmLabel}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "#1F1F1F",
    borderRadius: 20,
    width: "100%",
    maxWidth: 400,
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
  body: {
    padding: 24,
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#2A2A2A",
    borderWidth: 2,
    borderColor: "#404040",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#FFFFFF",
    minHeight: 48,
  },
  textArea: {
    backgroundColor: "#2A2A2A",
    borderWidth: 2,
    borderColor: "#404040",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#FFFFFF",
    minHeight: 180,
    maxHeight: 400,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#EF4444",
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    padding: 24,
    paddingTop: 0,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#374151",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  addButton: {
    flex: 1,
    backgroundColor: "#F59E0B",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#F59E0B",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonDisabled: {
    backgroundColor: "#6B7280",
    shadowOpacity: 0,
    elevation: 0,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
});

export default AddNotePopup;
