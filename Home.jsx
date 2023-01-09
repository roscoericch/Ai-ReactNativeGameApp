import React from "react";
import { NativeWindStyleSheet } from "nativewind";
import { View, Text, TouchableOpacity, Button } from "react-native";

const Home = ({ navigation }) => {
  NativeWindStyleSheet.setOutput({
    default: "native",
  });
  return (
    <View className="flex h-full items-center justify-center gap-[10px] bg-[#1E1E1E]">
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Game")}
          className="bg-white rounded-[10px]"
        >
          <Text className="text-[15px] text-center">2 Players VS</Text>
        </TouchableOpacity>
        <Button title="1 Player Vs AI" />
        <Button title="2 Player VS" />
      </View>
    </View>
  );
};

export default Home;
