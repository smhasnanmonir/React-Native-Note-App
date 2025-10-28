import { Text, FlatList, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import NoteItems from "../components/NoteItems";
import { dummyNotes } from "../constants/dummyNotes";
import { Entypo } from "@expo/vector-icons";

const Home = () => {
  const navigation = useNavigation();

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
        data={dummyNotes}
        renderItem={({ item }) => <NoteItems item={item}></NoteItems>}
      ></FlatList>
      <Pressable
        onPress={() => {
          console.log("Pressed!!");
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
    </SafeAreaView>
  );
};

export default Home;
