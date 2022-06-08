// Yup form to edit the chatroom
import * as Yup from "yup";
import {mixed} from "yup";
import {useContext, useEffect, useRef, useState} from "react";
import {selectedChatRoomContext} from "../../../pages/Chat";
import {yupResolver} from "@hookform/resolvers/yup";
import {Box, Button, Grid, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {convertToBase64} from "../../utils";
import ChatRoomInterface from "../../../api/ChatRoom/ChatRoomInterface";
import {loggedInUserContext} from "../../../App";


// Yup form to create the chatroom
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required')
        .max(50, 'Name must be less than 50 characters')
        .min(3, 'Name must be at least 3 characters'),

    description: Yup.string()
        .max(200, 'Description must be less than 200 characters'),

    image: mixed().test("fileSize", "The file is too large", (value: any) => {
        if (!value.length) return true // attachment is optional
        return value[0].size <= 2000000
    })

});


export default function ChatCreateTab() {
    const chatRoom = useContext(selectedChatRoomContext).selectedChatRoom;
    const loggedInUser = useContext(loggedInUserContext).loggedInUser;

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    useEffect(() => {
        return () => {
            register("name", {required: true});
            register('description');
            register('image');

        };
    }, [register]);


    const onSubmit = async (data: any) => {
        let newChatRoom: ChatRoomInterface = {
            id: -1,
            name: data.name,
            description: data.description,
            owner_id: loggedInUser.id,
            image: "",
            is_private: data.is_private,
        }
        if (selectedImage) {
            convertToBase64(selectedImage).then(base64 => {
                newChatRoom.image = base64?.toString();
            });
            // newChatRoom.image = base64;
        }


    }
    const [selectedImage, setSelectedImage] = useState(null as File | null);
    const [imageUrl, setImageUrl] = useState(null as string | null);

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);
    return (
        <form>
            <Grid container spacing={3}
                  alignItems={'center'}
                  justifyContent={'center'}
            >
                <Grid item xs={12}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        error={errors.name !== undefined}
                        helperText={errors.name?.message}
                        {...register("name", {
                            required: true,
                        })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        error={errors.description !== undefined}
                        helperText={errors.description?.message}
                        {...register("description", {
                            required: true,
                        })}
                    />
                </Grid>
                <Grid item xs={12}
                >
                    <Grid container
                          justifyContent={'center'}
                          alignItems={'center'}
                    ><Grid item>
                        <input
                            {...register("image", {
                                    required: true,
                                }
                            )}
                            accept="image/*"
                            type="file"
                            id="select-image"
                            style={{display: 'none'}}
                            onChange={async e => {
                                if (e.target.files) {
                                    setSelectedImage(e?.target?.files[0]);
                                    await register("image").onChange(e);
                                }
                            }}

                        />
                        <label htmlFor="select-image">
                            <Button variant="contained" color="secondary" component="span"
                            >
                                Upload Image
                            </Button>

                        </label>
                        {imageUrl && selectedImage && (
                            <Box mt={2} textAlign="center">
                                <div>Image Preview:</div>
                                <img src={imageUrl} alt={selectedImage.name} height="100px"/>
                            </Box>
                        )}</Grid></Grid>
                </Grid>
                <Grid item
                      sx={{
                          width: "100%"
                      }}
                ><Button variant="contained"
                         sx={{
                             width: "100%"
                         }}

                         onClick={handleSubmit(onSubmit)}
                >Create</Button></Grid>

            </Grid>
        </form>
    )
}