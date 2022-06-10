import api from "../base";
import {ColorInterface} from "./ColorInterface";


export const getColors = async () => {
    return await api.get<ColorInterface[]>("/color/list?limit=100");
}