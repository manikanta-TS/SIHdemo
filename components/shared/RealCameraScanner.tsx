'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  RefreshCw,
  Check,
  X,
  Upload,
  AlertCircle,
  Sparkles,
  FlipHorizontal,
  Image as ImageIcon,
  ShieldCheck,
  Maximize2,
} from 'lucide-react';
import { toast } from 'sonner';

interface RealCameraScannerProps {
  onCapture: (imageDataUrl: string) => void;
  onClose?: () => void;
}

export function RealCameraScanner({ onCapture, onClose }: RealCameraScannerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Clean up media stream tracks
  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  }, []);

  // Request & Start real camera
  const startCamera = useCallback(async (mode: 'environment' | 'user') => {
    setIsLoading(true);
    setCameraError(null);
    setPermissionDenied(false);

    // Stop any existing stream before starting a new one
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Browser camera API is not supported in this environment. Please use device upload.');
      setIsLoading(false);
      return;
    }

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: mode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(() => {});
          setIsStreaming(true);
          setIsLoading(false);
        };
      }
    } catch (err: unknown) {
      const error = err as { name?: string; message?: string };
      console.warn('Camera access error:', error);
      setIsLoading(false);
      setIsStreaming(false);

      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setPermissionDenied(true);
        setCameraError('Camera access permission was denied. You can grant access in browser permissions or use the device upload option below.');
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setCameraError('No video camera hardware detected on this device. Please use direct photo upload.');
      } else {
        setCameraError(error.message || 'Unable to access live camera stream. You can upload an image file instead.');
      }
    }
  }, []);

  // Initialize camera on mount
  useEffect(() => {
    startCamera(facingMode);
    return () => {
      stopStream();
    };
  }, [facingMode, startCamera, stopStream]);

  // Flip camera (environment <-> user)
  const toggleFacingMode = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
  };

  // Capture photo from live video feed onto canvas
  const handleCapture = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');
    canvasRef.current = canvas;

    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // If user-facing, mirror horizontally for natural preview
    if (facingMode === 'user') {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, width, height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

    setCapturedImage(dataUrl);
    stopStream();
    toast.success('Craft photograph captured successfully!');
  };

  // Retake photo
  const handleRetake = () => {
    setCapturedImage(null);
    startCamera(facingMode);
  };

  // Confirm photo and send to parent
  const handleConfirm = () => {
    if (capturedImage) {
      stopStream();
      onCapture(capturedImage);
    }
  };

  // File input fallback (device gallery / camera capture)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (JPG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        stopStream();
        setCapturedImage(dataUrl);
        setCameraError(null);
        setPermissionDenied(false);
        toast.success('Craft image loaded successfully');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E7E3DA] shadow-editorial-lg">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E7E3DA] bg-[#FAF8F5]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center font-bold">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#1A1715]">
              {capturedImage ? 'Review Captured Specimen' : 'Live Craft Vision Viewfinder'}
            </h3>
            <p className="text-[11px] text-[#635F59]">
              {capturedImage
                ? 'Verify optical framing and texture resolution before AI processing'
                : 'Center craft specimen in natural daylight for optimal fiber detection'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!capturedImage && isStreaming && (
            <button
              onClick={toggleFacingMode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E7E3DA] text-xs font-medium text-[#1A1715] hover:bg-[#F5F1E8] transition-colors shadow-editorial-xs"
              title="Switch Camera (Front/Rear)"
            >
              <FlipHorizontal className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Flip Camera</span>
            </button>
          )}

          {onClose && (
            <button
              onClick={() => {
                stopStream();
                onClose();
              }}
              className="p-2 rounded-xl text-[#635F59] hover:text-[#1A1715] hover:bg-[#F0ECE3] transition-colors"
              aria-label="Close Scanner"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Viewfinder / Canvas Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={`relative aspect-[4/3] sm:aspect-video w-full bg-[#1A1715] overflow-hidden flex items-center justify-center ${
          isDragOver ? 'ring-2 ring-amber-500 ring-inset' : ''
        }`}
      >
        {/* State A: Captured Image Preview */}
        {capturedImage ? (
          <div className="relative w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={capturedImage}
              alt="Captured craft specimen"
              className="w-full h-full object-contain bg-black"
            />
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/20 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Snapshot Staged for Taxonomy Intake</span>
            </div>
          </div>
        ) : (
          <>
            {/* State B: Live Video Stream */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${
                facingMode === 'user' ? 'scale-x-[-1]' : ''
              } ${!isStreaming ? 'hidden' : 'block'}`}
            />

            {/* Hidden capture canvas */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Viewfinder Optical HUD Overlay */}
            {isStreaming && (
              <div className="absolute inset-0 pointer-events-none">
                {/* 4 Optical Corner Brackets */}
                <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-amber-400/90 rounded-tl-lg" />
                <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-amber-400/90 rounded-tr-lg" />
                <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-amber-400/90 rounded-bl-lg" />
                <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-amber-400/90 rounded-br-lg" />

                {/* Center Reticle Crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 pointer-events-none">
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-amber-400/50" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-amber-400/50" />
                  <div className="absolute inset-2 border border-amber-400/40 rounded-full" />
                </div>

                {/* Animated Scanning Sweep Beam */}
                <motion.div
                  animate={{ y: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_rgba(251,191,36,0.8)] opacity-70"
                />

                {/* Level Horizon Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-amber-300 border border-amber-400/30 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>CRAFT OPTICAL ALIGNMENT ACTIVE</span>
                </div>
              </div>
            )}

            {/* State C: Loading Camera Stream */}
            {isLoading && !cameraError && (
              <div className="flex flex-col items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                <p className="text-xs font-medium text-zinc-300">Initializing camera hardware feed…</p>
              </div>
            )}

            {/* State D: Camera Error or Permission Denied */}
            {cameraError && !isLoading && (
              <div className="max-w-md p-6 mx-4 text-center rounded-2xl bg-white/95 text-[#1A1715] shadow-editorial-lg space-y-3">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-[#1A1715]">
                  {permissionDenied ? 'Camera Access Required' : 'Camera Hardware Unavailable'}
                </h4>
                <p className="text-xs text-[#635F59] leading-relaxed">
                  {cameraError}
                </p>

                <div className="flex flex-col sm:flex-row gap-2 pt-2 justify-center">
                  <button
                    onClick={() => startCamera(facingMode)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#1A1715] font-semibold text-xs transition-colors shadow-editorial-xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retry Camera</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#F5F1E8] hover:bg-[#EFEAE0] border border-[#E7E3DA] text-[#1A1715] font-semibold text-xs transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-600" />
                    <span>Upload Craft Image</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom Controls Ribbon */}
      <div className="p-4 sm:p-5 bg-white border-t border-[#E7E3DA] flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Hidden file input for native device camera & upload fallback */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />

        {capturedImage ? (
          /* Captured Actions */
          <div className="flex items-center justify-between w-full gap-3">
            <button
              onClick={handleRetake}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F5F1E8] border border-[#E7E3DA] text-[#1A1715] text-xs font-semibold transition-colors shadow-editorial-xs"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#635F59]" />
              <span>Retake Photo</span>
            </button>

            <button
              onClick={handleConfirm}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#1A1715] font-bold text-xs shadow-editorial-sm transition-all active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Confirm & Analyze Craft</span>
            </button>
          </div>
        ) : (
          /* Live Stream Controls */
          <>
            <div className="flex items-center gap-2 text-xs text-[#635F59]">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="hidden sm:inline">Natural daylight recommended for high GI recognition</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
              {/* Device Upload fallback */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F5F1E8] border border-[#E7E3DA] text-[#1A1715] text-xs font-semibold transition-colors shadow-editorial-xs"
                title="Select photo from local files or camera roll"
              >
                <Upload className="w-3.5 h-3.5 text-amber-600" />
                <span>Upload from Device</span>
              </button>

              {/* Shutter Button */}
              {isStreaming && (
                <button
                  onClick={handleCapture}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#1A1715] font-bold text-xs shadow-editorial-md transition-all active:scale-95 group"
                >
                  <div className="w-4 h-4 rounded-full bg-[#1A1715] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                  </div>
                  <span>Capture Photo</span>
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
