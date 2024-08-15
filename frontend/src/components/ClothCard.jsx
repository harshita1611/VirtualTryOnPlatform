import React from "react";
// import clothes from "../assets/data/clothes.json"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';


const ClothCard=()=>{
    const [clothes, setClothes] = useState([]);
    const [selectedCard,setSelectedCard]=useState(null);
    const [uploadedImage, setUploadedImage]=useState(null);
    const [swappedImage, setSwappedImage] = useState(null);

    useEffect (()=>{
        axios.get('/data/clothes.json')
            .then(response=>{
                console.log(response.data)
                if(Array.isArray(response.data)){
                    setClothes(response.data);
                } else{
                    console.log("fetched data is not an array")
                }
            })
            .catch(error=>console.log('erroe in fetching data',error));
    },[]);

    const handleButtonClick=(item)=>{
        setSelectedCard(item.id);
    }

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Store the image in cookies
            Cookies.set('uploadedImage', file, { expires: 1 });
    
            // Save the image in state for display
            setUploadedImage(URL.createObjectURL(file));
    
            // Prepare form data to send to the backend
            const formData = new FormData();
            formData.append('target_image', '/path_to_target_image.jpg'); // Set the correct path
            formData.append('source_image', file);
    
            try {
                const response = await axios.post('http://localhost:5000/process-image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Image processed:', response.data);
                // You can now display the processed image from the response
            } catch (error) {
                console.error('Error processing image:', error);
            }
        }
    };
    
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('target', targetFile);
        formData.append('source', sourceFile);
    
        const response = await fetch('http://127.0.0.1:5000/upload', {
            method: 'POST',
            body: formData
        });
    
        const blob = await response.blob();
        const imageObjectURL = URL.createObjectURL(blob);
        setSwappedImage(imageObjectURL);
    };

    
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 ">

            {clothes.map((item)=>(
                <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden ">
                    <img src={item.image} alt={item.description} className="w-full h-64 object-cover" />
                    <div className="p-4">
                        <div className="flex justify-between">
                            <p className="text-gray-700">{item.description}</p>
                            <p className="text-gray-500">${item.price}</p> 
                        </div>
                        <button 
                        className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700"
                        onClick={()=>handleButtonClick(item)}

                        >Want to fit yourself in this fit? Click here
                        </button>
                        {selectedCard==item.id &&(
                            <div className="">
                                <p>Upload your photo which has your full face:</p>
                                <input className="mt-2" type="file" accept="image/*" onChange={handleImageUpload}/>
                                {uploadedImage &&(
                                    <img src={uploadedImage} alt="upload" className="mt-3 w-full h-64 object-cover"/>
                                )}
                            </div>
                        )}

                        {swappedImage && <img src={swappedImage} alt="Swapped" />}
                    </div>
                </div>
            ))}
            
        </div>
    )
}

export default ClothCard;