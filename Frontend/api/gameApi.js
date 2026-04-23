import { GAME_API_ENDPOINT } from "../src/utils/constants";

export const saveGame = async (data) => {
  const res = await fetch(`${GAME_API_ENDPOINT}/save-game`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getHistory = async () => {
  const res = await fetch(`${GAME_API_ENDPOINT}/history`);
  return res.json();
};
