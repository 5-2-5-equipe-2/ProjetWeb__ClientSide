import PixelGrid from "../components/pixel/PixelGrid";
import React, {useState} from "react";
import PixelInterface from "../api/Pixel/PixelInterface";
import {ColorInterface} from "../api/Color/ColorInterface";
import {useQuery} from "react-query";
import {getColors} from "../api/Color/Color";
import PixelEdit from "../components/pixel/PixelEdit";
import {Grid} from "@mui/material";

export const selectedPixelContext = React.createContext({
    selectedPixel: null as PixelInterface | null,
    setSelectedPixel: (pixel: PixelInterface) => {
        console.log(pixel);
    },
    colors: [] as ColorInterface[],
    colorData: [] as ColorInterface[],

});

export default function Pixels() {
    const [selectedPixel, setSelectedPixel] = useState(null as PixelInterface | null);
    const [colors, setColors] = useState({} as ColorInterface[]);
    const {data: colorsData,} = useQuery(["colors"], async () => {
            // console.log(data)
            return (await getColors())?.data;
        },
        {
            refetchInterval: 1000,
            notifyOnChangeProps: undefined,
            onSuccess: () => {
                if (colorsData) {
                    let data = colorsData.reduce(function (result, item,) {
                        result[item.id] = item;
                        return result;
                    }, {} as ColorInterface[]);
                    if (data) {
                        setColors(data);
                    }
                }
            }
        }
    );

    return (
        <selectedPixelContext.Provider
            value={{
                "selectedPixel": selectedPixel,
                "setSelectedPixel": setSelectedPixel,
                "colors": colors,
                "colorData": colorsData || []
            }}>
            <Grid container
                  direction={'column'}
            >
                <Grid item xs={9}><PixelGrid/></Grid>
                <Grid item xs={2}><PixelEdit/></Grid>

            </Grid>
        </selectedPixelContext.Provider>
    )
}