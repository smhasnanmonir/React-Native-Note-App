import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteNote, getAllNotes, insertData } from "../api/notes";

export const useNoteList = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: getAllNotes,
  });
};

export const useAddNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertData,
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNote,
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });
};
