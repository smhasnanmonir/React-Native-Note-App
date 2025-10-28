import { Text, FlatList, Pressable, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import NoteItems from "../components/NoteItems";
import { Entypo } from "@expo/vector-icons";
import AddNotePopup from "../components/AddNotePopup/AddNotePopup";
import supabase from "../utils/supabase";

const Home = () => {
  const navigation = useNavigation();
  const [showAddNotePopup, setShowAddNotePopup] = React.useState(false);

  const [notes, setNotes] = React.useState([]);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const { data: notes, error } = await supabase.from("notes").select("*");

        if (error) {
          console.error("Error fetching todos:", error.message);
          return;
        }

        if (notes && notes.length > 0) {
          setNotes(notes);
        }
      } catch (error) {
        console.error("Error fetching todos:", error.message);
      }
    };

    getNotes();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#121212",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 34,
          fontWeight: "medium",
          marginBottom: 20,
          marginHorizontal: 20,
        }}
      >
        Native Note
      </Text>
      <FlatList
        data={notes}
        renderItem={({ item }) => <NoteItems item={item}></NoteItems>}
      ></FlatList>
      <Pressable
        onPress={() => {
          console.log("Pressed!!");
          setShowAddNotePopup(true);
        }}
        style={{
          backgroundColor: "#ee9b00",
          position: "absolute",
          right: 25,
          bottom: 35,
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Entypo name="plus" size={26} color={"white"}></Entypo>
      </Pressable>
      <View>
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
      </View>
    </SafeAreaView>
  );
};

export default Home;
