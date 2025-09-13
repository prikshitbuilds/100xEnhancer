import Loading from "./Loading";
import { Download, Upload, Zap, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const ImagePreview = (props) => {
    const [imageLoaded, setImageLoaded] = useState({
        original: false,
        enhanced: false
    });

    const downloadImage = () => {
        if (props.enhanced) {
            const link = document.createElement('a');
            link.href = props.enhanced;
            link.download = 'enhanced-image.png';
            link.click();
        }
    };

    return (
        <div className="mt-12 w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Original Image Card */}
                <div className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-4">
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <div className="w-3 h-3 bg-gray-400 rounded-full mr-3"></div>
                            Original Image
                        </h2>
                    </div>

                    <div className="relative">
                        {props.uploaded ? (
                            <div className="relative">
                                <img
                                    src={props.uploaded}
                                    alt="Original"
                                    className={`w-full h-80 object-cover transition-all duration-500 ${
                                        imageLoaded.original ? 'opacity-100' : 'opacity-0'
                                    }`}
                                    onLoad={() => setImageLoaded(prev => ({ ...prev, original: true }))}
                                />
                                {!imageLoaded.original && (
                                    <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-80 bg-gradient-to-br from-gray-50 to-gray-100">
                                <div className="p-4 bg-gray-200 rounded-full mb-4">
                                    <Upload className="w-8 h-8 text-gray-400" />
                                </div>
                                <p className="text-gray-500 font-medium">No Image Selected</p>
                                <p className="text-sm text-gray-400 mt-1">Upload an image to get started</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Enhanced Image Card */}
                <div className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                        <h2 className="text-xl font-bold text-white flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-blue-300 rounded-full mr-3 animate-pulse"></div>
                                Enhanced Image
                            </div>
                            {props.enhanced && !props.loading && (
                                <button
                                    onClick={downloadImage}
                                    className="p-2 hover:bg-blue-500 rounded-lg transition-colors duration-200"
                                    title="Download Enhanced Image"
                                >
                                    <Download className="w-5 h-5" />
                                </button>
                            )}
                        </h2>
                    </div>

                    <div className="relative">
                        {props.loading ? (
                            <Loading />
                        ) : props.enhanced ? (
                            <div className="relative">
                                <img
                                    src={props.enhanced}
                                    alt="Enhanced"
                                    className={`w-full h-80 object-cover transition-all duration-500 ${
                                        imageLoaded.enhanced ? 'opacity-100' : 'opacity-0'
                                    }`}
                                    onLoad={() => setImageLoaded(prev => ({ ...prev, enhanced: true }))}
                                />
                                {!imageLoaded.enhanced && (
                                    <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
                                )}
                                {/* Success indicator */}
                                <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full shadow-lg">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                            </div>
                        ) : props.error ? (
                            <div className="flex flex-col items-center justify-center h-80 bg-gradient-to-br from-red-50 to-pink-50">
                                <div className="p-4 bg-red-100 rounded-full mb-4">
                                    <AlertCircle className="w-8 h-8 text-red-500" />
                                </div>
                                <p className="text-red-600 font-medium text-center px-4">
                                    Enhancement Failed
                                </p>
                                <p className="text-sm text-red-400 mt-1 text-center px-4">
                                    {props.error || "Please try again with a different image"}
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-80 bg-gradient-to-br from-blue-50 to-indigo-50">
                                <div className="p-4 bg-blue-100 rounded-full mb-4">
                                    <Zap className="w-8 h-8 text-blue-500" />
                                </div>
                                <p className="text-blue-600 font-medium">Ready for Enhancement</p>
                                <p className="text-sm text-blue-400 mt-1">Upload an image to see the magic happen</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Progress Indicator */}
            {props.uploaded && (
                <div className="mt-8 flex items-center justify-center space-x-4">
                    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                        props.uploaded ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Image Uploaded</span>
                    </div>
                    
                    <div className={`w-12 h-0.5 transition-all duration-500 ${
                        props.loading ? 'bg-blue-500 animate-pulse' : props.enhanced ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                    
                    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                        props.enhanced ? 'bg-green-100 text-green-700' : props.loading ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                        {props.loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
                                <span className="text-sm font-medium">Enhancing...</span>
                            </>
                        ) : props.enhanced ? (
                            <>
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="text-sm font-medium">Enhancement Complete</span>
                            </>
                        ) : (
                            <>
                                <Zap className="w-4 h-4" />
                                <span className="text-sm font-medium">Ready to Enhance</span>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImagePreview;