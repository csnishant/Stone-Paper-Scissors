import { useEffect, useState } from "react";
import { getHistory } from "../api/gameApi";

export default function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getHistory().then(setData);
  }, []);

  return (
    <div>
      <h1>Game History</h1>

      {data.map((game, i) => (
        <div key={i}>
          <h3>
            {game.players.player1} vs {game.players.player2}
          </h3>
          {game.scores.map((r, idx) => (
            <p key={idx}>
              Round {r.round}: {r.winner}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
