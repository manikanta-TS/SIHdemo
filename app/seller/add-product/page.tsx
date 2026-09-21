'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { ProgressStepper } from '@/components/shared/ProgressStepper';
import { AIProcessingCard } from '@/components/shared/AIProcessingCard';
import { VoiceButton } from '@/components/shared/VoiceButton';
import { ProvenanceBadge } from '@/components/shared/ProvenanceBadge';
import { RealCameraScanner } from '@/components/shared/RealCameraScanner';
import { translations, comparableProducts } from '@/lib/mock-data';
import {
  Camera,
  Upload,
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Edit2,
  IndianRupee,
  TrendingUp,
  Rocket,
  Share2,
  PlusCircle,
  Store,
  Layers,
  Sliders,
  Cpu,
  Volume2,
  Scan,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const steps = ['Capture', 'Enhance', 'Vision AI', 'Catalog', 'Language', 'Smart Price', 'Preview', 'Live'];

const samplePresets = [
  {
    name: 'Kalamkari Shoulder Bag',
    craft: 'Kalamkari',
    image: 'https://images.pexels.com/photos/21326994/pexels-photo-21326994.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Handbag',
    material: 'Cotton',
    technique: 'Hand-painted Natural Dye',
    region: 'Andhra Pradesh',
  },
  {
    name: 'Etikoppaka Lacquer Toy',
    craft: 'Woodcraft',
    image: 'https://images.pexels.com/photos/17536627/pexels-photo-17536627.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Wooden Toys',
    material: 'Ankudu Wood',
    technique: 'Hand-turned Natural Lacquer',
    region: 'Andhra Pradesh',
  },
  {
    name: 'Chanderi Silk Saree',
    craft: 'Handloom Weaving',
    image: 'https://images.pexels.com/photos/11538902/pexels-photo-11538902.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Saree',
    material: 'Silk & Zari',
    technique: 'Handloom Jacquard',
    region: 'Madhya Pradesh',
  },
];

export default function AddProductPage() {
  const router = useRouter();
  const { addSellerProduct, language } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedImage, setSelectedImage] = useState(samplePresets[0].image);
  const [processing, setProcessing] = useState(false);
  const [enhanceMode, setEnhanceMode] = useState<'enhanced' | 'original' | 'white' | 'lifestyle'>('enhanced');
  const [recognizing, setRecognizing] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [selectedLang, setSelectedLang] = useState(language);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [costs, setCosts] = useState({ material: 700, labour: 400, packaging: 100, transport: 80 });
  const [acceptedPrice, setAcceptedPrice] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);

  const [recognition, setRecognition] = useState({
    category: 'Handbag',
    craft: 'Kalamkari',
    material: 'Cotton',
    technique: 'Hand-painted Natural Dye',
    color: 'Indigo Blue & Ochre',
    region: 'Andhra Pradesh',
    confidence: 96,
  });

  const totalCost = costs.material + costs.labour + costs.packaging + costs.transport;
  const median = 1600;
  const recommendedPrice = 1650;
  const profit = recommendedPrice - totalCost;

  const handlePresetSelect = (preset: typeof samplePresets[number]) => {
    setSelectedImage(preset.image);
    setRecognition({
      category: preset.category,
      craft: preset.craft,
      material: preset.material,
      technique: preset.technique,
      color: 'Multicolor',
      region: preset.region,
      confidence: 96,
    });
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCurrentStep(1);
      toast.success(`Loaded craft specimen: ${preset.name}`);
    }, 1200);
  };

  const handleCameraCapture = (imageDataUrl: string) => {
    setSelectedImage(imageDataUrl);
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCurrentStep(1);
      toast.success('Craft photograph captured from live camera feed!');
    }, 1400);
  };

  const handleRecognize = () => {
    setRecognizing(true);
    setTimeout(() => {
      setRecognizing(false);
      setCurrentStep(2);
      toast.success('Vision AI detected craft taxonomy with 96% accuracy');
    }, 2200);
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setCurrentStep(3);
    }, 2000);
  };

  const handleRegenerate = () => {
    setRegenerating(true);
    setTimeout(() => {
      setRegenerating(false);
      toast.success('Generated alternate high-converting catalog narrative');
    }, 1200);
  };

  const handlePlayAudio = () => {
    setIsPlayingAudio(true);
    toast.info(`Simulating synthetic Indic voice synthesis (${selectedLang.toUpperCase()})...`);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 3000);
  };

  const handlePublish = () => {
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      setPublished(true);
      const t = translations[selectedLang] || translations.en;
      addSellerProduct({
        id: `hk-${Date.now()}`,
        name: t.title,
        artisanId: 'a1',
        artisanName: 'Lakshmi Devi',
        artisanState: recognition.region,
        category: recognition.category,
        craft: recognition.craft,
        material: recognition.material,
        technique: recognition.technique,
        color: recognition.color,
        region: recognition.region,
        price: recommendedPrice,
        rating: 5.0,
        reviews: 1,
        image: selectedImage,
        images: [selectedImage],
        description: t.description,
        tags: ['Handmade', recognition.craft, recognition.material, 'GI-Certified', 'Heritage Craft', 'Eco-Friendly'],
        dimensions: '30 x 25 x 8 cm',
        stock: 5,
        estimatedDelivery: '5-7 days',
        featured: true,
      });
      toast.success('Craft catalog is now live on the global marketplace!');
    }, 1800);
  };

  if (published) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg p-8 sm:p-10 rounded-3xl bg-white border border-[#E7E3DA] shadow-editorial-xl"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 border border-emerald-500/30 flex items-center justify-center mb-6 text-emerald-600">
            <Check className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-[#1A1715]">Your craft is live globally!</h1>
          <p className="text-xs text-[#635F59] mt-2 max-w-sm mx-auto leading-relaxed">
            Patrons worldwide can now discover, inspect, and acquire your authentic creation with automated currency conversion and direct UPI bank payout.
          </p>

          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E3DA] my-6 text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#8E887F]">Catalog Specimen:</span>
              <span className="font-semibold text-[#1A1715]">{(translations[selectedLang] || translations.en).title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8E887F]">Listed Price:</span>
              <span className="font-mono font-bold text-amber-700">₹{recommendedPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8E887F]">Artisan Payout:</span>
              <span className="font-mono font-bold text-emerald-700">₹{(recommendedPrice - 180).toLocaleString('en-IN')} (Direct)</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => router.push('/seller/store')}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#1A1715] font-semibold text-xs shadow-editorial-sm transition-all"
            >
              <Store className="w-4 h-4" />
              <span>Inspect Public Storefront</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setPublished(false);
                  setCurrentStep(0);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E3DA] text-[#1A1715] text-xs font-semibold hover:bg-[#F5F1E8] transition-colors"
              >
                <PlusCircle className="w-4 h-4" /> Scan Another Craft
              </button>
              <button
                onClick={() => toast.success('Shareable digital certificate link copied!')}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E3DA] text-[#1A1715] text-xs font-semibold hover:bg-[#F5F1E8] transition-colors"
              >
                <Share2 className="w-4 h-4" /> Share Link
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title & Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E7E3DA]">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1715] flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-amber-500 flex items-center justify-center text-[#1A1715] shadow-editorial-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            AI Vision Cataloging Studio
          </h1>
          <p className="text-xs text-[#635F59] mt-1">
            Physical-to-digital autonomous transformation engine · Certified Provenance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#8E887F]">Step {currentStep + 1} of {steps.length}</span>
        </div>
      </div>

      <ProgressStepper steps={steps} current={currentStep} />

      <AnimatePresence mode="wait">
        {/* STEP 0: Capture & Upload */}
        {currentStep === 0 && (
          <motion.div
            key="capture"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-6"
          >
            {processing ? (
              <AIProcessingCard
                title="Synthesizing Raw Camera Intake…"
                steps={['Calibrating lens perspective', 'Isolating focal handicraft', 'Normalizing shadow cast']}
                currentStep={1}
              />
            ) : (
              <>
                {/* Real Frontend Camera Engine */}
                <RealCameraScanner onCapture={handleCameraCapture} />

                {/* Sample Presets for Quick Testing */}
                <div className="p-5 rounded-3xl bg-white border border-[#E7E3DA] shadow-editorial-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Curated Mastercraft Specimens (Quick Test)
                    </span>
                    <span className="text-[10px] text-[#8E887F] font-mono">1-Click Selection</span>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {samplePresets.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => handlePresetSelect(preset)}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF8F5] hover:bg-[#F5F1E8] border border-[#E7E3DA] hover:border-amber-500/40 text-left transition-all group"
                      >
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-stone-200">
                          <Image src={preset.image} alt={preset.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-[#1A1715] group-hover:text-amber-800 truncate">
                            {preset.name}
                          </p>
                          <p className="text-[10px] text-[#635F59] mt-0.5">{preset.craft}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guidelines */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 flex items-start gap-3 text-xs text-[#635F59]">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-[#1A1715]">Artisan Photography Guide:</strong> Place your craft on a flat neutral ground with adequate natural daylight. The AI automatically cleans backgrounds, normalizes exposure, and highlights intricate weave patterns.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* STEP 1: Vision Enhancement Studio */}
        {currentStep === 1 && (
          <motion.div
            key="enhance"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-6"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-[#E7E3DA] bg-[#1A1715] shadow-editorial-lg">
              <Image src={selectedImage} alt="Craft Specimen" fill className="object-cover" />

              {/* Scanning Ray */}
              {enhanceMode === 'enhanced' && (
                <>
                  <motion.div
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b]"
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-400/50 text-amber-300 text-xs font-mono font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Studio Relighting Active
                  </div>
                </>
              )}
            </div>

            {/* Lighting Modes */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'enhanced', label: '✨ Studio Enhanced' },
                { id: 'original', label: '📷 Original Shot' },
                { id: 'white', label: '◻ Clean Neutral Base' },
                { id: 'lifestyle', label: '🏡 Lifestyle Staging' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setEnhanceMode(m.id as typeof enhanceMode)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-xs font-semibold transition-all',
                    enhanceMode === m.id
                      ? 'bg-amber-500 text-[#1A1715] shadow-editorial-xs font-bold'
                      : 'bg-white border border-[#E7E3DA] text-[#635F59] hover:bg-[#FAF8F5]'
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Pipeline status indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              {[
                'Sub-pixel Edge Segmentation',
                'Natural Shadow Geometry',
                'Color Temperature Correction',
                'Textile Weave Clarification',
                'Specular Reflection Control',
                'Noise Suppression (4K Ready)',
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 p-3 rounded-xl bg-white border border-[#E7E3DA] text-[#1A1715] shadow-editorial-xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-medium truncate">{f}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setCurrentStep(0)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#E7E3DA] text-[#1A1715] text-xs font-semibold hover:bg-[#FAF8F5] transition-colors shadow-editorial-xs"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#635F59]" /> Re-take Photo
              </button>
              <button
                onClick={handleRecognize}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#1A1715] text-xs font-bold shadow-editorial-sm transition-all active:scale-95"
              >
                <span>Process with Neural Vision AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {recognizing && (
              <AIProcessingCard
                title="Analyzing Craft Provenance & Taxonomy…"
                steps={['Identifying GI-Heritage Craft', 'Classifying Textile Weave Technique', 'Estimating Masterwork Valuation', 'Assigning Provenance Confidence']}
                currentStep={2}
              />
            )}
          </motion.div>
        )}

        {/* STEP 2: Vision AI Taxonomy Detection */}
        {currentStep === 2 && (
          <motion.div
            key="recognize"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-700">
                <Sparkles className="w-5 h-5" />
                <h2 className="font-bold text-[#1A1715] text-base">Neural Vision Detection Results</h2>
              </div>
              <ProvenanceBadge type="gi-tag" label="GI Tag Verified: Kalamkari" />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {Object.entries(recognition).map(([key, val]) => {
                if (key === 'confidence') return null;
                const isEditing = editingField === key;
                return (
                  <div key={key} className="p-4 rounded-2xl bg-white border border-[#E7E3DA] shadow-editorial-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#8E887F]">{key}</span>
                      <button
                        onClick={() => setEditingField(isEditing ? null : key)}
                        className="text-[#8E887F] hover:text-amber-700 text-xs"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                    </div>
                    {isEditing ? (
                      <input
                        value={val as string}
                        onChange={(e) => setRecognition({ ...recognition, [key]: e.target.value })}
                        onBlur={() => setEditingField(null)}
                        autoFocus
                        className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-amber-500/40 bg-[#FAF8F5] text-xs text-[#1A1715] focus:outline-none"
                      />
                    ) : (
                      <p className="text-sm font-semibold text-[#1A1715] capitalize">{val}</p>
                    )}
                  </div>
                );
              })}

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800">Neural Confidence</span>
                  <Award className="w-4 h-4 text-amber-700" />
                </div>
                <div className="mt-2">
                  <p className="text-2xl font-bold font-mono text-amber-900">{recognition.confidence}%</p>
                  <div className="mt-2 h-1.5 rounded-full bg-amber-200 overflow-hidden">
                    <motion.div
                      className="h-full bg-amber-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${recognition.confidence}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep(3)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#1A1715] text-xs font-bold shadow-editorial-sm transition-all"
            >
              <span>Confirm Taxonomy & Generate Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* STEP 3: Catalog Generation */}
        {currentStep === 3 && (
          <motion.div
            key="catalog"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-5"
          >
            {generating ? (
              <AIProcessingCard
                title="Generating High-Converting Craft Story…"
                steps={['Authoring heritage headline', 'Drafting provenance story', 'Synthesizing technical specifications', 'Generating international SEO tags']}
                currentStep={3}
              />
            ) : (
              <>
                <div className="p-6 rounded-3xl bg-white border border-[#E7E3DA] shadow-editorial-sm space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#8E887F] uppercase tracking-wider">AI Generated Title</span>
                    <h3 className="font-bold text-lg text-[#1A1715] mt-1 leading-snug">
                      {translations.en.title}
                    </h3>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#8E887F] uppercase tracking-wider">Provenance & Craft Narrative</span>
                    <p className="text-xs text-[#635F59] mt-1 leading-relaxed">
                      {translations.en.description}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#8E887F] uppercase tracking-wider block mb-2">Automated Discovery Tags</span>
                    <div className="flex flex-wrap gap-2">
                      {['Handmade', 'Kalamkari', 'Cotton', 'Master Artisan', 'Natural Dyes', 'GI Certified', 'Eco-Friendly'].map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#E7E3DA] text-amber-800 text-[11px] font-medium">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleRegenerate}
                    disabled={regenerating}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#E7E3DA] text-[#1A1715] text-xs font-semibold hover:bg-[#FAF8F5] transition-colors shadow-editorial-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{regenerating ? 'Rewriting Narrative…' : 'Regenerate Narrative'}</span>
                  </button>

                  <button
                    onClick={() => setCurrentStep(4)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#1A1715] text-xs font-bold shadow-editorial-sm transition-all"
                  >
                    <span>Proceed to Multilingual Translation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* STEP 4: Multilingual Voice & Translation */}
        {currentStep === 4 && (
          <motion.div
            key="language"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-5"
          >
            <div className="p-6 rounded-3xl bg-white border border-[#E7E3DA] shadow-editorial-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-[#1A1715]">Select Translation Language</h3>
                <span className="text-[10px] font-mono text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full font-semibold">
                  8 Indic Dialects
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(translations).map(([code, t]) => (
                  <button
                    key={code}
                    onClick={() => setSelectedLang(code)}
                    className={cn(
                      'p-3 rounded-xl text-left transition-all border',
                      selectedLang === code
                        ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-editorial-xs font-bold'
                        : 'bg-[#FAF8F5] border-[#E7E3DA] text-[#635F59] hover:bg-[#F5F1E8]'
                    )}
                  >
                    <p className="font-bold text-xs">{t.title.split(' ')[0]}</p>
                    <p className="text-[10px] uppercase font-mono opacity-70 mt-0.5">{code}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Translated Output Card */}
            <div className="p-6 rounded-3xl bg-white border border-amber-300 shadow-editorial-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold">
                  Target Language Output ({selectedLang.toUpperCase()})
                </span>
                <button
                  onClick={handlePlayAudio}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 text-xs font-semibold transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                  <span>{isPlayingAudio ? 'Playing Synthetic Audio…' : 'Pronounce Audio'}</span>
                </button>
              </div>

              <div>
                <p className="text-sm font-bold text-[#1A1715]">{(translations[selectedLang] || translations.en).title}</p>
                <p className="text-xs text-[#635F59] mt-2 leading-relaxed">
                  {(translations[selectedLang] || translations.en).description}
                </p>
              </div>
            </div>

            <VoiceButton />

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#E7E3DA] text-[#1A1715] text-xs font-semibold hover:bg-[#FAF8F5] transition-colors shadow-editorial-xs"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setCurrentStep(5)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#1A1715] text-xs font-bold shadow-editorial-sm transition-all"
              >
                <span>Calculate Fair Pricing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 5: Smart Price & Cost Matrix */}
        {currentStep === 5 && (
          <motion.div
            key="price"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-5"
          >
            <div>
              <h2 className="font-bold text-base text-[#1A1715] flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-emerald-600" />
                Fair Price Recommendation Engine
              </h2>
              <p className="text-xs text-[#635F59] mt-1">
                Balancing artisan remuneration with competitive metro buyer willingness-to-pay.
              </p>
            </div>

            {/* Cost Matrix Form */}
            <div className="p-6 rounded-3xl bg-white border border-[#E7E3DA] shadow-editorial-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8E887F] block mb-3 font-semibold">
                Production Expenditure Breakdown (INR)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(costs).map(([key, val]) => (
                  <div key={key}>
                    <label className="text-[11px] text-[#635F59] capitalize font-medium">{key}</label>
                    <div className="flex items-center gap-1.5 mt-1 px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7E3DA]">
                      <span className="text-[#8E887F] text-xs">₹</span>
                      <input
                        type="number"
                        value={val}
                        onChange={(e) => setCosts({ ...costs, [key]: Number(e.target.value) })}
                        className="w-full bg-transparent text-xs font-mono font-bold text-[#1A1715] focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-[#E7E3DA] flex justify-between items-center text-xs font-bold">
                <span className="text-[#635F59]">Direct Production Floor:</span>
                <span className="font-mono text-[#1A1715] text-sm font-bold">₹{totalCost.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Market Comparison Distribution */}
            <div className="p-6 rounded-3xl bg-white border border-[#E7E3DA] shadow-editorial-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8E887F] font-semibold">
                  Comparable Market Specimens (Tier 1 vs Direct)
                </span>
                <span className="text-[11px] font-mono text-amber-700 font-bold">{comparableProducts.length} data points</span>
              </div>
              <div className="flex items-end gap-1.5 h-20 pt-2">
                {comparableProducts.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${(p / 1800) * 100}%` }}
                    transition={{ delay: i * 0.04 }}
                    className={cn(
                      'flex-1 rounded-t transition-all',
                      p === recommendedPrice ? 'bg-amber-500 shadow-editorial-xs' : 'bg-stone-200'
                    )}
                    title={`₹${p}`}
                  />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4 text-center text-xs">
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E7E3DA]">
                  <p className="text-[#8E887F] text-[10px]">Village Middleman</p>
                  <p className="font-bold text-sm text-[#635F59] font-mono mt-0.5">₹1,400</p>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                  <p className="text-amber-800 text-[10px] font-bold">AI Direct Price</p>
                  <p className="font-bold text-sm text-amber-900 font-mono mt-0.5">₹1,650</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <p className="text-emerald-800 text-[10px] font-bold">Net Artisan Take-home</p>
                  <p className="font-bold text-sm text-emerald-900 font-mono mt-0.5">₹{profit + costs.labour}</p>
                </div>
              </div>
            </div>

            {/* Recommendation Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-emerald-50/50 border border-emerald-300 text-center shadow-editorial-sm">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 font-bold">
                Optimum Fair-Trade Selling Price
              </span>
              <p className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-900 mt-1">
                ₹{recommendedPrice.toLocaleString('en-IN')}
              </p>
              <p className="text-xs text-[#635F59] mt-2 max-w-md mx-auto">
                Guarantees ₹{profit + costs.labour} direct cash flow to your household while remaining 25% cheaper than urban luxury retail showrooms.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCurrentStep(4)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#E7E3DA] text-[#1A1715] text-xs font-semibold hover:bg-[#FAF8F5] transition-colors shadow-editorial-xs"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => {
                  setAcceptedPrice(true);
                  setCurrentStep(6);
                  toast.success('Price locked in at ₹1,650');
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-editorial-sm transition-all active:scale-95"
              >
                <Check className="w-4 h-4" />
                <span>Accept ₹{recommendedPrice} & Preview Listing</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 6: High-Fidelity Storefront Preview */}
        {currentStep === 6 && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-5"
          >
            <div>
              <h2 className="font-bold text-base text-[#1A1715]">Digital Storefront Verification Preview</h2>
              <p className="text-xs text-[#635F59] mt-0.5">This is how your craft will be displayed to global collectors.</p>
            </div>

            <div className="rounded-3xl overflow-hidden bg-white border border-[#E7E3DA] shadow-editorial-lg">
              <div className="relative aspect-video bg-[#1A1715]">
                <Image src={selectedImage} alt="Craft Specimen" fill className="object-cover" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <ProvenanceBadge type="gi-tag" label="GI Tag Authenticated" />
                  <ProvenanceBadge type="verified-artisan" label="Direct from Artisan" />
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-xl text-[#1A1715]">
                    {(translations[selectedLang] || translations.en).title}
                  </h3>
                  <p className="text-xs text-[#635F59] mt-1 leading-relaxed">
                    {(translations[selectedLang] || translations.en).description}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E7E3DA] text-xs">
                  <div>
                    <span className="text-[10px] text-[#8E887F] font-mono">Craft Tradition</span>
                    <p className="font-semibold text-[#1A1715] mt-0.5">{recognition.craft}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8E887F] font-mono">Base Material</span>
                    <p className="font-semibold text-[#1A1715] mt-0.5">{recognition.material}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8E887F] font-mono">Geographic Origin</span>
                    <p className="font-semibold text-[#1A1715] mt-0.5">{recognition.region}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8E887F] font-mono">Fulfillment Window</span>
                    <p className="font-semibold text-[#1A1715] mt-0.5">5-7 Business Days</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E7E3DA] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8E887F] font-mono uppercase">Retail Valuation</span>
                    <p className="text-2xl font-bold font-mono text-[#1A1715]">₹{recommendedPrice.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-700 font-mono font-bold">Direct Artisan Benefit</span>
                    <p className="text-xs text-[#635F59]">₹{(recommendedPrice - 180).toLocaleString('en-IN')} (Net)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCurrentStep(5)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#E7E3DA] text-[#1A1715] text-xs font-semibold hover:bg-[#FAF8F5] transition-colors shadow-editorial-xs"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <button
                onClick={handlePublish}
                disabled={publishing}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#1A1715] text-xs font-bold shadow-editorial-md transition-all active:scale-95 disabled:opacity-50"
              >
                {publishing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#1A1715]/30 border-t-[#1A1715] rounded-full animate-spin" />
                    <span>Minting Digital Provenance & Publishing…</span>
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4" />
                    <span>Publish to Global Marketplace</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
