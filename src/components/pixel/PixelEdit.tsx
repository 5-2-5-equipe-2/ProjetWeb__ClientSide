import React, {CSSProperties, useContext, useState} from "react";
import {selectedPixelContext} from "../../pages/Pixels";
import {Button, Grid, Paper, Stack, Typography} from "@mui/material";
import {ColorInterface} from "../../api/Color/ColorInterface";
// import {TransitionGroup} from "react-transition-group";
import {useMutation} from "react-query";
import {updatePixel} from "../../api/Pixel/Pixel";
import {useSnackbar} from "notistack";
import { AxiosError} from "axios";
import {PixelUpdateInterface} from "../../api/Pixel/PixelInterface";
import {loggedInUserContext} from "../../App";


const PixelEdit = () => {
    let selectedPixel = useContext(selectedPixelContext).selectedPixel;
    let colors = useContext(selectedPixelContext).colorData;
    let loggedInUser = useContext(loggedInUserContext).loggedInUser;
    const [selectedColor, setSelectedColor] = useState(null as ColorInterface | null);
    const {enqueueSnackbar} = useSnackbar();

    function SingleColor({color}: { color: ColorInterface }) {
        let pixelStyle: CSSProperties = {
            backgroundColor: color.hex_code,
            width: "30px",
            height: "30px",
            border: "1px solid black",
            boxSizing: "border-box",
        }

        if (color === selectedColor) {
            pixelStyle.border = "5px solid red";
            pixelStyle.zIndex = "100";
        }

        return (
            <div
                onClick={() => {
                    setSelectedColor(color);
                }
                }

                key={color.id}
                style={pixelStyle}

            >
            </div>
        )
    }

    const {mutate: updatePixelColorMutate} = useMutation(updatePixel, {
        onSuccess: () => {
            enqueueSnackbar("Pixel updated", {variant: "success"});
        },
        onError: (error: AxiosError) => {
            if (error.response) {
                // @ts-ignore
                enqueueSnackbar(error.response.data.error, {variant: "error"});
            } else {
                enqueueSnackbar(error.message, {variant: "error"});
            }
        }
    })

    function onButtonClick() {
        if (selectedPixel && selectedColor) {
            let newPixel: PixelUpdateInterface = {
                x: selectedPixel.x_position,
                y: selectedPixel.y_position,
                color_id: selectedColor?.id,
                user_id: loggedInUser?.id,
            }
            updatePixelColorMutate(newPixel);
        } else {
            enqueueSnackbar("Please select a pixel and color", {variant: "error"});
        }


    }

    return (<Paper
            style={{
                padding: "10px",
                margin: "10px",
                border: "1px solid black",
                boxSizing: "border-box",
            }}>

            <Grid container spacing={2}
                  direction="column"
                  justifyContent={'center'}
                  alignItems={'center'}

            >
                <Grid item><Typography>Chose Color</Typography></Grid>
                <Grid item xs={4}>
                    <Stack direction={'row'}>
                        {(colors) && colors.map(color => (
                            <SingleColor color={color} key={color.id}/>

                        ))}

                    </Stack>
                </Grid>
                <Grid item>
                    <Button onClick={onButtonClick}>
                        Save
                    </Button>

                </Grid>

            </Grid></Paper>
    )
}

export default PixelEdit;