import {v2 as cloudinery} from 'cloudinary';
import fs from 'fs';

cloudinery.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const uploadImage = async (file) => {
    try {
    const result = await cloudinery.uploader.upload(file,{resource_type:"auto"});
    // console.log(result);
    console.log(result.secure_url);
    fs.unlinkSync(file);
    return result.secure_url;


    }
    catch (error) {
        fs.unlinkSync(file);
        console.log(error);
        throw new Error("Image upload failed");
    }

}
export {uploadImage}
