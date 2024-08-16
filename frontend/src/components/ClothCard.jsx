import React,{useState,useEffect} from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import { useUser, SignInButton } from '@clerk/clerk-react';

const ClothCard=()=>{

   const { isSignedIn, user } = useUser();
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


   const handleButtonClick = (item) => {
    if (isSignedIn) {
        setSelectedCard(item.id);
        setEnlargedCard(item.id);
        setSwappedImage(null);
    }
};



   const handleImageUpload = (event)=>{
       const file = event.target.files[0];
       if (file){
           Cookies.set('uploadedImage',file,{expires:1});
           setUploadedImage(URL.createObjectURL(file));
           console.log(URL.createObjectURL(file))
       }
   }

   const handleUploadImage = async () => {
    const formData = new FormData();

    const targetImage = clothes.find(item => item.id === selectedCard)?.image;
    
    if (!targetImage) {
        console.error('Target image not found');
        return;
    }

    
    formData.append('target', targetImage);
    
    
    const sourceFile = document.querySelector('input[type="file"]').files[0];
    if (!sourceFile) {
        console.error('Source image not selected');
        return;
    }
    formData.append('source', sourceFile);

    try {
        const response = await axios.post('http://127.0.0.1:5000/face_swap', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'blob'
        });

        const imageObjectURL = URL.createObjectURL(response.data);
        setSwappedImage(imageObjectURL);
    } catch (error) {
        console.error('Error processing image:', error);
        if (error.response) {
            console.error('Server response:', error.response.data);
        }
    }
};

  
  
  
   const handleSubmit = async () => {
       const formData = new FormData();
       formData.append('target', targetFile);
       formData.append('source', sourceFile);
  
       const response = await fetch('http://127.0.0.1:5000/face_swap', {
           method: 'POST',
           body: formData
       });
  
       const blob = await response.blob();
       const imageObjectURL = URL.createObjectURL(blob);
       setSwappedImage(imageObjectURL);
   };


    const handleDeleteImage = () => {
        setUploadedImage(null);
        setSwappedImage(null);
        Cookies.remove('uploadedImage');
        // Reset the file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
            fileInput.value = '';
        }
    };


return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {clothes.map((item) => (
            <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
                <div className="h-96 overflow-hidden">
                    <img src={item.image} alt={item.description} className="w-full h-96 object-cover" />
                </div>
                <div className="p-4 flex-grow flex flex-col">
                    <div className="flex justify-between mb-2">
                        <p className="text-gray-700 font-semibold">{item.description}</p>
                        <p className="text-gray-500 font-bold">${item.price}</p>
                    </div>
                    {isSignedIn ? (
                        <button
                            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                            onClick={() => handleButtonClick(item)}
                        >
                            Want to fit yourself in this fit?<br></br> <span className="underline ">Click here!</span>
                        </button>
                    ) : (
                        <SignInButton mode="modal">
                            <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                                Sign in to try on
                            </button>
                        </SignInButton>
                    )}
                    {isSignedIn && selectedCard === item.id && (
                        <div className="mt-4">
                            <p className="mb-2">Upload your photo which has your full face:</p>
                            <div className="flex gap-2 justify-center">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-sm hover:bg-blue-700 transition duration-300">
                                    Choose File
                                    <input id="file-upload" className="hidden" type="file" accept="image/*" onChange={handleImageUpload} />
                                </label>
                                <span id="file-name" className="text-gray-500"></span>
                            </div>
                            {uploadedImage && (
                                <div className="mt-3">
                                    <img src={uploadedImage} alt="upload" className="w-full h-48 object-cover mb-2" />
                                    <div className='flex justify-between gap-3'>
                                        <button
                                            className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-700 flex-grow"
                                            onClick={handleUploadImage}
                                        >
                                            Upload 
                                        </button>
                                        <button
                                            className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700 flex-grow"
                                            onClick={handleDeleteImage}
                                        >
                                            Delete 
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {selectedCard === item.id && swappedImage && (
                        <img src={swappedImage} alt="Swapped" className="mt-12 w-full " />
                    )}
                </div>
            </div>
        ))}
    </div>
);
}


export default ClothCard;

