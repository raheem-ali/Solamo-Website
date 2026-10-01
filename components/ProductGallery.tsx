"use client";

import React, { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const validImages =
    images && images.length > 0
      ? images
      : [
          "https://solamoenergy.com/wp-content/uploads/2026/07/default-banner.png",
        ];

  const [selectedImage, setSelectedImage] = useState<string>(validImages[0]);

  return (
    <div className="flex min-w-0 gap-3">
      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="flex w-[58px] shrink-0 flex-col gap-2">
          {validImages.map((img, idx) => {
            const isActive = selectedImage === img;

            return (
              <button
                key={`${img}-${idx}`}
                type="button"
                onClick={() => setSelectedImage(img)}
                aria-label={`${productName} image ${idx + 1}`}
                className={`
                  flex
                  h-[70px]
                  w-[58px]
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-[4px]
                  bg-white
                  p-1
                  transition-colors
                  ${
                    isActive
                      ? "border-2 border-[#172217]"
                      : "border border-[#dfe3dc] hover:border-[#79B900]"
                  }
                `}
              >
                <img
                  src={img}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Main product image */}
      <div
        className="
          relative
          flex
          min-h-[390px]
          min-w-0
          flex-1
          items-center
          justify-center
          bg-white
          md:min-h-[440px]
          lg:min-h-[470px]
        "
      >
        {/* Wishlist */}
        <button
          type="button"
          aria-label="Save to wishlist"
          className="
            absolute
            right-1
            top-1
            z-10
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-white
            text-[#172217]
            transition-colors
            hover:text-[#79B900]
          "
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.3 6.3a4.5 4.5 0 016.4 0L12 7.6l1.3-1.3a4.5 4.5 0 016.4 6.4L12 20.4l-7.7-7.7a4.5 4.5 0 010-6.4z"
            />
          </svg>
        </button>

        <img
          src={selectedImage}
          alt={productName}
          className="
            max-h-[400px]
            w-auto
            max-w-full
            object-contain
            mix-blend-multiply
            md:max-h-[430px]
            lg:max-h-[450px]
          "
        />
      </div>
    </div>
  );
}
