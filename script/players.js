function createPlayers(playerName = "Human", opponentName = "AI") {
   const createPlayer = (name, value) => ({
      name,
      value,
      score: 0,
      toString() {
         return `${this.name} : ${this.value}`;
      },
   });

   return [createPlayer(playerName, "x"), createPlayer(opponentName, "o")];
}

export { createPlayers };
