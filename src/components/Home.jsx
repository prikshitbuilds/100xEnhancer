import ImageUpload from "./ImageUpload";
import ImagePreview from "./ImagePreview";
import { useState } from "react";
import { enhancedImageAPI } from "../utils/enhanceImageApi";

const Home = () => {
    const [uploadImage, setUploadImage] = useState(null);
    const [enhancedImage, setEnhancedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const UploadImageHandler = async (file) => {
        try {
            setError(null);
            setUploadImage(URL.createObjectURL(file));
            setEnhancedImage(null);
            setLoading(true);
            
            const enhancedURL = await enhancedImageAPI(file);
            setEnhancedImage(enhancedURL);
            setLoading(false);
        } catch (error) {
            console.error('Enhancement error:', error);
            setError(error.message || "Error while enhancing the image. Please try again later.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                100x Enhancer
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Transform your images with cutting-edge AI technology. 
                        Enhance quality, resolution, and clarity in seconds.
                    </p>
                </div>

                {/* Main Content */}
                <div className="space-y-8">
                    <ImageUpload 
                        UploadImageHandler={UploadImageHandler}
                        isLoading={loading}
                    />
                    
                    <ImagePreview
                        loading={loading}
                        uploaded={uploadImage}
                        enhanced={enhancedImage?.image}
                        error={error}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;