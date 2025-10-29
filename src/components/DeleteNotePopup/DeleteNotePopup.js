import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from "@/src/components/ui/alert-dialog";
import { Button, ButtonText } from "@/src/components/ui/button";
import { Text } from "@/src/components/ui/text";
import { Heading } from "@/src/components/ui/heading";
import { useDeleteNote } from "@/src/queries/notes";

export const DeleteNotePopup = ({
  isOpen = false,
  onClose,
  onConfirm,
  title = "Are you sure you want to delete this item?",
  message = "Deleting this item will remove it permanently and cannot be undone.",
  cancelLabel = "Cancel",
  confirmLabel = "Delete",
  id,
}) => {
  const { mutate: deleteNote } = useDeleteNote();

  const handleDelete = (id) => {
    deleteNote(id);
    console.log(id);
    if (onConfirm) onConfirm();
    if (onClose) onClose();
  };

  return (
    <>
      <AlertDialog isOpen={isOpen} onClose={onClose} size="md">
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading className="text-typography-950 font-semibold" size="md">
              {title}
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Text size="sm">{message}</Text>
          </AlertDialogBody>
          <AlertDialogFooter className="">
            <Button
              variant="outline"
              action="secondary"
              onPress={onClose}
              size="sm"
            >
              <ButtonText>{cancelLabel}</ButtonText>
            </Button>
            <Button size="sm" onPress={() => handleDelete(id)}>
              <ButtonText>{confirmLabel}</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteNotePopup;
