"use client";

import { useState } from "react";
import { Play, FileText, Download, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
// import Image from "next/image";

// Demo Video Player Component
export const DemoVideoPlayer = ({ 
  videoUrl, 
  title, 
  thumbnail 
}: { 
  videoUrl: string; 
  title: string; 
  thumbnail?: string; 
}) => {
  // const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(videoUrl);
  const thumbnailUrl = thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '');

  return (
    <>
      <div className="relative group cursor-pointer" onClick={() => setIsModalOpen(true)}>
        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-[#1b1b1b] ring-1 ring-slate-800">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              // Internet-hosted fallback to avoid local file dependency
              target.src = 'https://via.placeholder.com/1280x720?text=Video+Unavailable';
            }}
          />
          
          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Play className="h-8 w-8 text-white" fill="white" />
            </div>
          </div>
          
          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <h3 className="text-white font-medium text-sm">{title}</h3>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-slate-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            
            <div className="relative w-full h-0 pb-[56.25%] rounded-xl overflow-hidden">
              {videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={videoUrl}
                  className="absolute inset-0 w-full h-full object-cover"
                  controls
                  autoPlay
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Pitch Deck Viewer/Download Component
export const PitchDeckViewer = ({ 
  pitchDeckUrl, 
  title 
}: { 
  pitchDeckUrl: string; 
  title: string; 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = () => {
    window.open(pitchDeckUrl, '_blank');
  };

  const handleView = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-[#1a1a1a] rounded-xl p-6 ring-1 ring-slate-800/70">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#141414] rounded-lg flex items-center justify-center ring-1 ring-slate-800/50">
            <FileText className="h-8 w-8 text-slate-400" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium text-slate-200 mb-1">{title}</h3>
            <p className="text-sm text-slate-400">Pitch Deck PDF</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleView}
              className="px-3 py-2 bg-[#141414] hover:bg-[#252525] rounded-lg ring-1 ring-slate-800/70 text-slate-300 hover:text-slate-200 transition-colors text-sm flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              View
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors text-sm flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl h-[80vh] mx-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-slate-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            
            <div className="w-full h-full bg-white rounded-xl overflow-hidden">
              <iframe
                src={`${pitchDeckUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                className="w-full h-full"
                title={title}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Project Image Gallery Component
export const ProjectImageGallery = ({ 
  images, 
  title 
}: { 
  images: string[]; 
  title: string; 
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-video cursor-pointer group"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image}
                alt={`${title} ${index + 1}`}
                className="w-full h-full object-cover rounded-lg ring-1 ring-slate-800/70 group-hover:ring-slate-700 transition-all"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  // Internet-hosted fallback to avoid local file dependency
                  target.src = 'https://via.placeholder.com/800x450?text=Image+Unavailable';
                }}
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <ExternalLink className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl mx-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-slate-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            
            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
            
            <div className="relative">
              <img
                src={images[selectedImage]}
                alt={`${title} ${selectedImage + 1}`}
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
              
              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                {selectedImage + 1} / {images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Combined Media Section Component
export const ProjectMediaSection = ({
  demoVideoUrl,
  pitchDeckUrl,
  images,
  projectName,
}: {
  demoVideoUrl?: string;
  pitchDeckUrl?: string;
  images?: string[];
  projectName: string;
}) => {
  return (
    <div className="space-y-8">
      {/* Demo Video */}
      {demoVideoUrl && (
        <div>
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Demo Video</h3>
          <DemoVideoPlayer
            videoUrl={demoVideoUrl}
            title={`${projectName} Demo`}
          />
        </div>
      )}

      {/* Pitch Deck */}
      {pitchDeckUrl && (
        <div>
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Pitch Deck</h3>
          <PitchDeckViewer
            pitchDeckUrl={pitchDeckUrl}
            title={`${projectName} Pitch Deck`}
          />
        </div>
      )}

      {/* Image Gallery */}
      {images && images.length > 0 && (
        <ProjectImageGallery
          images={images}
          title={`${projectName} Gallery`}
        />
      )}
    </div>
  );
};