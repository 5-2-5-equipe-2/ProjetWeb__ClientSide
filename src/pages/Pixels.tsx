import PixelGrid from "../components/pixel/PixelGrid";
import React, {useState} from "react";
import PixelInterface from "../api/Pixel/PixelInterface";

export const selectedPixelContext = React.createContext({
    selectedPixel: null as PixelInterface | null,
    setSelectedPixel: (pixel: PixelInterface) => {
        console.log(pixel);
    }

});

export default function Pixels() {
    const [selectedPixel, setSelectedPixel] = useState(null as PixelInterface | null);

    return (
        <selectedPixelContext.Provider value={{"selectedPixel": selectedPixel, "setSelectedPixel": setSelectedPixel}}>
            <PixelGrid/>
        </selectedPixelContext.Provider>
    )
}