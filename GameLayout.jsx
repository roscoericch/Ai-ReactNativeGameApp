import React from "react";
import { useState, useEffect, useReducer } from "react";
import { useContext } from "react";
import { AppContext } from "./Contexts/Context";
import { NativeWindStyleSheet } from "nativewind";
import { Text, View, TouchableOpacity, Button } from "react-native";
import { Player, AI, checkWinner } from "./game";

const GameLayout = () => {
  NativeWindStyleSheet.setOutput({
    default: "native",
  });
  const { tab, updateTab, resetTab, activePlayer, switchPlayer } =
    useContext(AppContext);
  const [endGame, setEndGame] = useState(false);
  const game = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const player1 = new AI("player1", "O");
  const player2 = new Player("player2", "X");
  const play = (e) => {
    if (!tab[e] && !endGame) {
      updateTab(e, player2.character);
      player1.moves = player1.updatemoves(tab);
      player2.moves = player2.updatemoves(tab);
      return;
    }
    return;
  };
  const AiPlay = () => {
    player1.moves = player1.updatemoves(tab);
    player2.moves = player2.updatemoves(tab);
    const move = player1.play(player1.moves, tab, player2);
    console.log(move);
    const newTab = updateTab(move, player1.character);
    player1.moves = player1.updatemoves(newTab);
    console.log(player1.moves, newTab);
    const cond = checkWinner(endGame, player1.moves, 1);
    setEndGame(cond);
    console.log(endGame, "check");
  };
  const switchTurn = (e = null) => {
    if (activePlayer) {
      player1.moves = player1.updatemoves(tab);
      const cond = checkWinner(endGame, player1.moves, 2);
      setEndGame(cond);
      if (!cond) {
        AiPlay();
        switchPlayer();
      }
      return;
    }
    if (!activePlayer) {
      play(e);
      player2.moves = player2.updatemoves(tab);
      const cond = checkWinner(endGame, player2.moves, 2);
      setEndGame(cond);
      console.log(endGame, "LastCheck");
      if (!cond) {
        switchPlayer();
      }
      return;
    }
    return;
  };
  useEffect(() => {
    player1.moves = player1.updatemoves(tab);
    player2.moves = player2.updatemoves(tab);
    const check = checkWinner(endGame, player2.moves, 3);
    setEndGame(check);
    console.log(endGame, "human check");
    if (check) return;
    const cond = checkWinner(endGame, player1.moves, 4);
    setEndGame(cond);
    console.log(endGame, "AIcheck");
    if (activePlayer && !cond) {
      switchTurn();
    }
  }, [activePlayer]);
  return (
    <View className="flex h-full items-center justify-center gap-y-[10px] bg-[#1E1E1E]">
      <Text className="text-white text-[20px] text-center">
        {endGame && (activePlayer ? "You Win" : "You Lose")}
      </Text>
      <View className="flex flex-row justify-around gap-[10px]">
        {game
          .filter((e) => e < 4)
          .map((e) => (
            <TouchableOpacity
              key={e}
              onPress={() => {
                if (!tab[e]) switchTurn(e);
              }}
              className="bg-black h-[100px] w-[100px] flex flex-row justify-center items-center"
            >
              <Text className="bg-black text-white text-[20px]">{tab[e]}</Text>
            </TouchableOpacity>
          ))}
      </View>
      <View className="flex flex-row justify-around gap-[10px]">
        {game
          .filter((e) => e > 3 && e < 7)
          .map((e) => (
            <TouchableOpacity
              key={e}
              onPress={() => {
                if (!tab[e]) switchTurn(e);
              }}
              className="bg-black h-[100px] w-[100px] flex flex-row justify-center items-center"
            >
              <Text className="bg-black text-white text-[20px]">{tab[e]}</Text>
            </TouchableOpacity>
          ))}
      </View>
      <View className="flex flex-row justify-around gap-[10px]">
        {game
          .filter((e) => e > 6)
          .map((e) => (
            <TouchableOpacity
              key={e}
              onPress={() => {
                if (!tab[e]) switchTurn(e);
              }}
              className="bg-black h-[100px] w-[100px] flex flex-row justify-center items-center"
            >
              <Text className="bg-black text-white text-[20px]">{tab[e]}</Text>
            </TouchableOpacity>
          ))}
      </View>
      <View>
        <Button
          title="Reset"
          onPress={() => {
            resetTab();
            setEndGame(false);
          }}
        />
      </View>
    </View>
  );
};

export default GameLayout;
