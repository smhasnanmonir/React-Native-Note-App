import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import DeleteNotePopup from "../DeleteNotePopup/DeleteNotePopup";
const NoteItems = ({ item }) => {
  const [showDelete, setShowDelete] = React.useState(false);
  return (
    <View
      style={{
        backgroundColor: "#1c1c1e",
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginVertical: 4,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          color: "#ffff",
          fontWeight: "800",
          flex: 1,
          paddingBottom: 8,
        }}
        numberOfLines={1}
      >
        {item?.title}
      </Text>
      <Text
        style={{
          fontSize: 24,
          color: "#AEAEB2",
          fontWeight: "600",
          paddingBottom: 8,
        }}
      >
        {item?.content}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "400",
            flex: 1,
            color: "#8E8E93",
          }}
        >
          Date: 2025
        </Text>
        <Pressable
          style={{
            backgroundColor: "#000",
            height: 40,
            width: 40,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => setShowDelete(true)}
        >
          <Entypo name="trash" size={20} color={"white"}></Entypo>
        </Pressable>
      </View>
      <DeleteNotePopup
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => {
          // handle delete for item.id here
          setShowDelete(false);
        }}
        title={`Delete \"${item?.title}\"?`}
        message="This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        id={item.id}
      />
    </View>
  );
};

export default NoteItems;

const styles = StyleSheet.create({});
