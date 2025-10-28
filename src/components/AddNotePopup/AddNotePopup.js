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
import supabase from "@/src/utils/supabase";

export default function AddNotePopup({
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
    const { data, error } = await supabase.from("posts").insert([
      {
        title: noteTitle,
        content: noteContent,
      },
    ]);

    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Post created:", data);
    }

    console.log("Confirmed!!", noteTitle);
    setEmptyTitleError("");
    setEmptyContentError("");
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
              <Text className="text-typography-500 font-semibold text-xl">
                Title
              </Text>
              <Input
                variant="outline"
                size="lg"
                isDisabled={false}
                isInvalid={noteTitle.trim() === ""}
                isReadOnly={false}
              >
                <InputField
                  placeholder={
                    emptyTitleError !== ""
                      ? emptyTitleError
                      : "Enter Note Title here..."
                  }
                  value={noteTitle}
                  onChangeText={setNoteTitle}
                  returnKeyType="done"
                  onSubmitEditing={handleConfirm}
                />
              </Input>
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Text className="text-typography-500 font-semibold text-xl">
              Content
            </Text>
            <Input
              variant="outline"
              size="lg"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField
                placeholder={
                  emptyContentError !== ""
                    ? emptyContentError
                    : "Enter Note Content here..."
                }
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
