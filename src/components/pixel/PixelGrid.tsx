import React, {CSSProperties, useContext, useEffect, useRef, useState} from "react";
import {selectedPixelContext} from "../../pages/Pixels";
import {getPixelInARectangleAsArray} from "../../api/Pixel/Pixel";
import {useQuery} from "react-query";
import {FixedSizeGrid as Grid} from 'react-window';
import {getColors} from "../../api/Color/Color";
import {ColorInterface} from "../../api/Color/ColorInterface";
import {Box, CircularProgress, Slider} from "@mui/material";
import PixelInterface from "../../api/Pixel/PixelInterface";

const marks = [
    {
        value: 10,
        label: 'Dead',
    },
    {
        value: 20,
        label: 'ok',
    },
    {
        value: 37,
        label: 'Performance',
    },
    {
        value: 100,
        label: 'Yes',
    },
];

function valuetext(value: number) {
    return `${value} px`;
}

function PixelGrid() {
    const setSelectedPixel = useContext(selectedPixelContext).setSelectedPixel;
    const selectedPixel = useContext(selectedPixelContext).selectedPixel;
    const [colors, setColors] = useState({} as ColorInterface[]);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
        rowCount: 220,
        columnCount: 220,

    });
    const [gridSize, setGridSize] = useState(35);
    const containerDiv = useRef<HTMLElement>(null);

    const {data: pixelData, isLoading} = useQuery(["pixelData"], async () => {

            let output: PixelInterface[][] = [] as PixelInterface[][];
            let lines = [] as PixelInterface[][][];
            for (let i = 0; i < 10; i++) {
                let line = (await getPixelInARectangleAsArray(i * 10, 0, 10 + i * 10 -1, 999))?.data;
                if (line) {
                    lines.push(line);
                }
            }
            output = lines.flat();
            return output;
        },
        {
            refetchInterval: 1000,
            onSuccess: (data) => {
                setDimensions({
                    width: data[0].length * 35,
                    height: data.length * 35,
                    rowCount: data[0].length,
                    columnCount: data.length,
                })
            },
            notifyOnChangeProps: undefined,
        }
    );
    const {data: colorsData, isLoading: isColorsLoading} = useQuery(["colors"], async () => {
            // console.log(data)
            return (await getColors())?.data;
        },
        {
            refetchInterval: 1000,
            notifyOnChangeProps: undefined,
            onSuccess: (data) => {
                if (colorsData) {
                    let data = colorsData.reduce(function (result, item, index, array) {
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

    const PixelRenderer = ({
                               columnIndex,
                               rowIndex,
                               style
                           }: { columnIndex: number, rowIndex: number, style: CSSProperties }) => {
            let color: string = "";
            let pixel: PixelInterface | undefined;
            if (pixelData) {
                pixel = pixelData[columnIndex][rowIndex];
                if (pixel && colorsData) {
                    // console.log("pixel", colors);
                    color = colors[pixel.color_id]?.hex_code;
                    // console.log("color", color);
                }
            }

            let pixelStyle: CSSProperties = {
                backgroundColor: color,
                width: "100%",
                height: "100%",
                border: "1px solid black",
                boxSizing: "border-box",
            }

            if (pixel && selectedPixel?.x_position === pixel.x_position && selectedPixel?.y_position === pixel.y_position) {
                // pixelStyle.backgroundColor = "red";
                pixelStyle.border = "5px solid red";
                pixelStyle.width = "100%";
                pixelStyle.height = "100%";
                // pixelStyle.borderRadius = "50%";
                pixelStyle.zIndex = "100";
            }

            return (
                <div
                    style={{
                        ...style,
                        zIndex: "100",
                    }}
                >{colors &&


                    <div
                        style={pixelStyle}
                        onClick={() => {
                            if (pixel) {
                                console.log(pixel)
                                setSelectedPixel(pixel);
                            }
                        }
                        }
                    />}
                </div>
            );

        }
    ;

    return (
        <>

            <selectedPixelContext.Provider
                value={{"selectedPixel": selectedPixel, "setSelectedPixel": setSelectedPixel}}>

                {isLoading &&
                    <div
                    >
                        <CircularProgress></CircularProgress>
                    </div>
                }
                <Slider aria-label="Grid size" value={gridSize}
                        getAriaValueText={valuetext}
                        step={10}
                        min={10}
                        valueLabelDisplay="auto"
                        marks={marks}
                        onChange={(event, value) => {
                            setGridSize(value as number);
                        }}/>
                <Box sx={{
                    width: "100vw",
                    height: "80vh",
                }} ref={containerDiv}>
                    <Grid
                        className="Grid"

                        columnCount={dimensions.columnCount}
                        columnWidth={gridSize}
                        height={containerDiv?.current?.offsetHeight || 0}
                        rowCount={dimensions.rowCount}
                        rowHeight={gridSize}
                        width={containerDiv?.current?.offsetWidth || 0}
                    >
                        {PixelRenderer}
                    </Grid>
                </Box>
            </selectedPixelContext.Provider>

        </>)
}

export default PixelGrid;