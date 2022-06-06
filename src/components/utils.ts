import {waitFor} from "@testing-library/react";

export function convertToBase64(file: File) {
    return new Promise((resolve: (value: string) => void) => {
            let baseURL = null;
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                baseURL = reader.result;
                if (baseURL) {
                    resolve(baseURL.toString());
                }
            };
        }
    );


}