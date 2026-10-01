"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Megaphone, MessageCircle } from "lucide-react";
import { brandsData } from "@/lib/brand-data";

interface BrandAdBannerProps {
  brand?: string;
  image?: string;
  video?: string;
  mobileImage?: string;
  mobileVideo?: string;
  href?: string;
  alt?: string;
}

export default function BrandAdBanner({
  brand,
  image,
  video,
  mobileImage,
  mobileVideo,
  href,
  alt = "Brand advertisement",
}: BrandAdBannerProps) {
  const [videoError, setVideoError] = useState(false);
  const [mobileVideoError, setMobileVideoError] = useState(false);

  let finalImage = image;
  let finalMobileImage = mobileImage;
  let finalHref = href;
  let finalAlt = alt;

  if (brand && brandsData[brand]) {
    const brandObj = brandsData[brand];
    if (brandObj.bannerImage) {
      finalImage = brandObj.bannerImage;
    }
    if (!finalHref) {
      finalHref = `/brand/${brandObj.slug}`;
    }
    finalAlt = `${brandObj.name} advertisement`;
  }

  const isExternalLink =
    finalHref?.startsWith("http") || finalHref?.startsWith("//");
  const showVideo = !!video && !videoError;
  const showMobileVideo = !!mobileVideo && !mobileVideoError;
  const hasMobileCreative = showMobileVideo || !!finalMobileImage;
  const hasMedia = showVideo || !!finalImage || hasMobileCreative;

  const wrapLink = (content: React.ReactNode) => {
    if (!finalHref) return <div className="relative block w-full h-full">{content}</div>;
    return isExternalLink ? (
      <a
        href={finalHref}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="relative block w-full h-full"
      >
        {content}
      </a>
    ) : (
      <Link href={finalHref} className="relative block w-full h-full">
        {content}
      </Link>
    );
  };

  const renderContent = () => {
    if (hasMobileCreative) {
      const mobileElement = showMobileVideo ? (
        <video
          src={mobileVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="object-cover w-full h-full"
          onError={() => setMobileVideoError(true)}
        />
      ) : (
        <img
          src={finalMobileImage}
          alt={finalAlt}
          className="object-cover w-full h-full transition duration-300 hover:opacity-95"
        />
      );

      const desktopElement = showVideo ? (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="object-cover w-full h-full"
          onError={() => setVideoError(true)}
        />
      ) : finalImage ? (
        <img
          src={finalImage}
          alt={finalAlt}
          className="object-cover w-full h-full transition duration-300 hover:opacity-95"
        />
      ) : null;

      return (
        <>
          <div className="block md:hidden w-full h-full">
            {wrapLink(mobileElement)}
          </div>
          <div className="hidden md:block w-full h-full">
            {wrapLink(desktopElement)}
          </div>
        </>
      );
    }

    if (showVideo) {
      const videoElement = (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="object-contain md:object-cover w-full h-full"
          onError={() => setVideoError(true)}
        />
      );
      return wrapLink(videoElement);
    }

    if (finalImage) {
      const imageElement = (
        <img
          src={finalImage}
          alt={finalAlt}
          className="object-contain md:object-cover w-full h-full transition duration-300 hover:opacity-95"
        />
      );
      return wrapLink(imageElement);
    }

    return (
      <div className="flex flex-col items-center justify-center text-center px-4 py-2 w-full h-full">
        <div className="flex items-center gap-2 text-gray-500 mb-1">
          <Megaphone className="w-4 h-4 text-gray-400" />
          <span className="text-xs sm:text-sm font-medium text-gray-700">
            Advertise here — Brand banner space
          </span>
        </div>
        <a
          href="https://wa.me/923141349717"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#84CC16] hover:text-[#65A30D] transition mt-1 underline underline-offset-2"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Contact us to advertise
        </a>
      </div>
    );
  };

  const containerClasses = hasMobileCreative
    ? "relative w-full aspect-[3/1] md:aspect-auto md:h-[140px] lg:h-[180px] bg-[#F9FAFB] border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex items-center justify-center"
    : hasMedia
    ? "relative w-full aspect-[1200/180] md:aspect-auto md:h-[140px] lg:h-[180px] bg-[#F9FAFB] border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex items-center justify-center"
    : "relative w-full min-h-[100px] md:min-h-0 md:h-[140px] lg:h-[180px] bg-[#F9FAFB] border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex items-center justify-center";

  return (
    <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8 my-6">
      {/* Mobile Advertisement Label (outside & above box, below md) */}
      <div className="md:hidden text-right text-[9px] uppercase tracking-wide text-gray-500 mb-1 px-1">
        Advertisement
      </div>
      <div className={containerClasses}>
        {/* Desktop Advertisement Label (inside box, md up) */}
        <div className="hidden md:block absolute top-3 right-3 z-10 bg-gray-200/90 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded tracking-wide uppercase shadow-xs">
          Advertisement
        </div>
        {renderContent()}
      </div>
    </div>
  );
}
