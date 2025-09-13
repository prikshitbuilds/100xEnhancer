const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-80 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-400 rounded-full animate-spin" style={{animationDelay: '150ms'}}></div>
            </div>
            <p className="mt-4 text-blue-700 font-medium animate-pulse">Enhancing your image...</p>
            <div className="mt-2 flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '100ms'}}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '200ms'}}></div>
            </div>
        </div>
    );
};

export default Loading;