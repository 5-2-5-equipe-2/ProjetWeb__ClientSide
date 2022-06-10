import api from "./base";
import {convertToBase64} from "../components/utils";

interface FileInterface {
    file_name: string;
    file_content: string;
}


export const uploadImage = async (image: File) => {
    const base64 = await convertToBase64(image);
    const obj: FileInterface = {
            file_name: image.name,
            file_content: base64
        }
    return api.post("/upload_image.php",obj);
}
