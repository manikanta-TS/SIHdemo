'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useApp } from '@/lib/store';
import { products, artisans } from '@/lib/mock-data';
import {
  Star,
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  MapPin,
  Truck,
  Package,
  Check,
  BadgeCheck,
  ArrowLeft,
  Store,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const product = products.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Product not found</p>
        <Link href="/buyer/explore" className="mt-4 inline-block text-orange-600 font-medium">
          Back to Explore
        </Link>
      </div>
    );
  }

  const artisan = artisans.find((a) => a.id === product.artisanId);
  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product.id, qty);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    addToCart(product.id, qty);
    router.push('/buyer/cart');
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Gallery */}
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          <div className="flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={cn(
                  'relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors',
                  selectedImage === i ? 'border-orange-500' : 'border-transparent'
                )}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
                {product.category}
              </span>
              {product.trending && (
                <span className="px-2.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-medium">
                  Trending
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-sm text-gray-500 mt-1">by {product.artisanName}</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-sm">{product.rating}</span>
                <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
              </div>
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                {product.artisanState}
              </div>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-sm font-bold">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/70 border border-orange-100/60">
            {[
              { label: 'Material', value: product.material },
              { label: 'Craft Technique', value: product.technique },
              { label: 'Dimensions', value: product.dimensions },
              { label: 'Color', value: product.color },
              { label: 'Estimated Delivery', value: product.estimatedDelivery },
              { label: 'Stock', value: product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' },
            ].map((d) => (
              <div key={d.label}>
                <p className="text-xs text-gray-400 font-medium">{d.label}</p>
                <p className="text-sm font-semibold text-gray-900">{d.value}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>

          {/* Quantity + Actions */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 border border-orange-200 rounded-full p-1">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-1.5 rounded-full hover:bg-orange-50">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-1.5 rounded-full hover:bg-orange-50">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white border-2 border-orange-500 text-orange-600 font-semibold text-sm hover:bg-orange-50 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold text-sm hover:shadow-lg transition-shadow"
            >
              Buy Now
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={cn(
                'p-3 rounded-full border-2 transition-colors',
                isWishlisted ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'
              )}
            >
              <Heart className={cn('w-5 h-5', isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600')} />
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-teal-600" /> Free shipping</span>
            <span className="flex items-center gap-1.5"><Package className="w-4 h-4 text-orange-600" /> Easy returns</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-600" /> Authentic handmade</span>
          </div>
        </div>
      </div>

      {/* Meet the Artisan */}
      {artisan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl overflow-hidden bg-gradient-to-br from-orange-50 via-white to-pink-50 border border-orange-100/60 p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-500" />
            Meet the Artisan
          </h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="relative w-full sm:w-48 h-48 rounded-2xl overflow-hidden shadow-md shrink-0">
              <Image src={artisan.image} alt={artisan.name} fill className="object-cover" sizes="192px" />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">{artisan.name}</h3>
                {artisan.verified && <BadgeCheck className="w-5 h-5 text-cyan-500" />}
              </div>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {artisan.village}, {artisan.state}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">{artisan.craft}</span>
                <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">{artisan.specialization}</span>
                <span className="px-2.5 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-medium">{artisan.yearsExperience} years exp</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{artisan.story}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {artisan.rating}</span>
                <span>{artisan.followers.toLocaleString('en-IN')} followers</span>
                <span>{artisan.productsCount} products</span>
              </div>
              <Link
                href={`/buyer/artisans/${artisan.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
              >
                <Store className="w-4 h-4" />
                View Artisan Store
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
