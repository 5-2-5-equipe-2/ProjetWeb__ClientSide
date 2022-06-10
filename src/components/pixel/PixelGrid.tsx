import React, {CSSProperties, useContext, useEffect, useState} from "react";
import {selectedPixelContext} from "../../pages/Pixels";
import {getPixelInARectangleAsArray} from "../../api/Pixel/Pixel";
import {useQuery} from "react-query";
import {FixedSizeGrid as Grid} from 'react-window';
import {getColors} from "../../api/Color/Color";
import {ColorInterface} from "../../api/Color/ColorInterface";
import {colors} from "@mui/material";


function PixelGrid() {
    const setSelectedPixel = useContext(selectedPixelContext).setSelectedPixel;
    const selectedPixel = useContext(selectedPixelContext).selectedPixel;
    const [colors, setColors] = useState({} as ColorInterface[]);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
        rowCount: 0,
        columnCount: 0,

    });

    const {data: pixelData} = useQuery(["pixelData"], async () => getPixelInARectangleAsArray(0, 0, 10, 10),
        {
            refetchInterval: 1000,
            refetchOnWindowFocus: false,
        }
    );
    const {data: colorsData} = useQuery(["colors"], getColors,
        {
            refetchInterval: 1000,
            refetchOnWindowFocus: false,
        }
    );

    useEffect(() => {
        return () => {

            let data = colorsData?.data.reduce(function (result, item, index, array) {
                result[item.id] = item;
                return result;
            }, {} as ColorInterface[]);
            if (data) {
                setColors(data);
            }
        };
    }, [colorsData]);

    useEffect(() => {
        return () => {
            if (colors) {
                console.log(colors[1]);
            }
        };
    }, [colors]);


    useEffect(() => {
        return () => {
            if (pixelData?.data && pixelData.data.length > 0) {
                console.log("pixelData.data", pixelData.data);
                setDimensions({
                    width: 0,
                    height: 0,
                    rowCount: pixelData.data.length,
                    columnCount: pixelData.data[0].length,
                });
            }
        };
    }, [pixelData]);


    const PixelRenderer = ({
                               columnIndex,
                               rowIndex,
                               style
                           }: { columnIndex: number, rowIndex: number, style: CSSProperties }) => {
        const pixel = pixelData?.data[rowIndex][columnIndex];
        let color = "#000000";
        if (pixel) {
            color = colors[pixel.color_id]?.hex_code;
        }


        return (
            <div
                style={style}
            >{colors &&


                <div
                    style={{
                        backgroundColor: color,
                        width: "100%",
                        height: "100%",
                    }}
                    onClick={() => {
                        if (pixelData) {
                            setSelectedPixel(pixelData.data[rowIndex][columnIndex]);
                        }
                    }
                    }
                />}
            </div>
        );
    };

    return (
        <>

            <selectedPixelContext.Provider
                value={{"selectedPixel": selectedPixel, "setSelectedPixel": setSelectedPixel}}>
                <Grid
                    className="Grid"
                    columnCount={dimensions.columnCount}
                    columnWidth={100}
                    height={500}
                    rowCount={dimensions.rowCount}
                    rowHeight={35}
                    width={500}
                >
                    {PixelRenderer}
                </Grid>
            </selectedPixelContext.Provider>

        </>)
}

export default PixelGrid;