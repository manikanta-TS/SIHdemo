'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { ProgressStepper } from '@/components/shared/ProgressStepper';
import { AIProcessingCard } from '@/components/shared/AIProcessingCard';
import { LanguageSelector } from '@/components/shared/LanguageSelector';
import { VoiceButton } from '@/components/shared/VoiceButton';
import { translations, comparableProducts } from '@/lib/mock-data';
import { Camera, Upload, Sparkles, Check, ArrowRight, ArrowLeft, RotateCcw, Edit2, IndianRupee, TrendingUp, BarChart3, Rocket, Share2, PlusCircle, Store, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const steps = ['Photo', 'Enhance', 'Recognize', 'Catalog', 'Language', 'Price', 'Preview', 'Publish'];

const sampleImage = 'https://images.pexels.com/photos/21326994/pexels-photo-21326994.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export default function AddProductPage() {
  const router = useRouter();
  const { addSellerProduct, language } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [enhanceMode, setEnhanceMode] = useState<'original' | 'enhanced' | 'white' | 'lifestyle'>('enhanced');
  const [recognizing, setRecognizing] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [selectedLang, setSelectedLang] = useState(language);
  const [costs, setCosts] = useState({ material: 700, labour: 400, packaging: 100, transport: 80 });
  const [acceptedPrice, setAcceptedPrice] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [recognition, setRecognition] = useState({
    category: 'Handbag', craft: 'Kalamkari', material: 'Cotton', technique: 'Hand-painted', color: 'Blue', region: 'Andhra Pradesh', confidence: 94,
  });

  const totalCost = costs.material + costs.labour + costs.packaging + costs.transport;
  const median = 1600;
  const recommendedPrice = 1650;
  const profit = recommendedPrice - totalCost;

  const handleUpload = () => {
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setUploaded(true); setCurrentStep(1); }, 2500);
  };

  const handleRecognize = () => {
    setRecognizing(true);
    setTimeout(() => { setRecognizing(false); setCurrentStep(2); }, 3000);
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setCurrentStep(3); }, 2500);
  };

  const handleRegenerate = () => {
    setRegenerating(true);
    setTimeout(() => setRegenerating(false), 1800);
  };

  const handlePublish = () => {
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      setPublished(true);
      const t = translations[selectedLang] || translations.en;
      addSellerProduct({
        id: `new-${Date.now()}`,
        name: t.title,
        artisanId: 'a1', artisanName: 'Lakshmi Devi', artisanState: 'Andhra Pradesh',
        category: recognition.category, craft: recognition.craft, material: recognition.material,
        technique: recognition.technique, color: recognition.color, region: recognition.region,
        price: recommendedPrice, rating: 0, reviews: 0, image: sampleImage, images: [sampleImage],
        description: t.description, tags: ['Handmade', 'Kalamkari', 'Cotton', 'Artisan', 'Hand-painted', 'Traditional Craft', 'Eco-friendly'],
        dimensions: '30 x 25 x 8 cm', stock: 5, estimatedDelivery: '5-7 days', featured: true,
      });
    }, 2200);
  };

  if (published) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 0.6 }} className="w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
            <Check className="w-12 h-12 text-green-500" />
          </motion.div>
          <h1 className="text-3xl font-bold">Your product is now live!</h1>
          <p className="text-gray-500 mt-2">Buyers can now discover and purchase your creation.</p>
          <div className="flex flex-col gap-3 mt-6">
            <button onClick={() => router.push('/seller/store')} className="flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm">
              <Store className="w-4 h-4" /> View My Store
            </button>
            <div className="flex gap-3">
              <button onClick={() => { setPublished(false); setCurrentStep(0); setUploaded(false); }} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-purple-300 text-purple-600 font-semibold text-sm">
                <PlusCircle className="w-4 h-4" /> Add Another
              </button>
              <button onClick={() => toast.success('Share link copied!')} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-gray-300 text-gray-600 font-semibold text-sm">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Sparkles className="w-6 h-6 text-purple-500" /> AI Product Creator</h1>
        <p className="text-sm text-gray-500 mt-1">Create a professional listing from a single photo</p>
      </div>

      <ProgressStepper steps={steps} current={currentStep} />

      <AnimatePresence mode="wait">
        {/* STEP 0: Upload */}
        {currentStep === 0 && (
          <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
            {processing ? (
              <AIProcessingCard title="Analyzing your product…" steps={['Detecting product', 'Removing background', 'Enhancing quality']} currentStep={1} />
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <button onClick={handleUpload} className="flex flex-col items-center gap-3 p-8 rounded-2xl border-2 border-dashed border-purple-300 bg-purple-50/50 hover:bg-purple-50 transition-colors">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"><Camera className="w-7 h-7 text-white" /></div>
                    <span className="font-semibold text-sm">Take Photo</span>
                  </button>
                  <button onClick={handleUpload} className="flex flex-col items-center gap-3 p-8 rounded-2xl border-2 border-dashed border-orange-300 bg-orange-50/50 hover:bg-orange-50 transition-colors">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center"><Upload className="w-7 h-7 text-white" /></div>
                    <span className="font-semibold text-sm">Upload from Gallery</span>
                  </button>
                </div>
                <div className="p-4 rounded-2xl bg-white/70 border border-purple-100/60">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Photography Tips</p>
                  <ul className="space-y-1.5 text-sm text-gray-600">
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Place your product on a clean surface.</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Make sure the product is well lit.</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Keep the entire product inside the frame.</li>
                  </ul>
                </div>
                <div className="p-4 rounded-2xl border-2 border-dashed border-gray-300 text-center text-sm text-gray-400">
                  You can also drag and drop an image here
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* STEP 1: Enhancement */}
        {currentStep === 1 && (
          <motion.div key="enhance" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-purple-200/60">
              <Image src={sampleImage} alt="Product" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
              {enhanceMode === 'enhanced' && (
                <>
                  <motion.div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent" animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 2, repeat: Infinity }} />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-purple-500 text-white text-xs font-medium flex items-center gap-1"><Sparkles className="w-3 h-3" /> AI Enhanced</div>
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'original', label: 'Original' },
                { id: 'enhanced', label: 'Enhanced' },
                { id: 'white', label: 'White Background' },
                { id: 'lifestyle', label: 'Lifestyle' },
              ].map((m) => (
                <button key={m.id} onClick={() => setEnhanceMode(m.id as typeof enhanceMode)} className={cn('px-4 py-2 rounded-full text-sm font-medium transition-colors', enhanceMode === m.id ? 'bg-purple-500 text-white' : 'bg-white border border-purple-200 text-gray-700')}>
                  {m.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {['Background removal', 'Brightness enhancement', 'Sharpness enhancement', 'Shadow generation', 'Clean studio background', 'Color correction'].map((f) => (
                <div key={f} className="flex items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-100"><Check className="w-4 h-4 text-green-500" /> {f}</div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setCurrentStep(0)} className="flex items-center gap-2 px-5 py-3 rounded-full border border-gray-300 text-gray-600 font-semibold text-sm"><RotateCcw className="w-4 h-4" /> Try Again</button>
              <button onClick={() => { setUploaded(true); handleRecognize(); }} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm">Use This Image <ArrowRight className="w-4 h-4" /></button>
            </div>
            {recognizing && <AIProcessingCard title="AI is recognizing your product…" steps={['Identifying category', 'Detecting craft type', 'Analyzing material', 'Estimating confidence']} currentStep={2} />}
          </motion.div>
        )}

        {/* STEP 2: Recognition */}
        {currentStep === 2 && (
          <motion.div key="recognize" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
            <div className="flex items-center gap-2 text-purple-700"><Sparkles className="w-5 h-5" /><h2 className="font-bold">We identified your product</h2></div>
            <div className="grid sm:grid-cols-2 gap-3">
              {Object.entries(recognition).map(([key, val]) => {
                if (key === 'confidence') return null;
                const isEditing = editingField === key;
                return (
                  <div key={key} className="p-4 rounded-2xl bg-white/80 border border-purple-100/60">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-400 uppercase font-medium">{key}</p>
                      <button onClick={() => setEditingField(isEditing ? null : key)} className="text-purple-500"><Edit2 className="w-3.5 h-3.5" /></button>
                    </div>
                    {isEditing ? (
                      <input value={val as string} onChange={(e) => setRecognition({ ...recognition, [key]: e.target.value })} onBlur={() => setEditingField(null)} autoFocus className="w-full mt-1 px-2 py-1 rounded-lg border border-purple-200 text-sm" />
                    ) : (
                      <p className="text-sm font-bold mt-1">{val}</p>
                    )}
                  </div>
                );
              })}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                <p className="text-xs text-white/80 uppercase font-medium">Confidence</p>
                <p className="text-2xl font-bold mt-1">{recognition.confidence}%</p>
                <div className="mt-2 h-2 rounded-full bg-white/20 overflow-hidden"><motion.div className="h-full bg-white" initial={{ width: 0 }} animate={{ width: `${recognition.confidence}%` }} transition={{ duration: 1 }} /></div>
              </div>
            </div>
            <button onClick={() => setCurrentStep(3)} className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm">Continue <ArrowRight className="w-4 h-4" /></button>
          </motion.div>
        )}

        {/* STEP 3: Catalog Generation */}
        {currentStep === 3 && (
          <motion.div key="catalog" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
            {generating ? (
              <AIProcessingCard title="Creating your product description…" steps={['Generating title', 'Writing description', 'Adding tags', 'Categorizing']} currentStep={3} />
            ) : (
              <>
                <div className="p-5 rounded-2xl bg-white/80 border border-purple-100/60 space-y-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-medium">Product Title</p>
                    <p className="font-bold text-lg mt-1">{translations.en.title}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-medium">Description</p>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{translations.en.description}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-medium mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {['Handmade', 'Kalamkari', 'Cotton', 'Artisan', 'Hand-painted', 'Traditional Craft', 'Eco-friendly'].map((t) => (
                        <span key={t} className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div><p className="text-xs text-gray-400">Category</p><p className="text-sm font-semibold">Handbags</p></div>
                    <div><p className="text-xs text-gray-400">Material</p><p className="text-sm font-semibold">Cotton</p></div>
                    <div><p className="text-xs text-gray-400">Technique</p><p className="text-sm font-semibold">Kalamkari</p></div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleRegenerate} className="flex items-center gap-2 px-5 py-3 rounded-full border border-purple-300 text-purple-600 font-semibold text-sm">
                    {regenerating ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><Sparkles className="w-4 h-4" /></motion.div> : <><Sparkles className="w-4 h-4" /> Regenerate</>}
                  </button>
                  <button onClick={() => setCurrentStep(4)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm">Continue <ArrowRight className="w-4 h-4" /></button>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* STEP 4: Language */}
        {currentStep === 4 && (
          <motion.div key="language" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
            <div className="p-5 rounded-2xl bg-white/80 border border-purple-100/60">
              <h2 className="font-bold mb-4">Choose your language</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(translations).map(([code, t]) => (
                  <button key={code} onClick={() => setSelectedLang(code)} className={cn('p-3 rounded-xl text-center transition-colors', selectedLang === code ? 'bg-purple-500 text-white' : 'bg-purple-50 text-gray-700 hover:bg-purple-100')}>
                    <p className="font-semibold text-sm">{t.title.split(' ')[0]}</p>
                    <p className="text-xs mt-1 opacity-80">{code.toUpperCase()}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100/60">
              <p className="text-xs text-gray-400 uppercase font-medium mb-1">Translated Title</p>
              <p className="font-bold">{(translations[selectedLang] || translations.en).title}</p>
              <p className="text-xs text-gray-400 uppercase font-medium mt-3 mb-1">Translated Description</p>
              <p className="text-sm text-gray-600">{(translations[selectedLang] || translations.en).description}</p>
            </div>
            <VoiceButton />
            <div className="flex gap-3">
              <button onClick={() => setCurrentStep(3)} className="flex items-center gap-2 px-5 py-3 rounded-full border border-gray-300 text-gray-600 font-semibold text-sm"><ArrowLeft className="w-4 h-4" /> Back</button>
              <button onClick={() => setCurrentStep(5)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm">Continue <ArrowRight className="w-4 h-4" /></button>
            </div>
          </motion.div>
        )}

        {/* STEP 5: Smart Pricing */}
        {currentStep === 5 && (
          <motion.div key="price" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
            <div className="flex items-center gap-2"><IndianRupee className="w-5 h-5 text-green-600" /><h2 className="font-bold">Smart Price Recommendation</h2></div>
            <p className="text-sm text-gray-500">AI-assisted market analysis helps you choose a competitive and profitable price.</p>

            {/* Production costs */}
            <div className="p-5 rounded-2xl bg-white/80 border border-purple-100/60">
              <p className="text-xs text-gray-400 uppercase font-medium mb-3">Your Production Cost</p>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(costs).map(([key, val]) => (
                  <div key={key}>
                    <label className="text-xs text-gray-500 capitalize">{key}</label>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-gray-400 text-sm">₹</span>
                      <input type="number" value={val} onChange={(e) => setCosts({ ...costs, [key]: Number(e.target.value) })} className="w-full px-2 py-1.5 rounded-lg border border-purple-200 text-sm" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-purple-100 flex justify-between font-bold"><span>Total Cost</span><span>₹{totalCost.toLocaleString('en-IN')}</span></div>
            </div>

            {/* Comparable products */}
            <div className="p-5 rounded-2xl bg-white/80 border border-purple-100/60">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-400 uppercase font-medium">Comparable Products</p>
                <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">{comparableProducts.length} found</span>
              </div>
              <div className="flex items-end gap-1 h-24">
                {comparableProducts.map((p, i) => (
                  <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${(p / 1800) * 100}%` }} transition={{ delay: i * 0.05 }} className={cn('flex-1 rounded-t', p === recommendedPrice ? 'bg-purple-500' : 'bg-purple-200')} title={`₹${p}`} />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                <div className="p-3 rounded-xl bg-orange-50"><p className="text-xs text-gray-500">Market Median</p><p className="font-bold text-lg">₹{median}</p></div>
                <div className="p-3 rounded-xl bg-teal-50"><p className="text-xs text-gray-500">Recommended Range</p><p className="font-bold text-sm">₹1,550 – ₹1,750</p></div>
                <div className="p-3 rounded-xl bg-green-50"><p className="text-xs text-gray-500">Est. Profit</p><p className="font-bold text-lg text-green-600">₹{profit}</p></div>
              </div>
            </div>

            {/* Recommended price card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 text-white text-center">
              <p className="text-white/80 text-sm">Recommended Selling Price</p>
              <p className="text-4xl font-bold mt-1">₹{recommendedPrice.toLocaleString('en-IN')}</p>
              <p className="text-white/80 text-xs mt-2">Similar products: ₹{median} median · Your cost: ₹{totalCost} · Balances competitiveness and profitability</p>
            </div>

            <div className="flex gap-3">
              {!acceptedPrice ? (
                <>
                  <button onClick={() => setCurrentStep(4)} className="flex items-center gap-2 px-5 py-3 rounded-full border border-gray-300 text-gray-600 font-semibold text-sm"><ArrowLeft className="w-4 h-4" /> Back</button>
                  <button onClick={() => setAcceptedPrice(true)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold text-sm"><Check className="w-4 h-4" /> Accept ₹{recommendedPrice}</button>
                </>
              ) : (
                <button onClick={() => setCurrentStep(6)} className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm">Continue to Preview <ArrowRight className="w-4 h-4" /></button>
              )}
            </div>
          </motion.div>
        )}

        {/* STEP 6: Preview */}
        {currentStep === 6 && (
          <motion.div key="preview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
            <h2 className="font-bold">Your Product Listing</h2>
            <div className="rounded-2xl overflow-hidden bg-white border border-purple-100/60 shadow-lg">
              <div className="relative aspect-video"><Image src={sampleImage} alt="Product" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" /></div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2"><span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">{recognition.category}</span><span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">{recognition.craft}</span></div>
                <h3 className="font-bold text-lg">{(translations[selectedLang] || translations.en).title}</h3>
                <p className="text-sm text-gray-600">{(translations[selectedLang] || translations.en).description}</p>
                <div className="flex flex-wrap gap-2">{['Handmade', 'Kalamkari', 'Cotton', 'Artisan', 'Hand-painted', 'Eco-friendly'].map((t) => <span key={t} className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium">{t}</span>)}</div>
                <div className="grid grid-cols-2 gap-3 pt-2 text-sm">
                  <div><p className="text-xs text-gray-400">Material</p><p className="font-semibold">{recognition.material}</p></div>
                  <div><p className="text-xs text-gray-400">Craft</p><p className="font-semibold">{recognition.craft}</p></div>
                  <div><p className="text-xs text-gray-400">Dimensions</p><p className="font-semibold">30 x 25 x 8 cm</p></div>
                  <div><p className="text-xs text-gray-400">Delivery</p><p className="font-semibold">5-7 days</p></div>
                </div>
                <div className="pt-2 border-t border-purple-50 flex items-center justify-between"><span className="text-2xl font-bold text-green-600">₹{recommendedPrice.toLocaleString('en-IN')}</span><span className="text-sm text-gray-500">Profit: ₹{profit}</span></div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setCurrentStep(5)} className="flex items-center gap-2 px-5 py-3 rounded-full border border-gray-300 text-gray-600 font-semibold text-sm"><ArrowLeft className="w-4 h-4" /> Back</button>
              <button onClick={handlePublish} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm">
                {publishing ? <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><Rocket className="w-4 h-4" /></motion.div> Publishing…</> : <><Rocket className="w-4 h-4" /> Publish Product</>}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
