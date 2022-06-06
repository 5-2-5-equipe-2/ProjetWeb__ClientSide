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


function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

// export function stringAvatar(name: string) {
//     return {
//         children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
//     };
// }