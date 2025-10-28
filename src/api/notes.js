import supabase from "../utils/supabase";

export const getAllNotes = async () => {
  let { data, error } = await supabase.from("notes").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const insertData = async (title, content) => {
  let { data, error } = await supabase
    .from("notes")
    .insert([
      {
        title,
        content,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const deleteNote = async (id) => {
  let { error } = await supabase.from("notes").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
};
