import React from "react";
import { Text, View } from "react-native";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from "@/src/components/ui/alert-dialog";
import { Button, ButtonText } from "@/src/components/ui/button";
import { Heading } from "@/src/components/ui/heading";
import { Input, InputField } from "../ui/input";

export default function AddNotePopup({
  isOpen = false,
  onClose,
  onConfirm,
  title = "Add Note",
  cancelLabel = "Cancel",
  confirmLabel = "Add",
}) {
  const [noteTitle, setNoteTitle] = React.useState("");
  const [noteContent, setNoteContent] = React.useState("");
  const [emptyTitleError, setEmptyTitleError] = React.useState("");
  const [emptyContentError, setEmptyContentError] = React.useState("");
  const handleClose = () => {
    setNoteTitle("");
    setNoteContent("");
    setEmptyTitleError("");
    setEmptyContentError("");
    if (onClose) onClose();
  };

  const handleConfirm = () => {
    if (noteTitle.trim() === "") {
      setEmptyTitleError("Note Title is required");
      setEmptyContentError("");
      return;
    }
    if (noteContent.trim() === "") {
      setEmptyContentError("Note Content is required");
      setEmptyTitleError("");
      return;
    }
    if (onConfirm) onConfirm(noteTitle, noteContent);
    console.log("Confirmed!!", noteTitle);
    setEmptyTitleError("");
    setNoteTitle("");
    setNoteContent("");
    if (onClose) onClose();
  };

  console.log("Empty Title Error:", emptyTitleError);
  console.log("Empty Content Error:", emptyContentError);

  return (
    <>
      <AlertDialog isOpen={isOpen} onClose={handleClose} size="md">
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading className="text-typography-950 font-semibold" size="md">
              <Input
                variant="outline"
                size="lg"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                  placeholder="Enter Note Title here..."
                  value={noteTitle}
                  onChangeText={setNoteTitle}
                  returnKeyType="done"
                  onSubmitEditing={handleConfirm}
                />
              </Input>
            </Heading>
            <View>
              <Text style={{ color: "red" }}>{emptyTitleError}</Text>
            </View>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Input
              variant="outline"
              size="lg"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField
                placeholder="Enter Note Content here..."
                value={noteContent}
                onChangeText={setNoteContent}
                returnKeyType="done"
                onSubmitEditing={handleConfirm}
              />
            </Input>
          </AlertDialogBody>
          <AlertDialogFooter className="">
            <Button
              variant="outline"
              action="secondary"
              onPress={handleClose}
              size="sm"
            >
              <ButtonText>{cancelLabel}</ButtonText>
            </Button>
            <Button size="sm" onPress={handleConfirm}>
              <ButtonText>{confirmLabel}</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
