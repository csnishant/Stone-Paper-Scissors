import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import GameRow from "../components/history/GameRow";
import { GAME_API_ENDPOINT } from "../src/utils/constants";

const History = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${GAME_API_ENDPOINT}/history`);
        setGames(response.data);
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black tracking-tight">
            GAME <span className="text-cyan-500">HISTORY</span>
          </h1>
          <button
            onClick={() => navigate("/")}
            className="bg-slate-800 hover:bg-slate-700 px-6 py-2 rounded-lg font-bold text-sm transition-all">
            ← Back to Game
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 animate-pulse">
            Loading game logs...
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-800/80">
                <tr>
                  <th className="p-4 text-xs uppercase tracking-widest text-gray-400">
                    Date
                  </th>
                  <th className="p-4 text-xs uppercase tracking-widest text-gray-400">
                    Player 1
                  </th>
                  <th className="p-4 text-xs uppercase tracking-widest text-gray-400">
                    Player 2
                  </th>
                  <th className="p-4 text-xs uppercase tracking-widest text-gray-400">
                    Winner
                  </th>
                  <th className="p-4 text-xs uppercase tracking-widest text-gray-400">
                    Stats
                  </th>
                </tr>
              </thead>
              <tbody>
                {games.length > 0 ? (
                  games.map((game) => <GameRow key={game._id} game={game} />)
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-20 text-center text-gray-500 italic">
                      No games played yet. Start your first match!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
