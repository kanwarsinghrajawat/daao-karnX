"use client";

import { useState } from "react";
import { Play, FileText, ExternalLink, X } from "lucide-react";
import Image from "next/image";
import { DeployedProjectStaticInfo, UpcomingProjectStaticInfo } from "@/types/project";

interface PitchSectionProps {
  projectBasicInfo: DeployedProjectStaticInfo | UpcomingProjectStaticInfo;
}

const PitchSection = ({ projectBasicInfo }: PitchSectionProps) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const getVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = projectBasicInfo.demoVideoUrl ? getVideoId(projectBasicInfo.demoVideoUrl) : null;
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

  if (!projectBasicInfo.demoVideoUrl && !projectBasicInfo.pitchDeckUrl) {
    return null;
  }

  return (
    <>
      <div className="bg-[#1a1a1a] rounded-2xl p-6 ring-1 ring-slate-800/70">
        <h3 className="text-lg font-semibold text-slate-100 mb-6">Pitch Materials</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Demo Video */}
          {projectBasicInfo.demoVideoUrl && (
            <div className="group">
              <div 
                className="relative aspect-video rounded-lg overflow-hidden cursor-pointer bg-slate-800 ring-1 ring-slate-700/50 hover:ring-slate-600/50 transition-all"
                onClick={() => setIsVideoModalOpen(true)}
              >
                {thumbnailUrl ? (
                  <Image
                    src={thumbnailUrl}
                    alt={`${projectBasicInfo.name} Demo Video`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-700 to-slate-800">
                    <Play className="h-12 w-12 text-slate-400" />
                  </div>
                )}
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="bg-white/90 hover:bg-white rounded-full p-3 group-hover:scale-110 transition-transform">
                    <Play className="h-6 w-6 text-slate-900 ml-0.5" fill="currentColor" />
                  </div>
                </div>
                
                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  Demo Video
                </div>
              </div>
              
              <div className="mt-3">
                <h4 className="font-medium text-slate-200 mb-1">Project Demo</h4>
                <p className="text-sm text-slate-400">Watch our product demonstration</p>
              </div>
            </div>
          )}

          {/* Pitch Deck */}
          {projectBasicInfo.pitchDeckUrl && (
            <div className="group">
              <a
                href={projectBasicInfo.pitchDeckUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-blue-900/20 to-purple-900/20 ring-1 ring-slate-700/50 hover:ring-slate-600/50 transition-all group-hover:scale-[1.02]">
                  <div className="flex flex-col items-center justify-center h-full p-6">
                    <div className="bg-slate-800/50 rounded-full p-4 mb-4 group-hover:bg-slate-700/50 transition-colors">
                      <FileText className="h-8 w-8 text-blue-400" />
                    </div>
                    <h4 className="font-medium text-slate-200 text-center mb-2">Pitch Deck</h4>
                    <p className="text-sm text-slate-400 text-center">View our comprehensive presentation</p>
                  </div>
                  
                  {/* External link indicator */}
                  <div className="absolute top-3 right-3">
                    <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-slate-300" />
                  </div>
                  
                  {/* PDF badge */}
                  <div className="absolute bottom-2 left-2 bg-red-600/80 text-white text-xs px-2 py-1 rounded">
                    PDF
                  </div>
                </div>
              </a>
            </div>
          )}

          {/* Additional Links */}
          {(projectBasicInfo.websiteUrl || projectBasicInfo.whitePaperUrl) && (
            <div className="md:col-span-2">
              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800/50">
                {projectBasicInfo.websiteUrl && (
                  <a
                    href={projectBasicInfo.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-sm text-slate-300 hover:text-slate-200 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Visit Website
                  </a>
                )}
                {projectBasicInfo.whitePaperUrl && (
                  <a
                    href={projectBasicInfo.whitePaperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-sm text-slate-300 hover:text-slate-200 transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    White Paper
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && projectBasicInfo.demoVideoUrl && videoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-slate-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title={`${projectBasicInfo.name} Demo Video`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PitchSection;