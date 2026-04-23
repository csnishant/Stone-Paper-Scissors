const GameRow = ({ game }) => {
  return (
    <tr className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
      <td className="p-4 text-gray-300">
        {new Date(game.createdAt).toLocaleDateString()}
      </td>
      <td className="p-4 font-semibold text-cyan-400">{game.player1Name}</td>
      <td className="p-4 font-semibold text-pink-400">{game.player2Name}</td>
      <td className="p-4">
        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30">
          {game.finalWinner}
        </span>
      </td>
      <td className="p-4 text-xs text-gray-500">
        {game.rounds.length} Rounds Played
      </td>
    </tr>
  );
};

export default GameRow;
