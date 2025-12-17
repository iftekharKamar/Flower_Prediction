import React, { useState, useRef } from 'react';
import predict from '../api/imageApi';

const ImageUploader = () => {
    const [image, setImage] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);
    const fileInputRef = useRef(null);

    const processFile = (selectedFile) => {
        if (selectedFile && selectedFile.type.startsWith("image/")) {
            setFile(selectedFile);
            setData(null);
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target.result);
            reader.readAsDataURL(selectedFile);
        }
    };

    const handlePredict = async () => {
        if (!file) return;
        setIsLoading(true);
        try {
            const result = await predict(file);
            setData(result);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">

                {/* 1. Header Section */}
                <div className="pt-10 pb-6 px-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Image Analyzer</h1>
                    <p className="text-gray-500 text-sm mt-1">Harness AI to identify objects in seconds</p>
                </div>

                <div className="px-10 pb-10 space-y-6">
                    {/* 2. Enhanced Drop Zone */}
                    <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => { e.preventDefault(); setIsDragging(false); processFile(e.dataTransfer.files[0]); }}
                        onClick={() => fileInputRef.current.click()}
                        className={`
                            relative group cursor-pointer rounded-[2rem] h-72 transition-all duration-500 ease-out border-2 border-dashed
                            ${isDragging ? 'border-blue-500 bg-blue-50/50 scale-95' : 'border-gray-200 bg-gray-50/50 hover:bg-white hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-100/50'}
                        `}
                    >
                        {image ? (
                            <div className="relative w-full h-full p-3 overflow-hidden rounded-[2rem]">
                                <img src={image} alt="Preview" className="w-full h-full object-cover rounded-[1.8rem]" />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setImage(null); setFile(null); setData(null); }}
                                        className="bg-white/90 hover:bg-red-500 hover:text-white text-gray-900 px-4 py-2 rounded-full font-medium transition-all"
                                    >
                                        Replace Image
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full space-y-3">
                                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-500">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                </div>
                                <div className="text-center px-4">
                                    <p className="text-gray-900 font-semibold">Drop image here</p>
                                    <p className="text-gray-400 text-xs mt-1">PNG, JPG, or WEBP up to 10MB</p>
                                </div>
                            </div>
                        )}
                        <input type="file" className="hidden" ref={fileInputRef} onChange={(e) => processFile(e.target.files[0])} accept="image/*" />
                    </div>

                    {/* 3. Prediction Action */}
                    {!data && (
                        <button
                            onClick={handlePredict}
                            disabled={!image || isLoading}
                            className={`
                                w-full py-4 rounded-2xl font-bold text-white transition-all shadow-xl
                                ${!image || isLoading ? 'bg-gray-200 shadow-none cursor-not-allowed text-gray-400' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200 active:scale-95'}
                            `}
                        >
                            {isLoading ? 'Analyzing...' : 'Identify Object'}
                        </button>
                    )}

                    {/* 4. Result Section (Premium Glassmorphism) */}
                    {data && (
                        <div className="max-w-md mx-auto animate-in fade-in zoom-in-95 duration-500">
                            <div className="bg-blue-600 rounded-3xl p-8 shadow-xl border border-slate-100">

                                {/* Header Section */}
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <p className="text-white text-3xl font-bold uppercase tracking-wider mb-2">Result</p>
                                        <h3 className="text-xl font-bold text-slate-800 capitalize text-white">
                                            {data.prediction}
                                        </h3>
                                    </div>

                                    {/* Reset Button */}
                                    <button
                                        onClick={() => { setImage(null); setFile(null); setData(null); }}
                                        className="p-2 rounded-full hover:bg-red-700 text-white transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>


                            </div>
                        </div>
                    )}
                    {/* 5. Enhanced Loading State (The Laser Scan) */}
                    {isLoading && (
                        <div className="relative py-8 flex flex-col items-center animate-pulse">
                            <div className="flex space-x-3 mb-4">
                                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                                <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
                            </div>
                            <span className="text-blue-600 font-black text-xs tracking-[0.4em] uppercase">
                                Decrypting Pixels...
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;