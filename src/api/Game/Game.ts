import api from "../base";
import GameInterface from "./GameInterface";

export const getRandomGame = (userId : number) => {
    return api.get<GameInterface>(`/game/getRandom?user_id=${userId}`);
}