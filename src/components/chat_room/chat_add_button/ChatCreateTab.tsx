

// Yup form to edit the chatroom
import * as Yup from "yup";
import {mixed} from "yup";
import {useContext} from "react";
import {selectedChatRoomContext} from "../../../pages/Chat";
import {yupResolver} from "@hookform/resolvers/yup";
import {Grid, TextField} from "@mui/material";
import {useForm} from "react-hook-form";


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

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data: any) => {
        console.log(data);

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    name="name"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    error={errors.name !== undefined}
                    helperText={errors.name?.message}
                    inputRef={register}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="description"
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    error={errors.description !== undefined}
                    helperText={errors.description?.message}
                    inputRef={register}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="image"
                    label="Image"
                    variant="outlined"
                    fullWidth
                    error={errors.image !== undefined}
                    helperText={errors.image?.message}
                    inputRef={register}
                />
            </Grid>
        </Grid>
        <button type="submit">Submit</button>
        </form>
    )
}