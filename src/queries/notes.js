import { useQuery } from "@tanstack/react-query";
import { getAllNotes } from "../api/notes";

export const useNoteList = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: getAllNotes,
  });
};
