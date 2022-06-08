// Yup form to create the chatroom
import * as Yup from "yup";
import {mixed} from "yup";
import {useContext} from "react";
import {loggedInUserContext} from "../../../App";
import {selectedChatRoomContext} from "../../../pages/Chat";
import {FieldValues, UnpackNestedValue, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {useMutation} from "react-query";
import {ChatRoomUrlResponse, joinChatRoomByUrl} from "../../../api/ChatRoom/ChatRoom";
import {Button, Grid, TextField} from "@mui/material";

const validationSchema = Yup.object().shape({
    url: Yup.string()
        .required('Url is required')
        .min(3, 'Name must be at least 3 characters'),


});


export default function JoinChatRoomByURLTab() {
    const loggedInUser = useContext(loggedInUserContext).loggedInUser;
    const chatroom = useContext(selectedChatRoomContext).selectedChatRoom;
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const {mutateAsync: mutateUrl, data: queryResponseData} = useMutation(
        joinChatRoomByUrl,
        {
            onSuccess: data => {
                console.log(data)
            }
        }
    )

    const onSubmit = async (data: any) => {
        await mutateUrl(data.url)
    }

    return (<form>
            <Grid container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
            >

                <Grid item sx={
                    {
                        width: '100%',
                    }
                }>
                    <TextField
                        fullWidth
                        label={'URL'}
                        {...register('url', {
                            required: true,
                        })}
                    />
                </Grid>

                <Grid item sx={
                    {
                        width: '100%',
                    }
                }>
                    <Button
                        variant="contained"
                        sx={{
                            width: "100%"
                        }}

                        onClick={handleSubmit(onSubmit)}
                    >Join</Button>

                </Grid>
            </Grid>


        </form>


    )

}