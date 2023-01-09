import produce from "immer";
export class Player {
  constructor(player, character) {
    this.player = player;
    this.character = character;
    this.moves = [];
  }
  updatemoves = (tab) => {
    const arr = Object.keys(tab).filter((e) => tab[e] === this.character);
    return arr;
  };
}

const getEmptycells = (tab) => {
  const arr = Object.keys(tab).filter((e) => tab[e] === "");
  return arr;
};

export const checkWinner = (endGame, moves, test) => {
  const winningComb = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  const activePlayer = moves;
  console.log(activePlayer);
  if (activePlayer.length > 1) {
    const cond = winningComb.some((e) =>
      e.every((i) => activePlayer.includes(i.toString()))
    );
    console.log(cond, test, "inner");
    return cond;
  }
  return endGame;
};

export const AiPlay = (AImoves, tab, Opponent, round) => {
  const winningComb = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  const emptyCells = getEmptycells(tab);
  const currentMoves = AImoves;
  const currentWinningComb = winningComb.filter((e) => {
    return !e.some((i) => Opponent.moves.includes(i.toString()));
  });
  //   const threat = winningComb.filter((e) => {});
  if (currentMoves.length < 1) {
    const firstMove = [1, 3, 7, 9].filter((e) =>
      emptyCells.includes(e.toString())
    );
    const move = firstMove[Math.floor(Math.random() * firstMove.length)];
    return move;
  }
  console.log(Opponent.moves);
  if (Opponent.moves.length > 1 && Opponent.moves > AImoves) {
    const move = winningComb
      .filter((e) => {
        const arr = e.filter((i) => !Opponent.moves.includes(i.toString()));
        if (arr.length > 0) true;
        else return false;
      })
      .flat()
      .filter((e) => emptyCells.includes(e.toString()));
    console.log(move, "defence");
    if (move.length > 0) return move[0];
  }
  if ("player1") {
    const winMax = currentWinningComb.filter((e) => {
      return e.some((i) => currentMoves.includes(i.toString()));
    });
    const getMaxWinMove = () => {
      const mumuPlayer = winMax
        .filter((e) => currentMoves.every((i) => e.includes(i * 1)))
        .flat()
        .filter((e) => !currentMoves.includes(e.toString()));
      if (mumuPlayer.length === 1) return mumuPlayer[0];
      console.log(mumuPlayer, currentMoves, "mumu");
      const possibleMoves = winMax.map((e) => {
        const arr = e.filter((i) => emptyCells.includes(i.toString()));
        return arr;
      });
      const finalmoves = possibleMoves
        .flat()
        .filter((e) => emptyCells.includes(e.toString()));
      console.log(finalmoves);
      let finalmove = finalmoves[Math.floor(Math.random() * finalmoves.length)];
      return finalmove;
    };
    const play = getMaxWinMove();
    return play;
  }
};

export class AI extends Player {
  constructor(player, character) {
    super(player, character);
    this.player = player;
  }
  play = (moves, tab, Opponent) => {
    const move = AiPlay(moves, tab, Opponent, "player1");
    return move;
  };
}
