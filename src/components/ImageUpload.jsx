import { useState } from "react";
import { Upload } from "lucide-react";

const ImageUpload = ({ UploadImageHandler, isLoading }) => {
    const [dragOver, setDragOver] = useState(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0 && !isLoading) {
            UploadImageHandler(files[0]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        if (!isLoading) {
            setDragOver(true);
        }
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file && !isLoading) {
            UploadImageHandler(file);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div
                className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ease-in-out ${
                    dragOver
                        ? "border-blue-400 bg-blue-50 scale-105"
                        : "border-gray-300 hover:border-blue-300 hover:bg-blue-25"
                } ${isLoading ? "pointer-events-none opacity-50" : ""}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className={`p-4 rounded-full transition-colors duration-300 ${
                        dragOver ? "bg-blue-100" : "bg-gray-100"
                    }`}>
                        <Upload className={`w-12 h-12 transition-colors duration-300 ${
                            dragOver ? "text-blue-600" : "text-gray-500"
                        }`} />
                    </div>
                    
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Upload Your Image
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Drag and drop your image here, or click to browse
                        </p>
                        <p className="text-sm text-gray-500">
                            Supports JPG, PNG, WebP (Max 10MB)
                        </p>
                    </div>

                    <label className={`inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 cursor-pointer ${
                        isLoading 
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                            : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg hover:scale-105"
                    }`}>
                        <Upload className="w-5 h-5 mr-2" />
                        {isLoading ? "Processing..." : "Choose File"}
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileSelect}
                            disabled={isLoading}
                        />
                    </label>
                </div>

                {dragOver && !isLoading && (
                    <div className="absolute inset-0 bg-blue-100 bg-opacity-50 rounded-2xl flex items-center justify-center">
                        <div className="text-blue-600 font-semibold text-lg">
                            Drop your image here!
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;