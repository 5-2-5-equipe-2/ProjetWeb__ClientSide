import api from "../base";
import PixelInterface, {PixelUpdateInterface} from "./PixelInterface";

// export const getPixels = () => api.get("/pixel/list");
// export const getPixelById = (id: number) => api.get<PixelInterface[]>(`/pixel/get?id=${id}`);
// export const createPixel = (pixel: PixelInterface) => api.post("/pixel/createPixel", pixel);
export const updatePixel = (pixel: PixelUpdateInterface) => api.put(`/pixel/updatePixel/`, pixel);
// export const deletePixel = (id: number) => api.delete(`/pixel/delete/?id=${id}`);
// export const getPixelByXAndY = (x: number, y: number) => api.get(`/pixel/getByXAndY/?x=${x}&y=${y}`);
// export const getPixelByColorId = (colorId: number) => api.get(`/pixel/getByColorId/?colorId=${colorId}`);
// export const getPixelByUserId = (userId: number) => api.get(`/pixel/getByUserId/?userId=${userId}`);
// export const getPixelByUserIdAndColorId = (userId: number, colorId: number) => api.get(`/pixel/getByUserIdAndColorId/?userId=${userId}&colorId=${colorId}`);
// export const getPixelInARectangle = (x1: number, y1: number, x2: number, y2: number) => api.get(`/pixel/getInARectangle/?x1=${x1}&y1=${y1}&x2=${x2}&y2=${y2}`);
export const getPixelInARectangleAsArray = (x1: number, y1: number, x2: number, y2: number) => api.get<PixelInterface[][]>(`/pixel/getPixelsInRectangleAsArray?x1=${x1}&y1=${y1}&x2=${x2}&y2=${y2}`);