import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

// Wikimedia map static image (could be blocked by CORS)
const STATIC_MUNICH_MAP =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/M%C3%BCnchen_-_Karte_-_OpenStreetMap.png/640px-M%C3%BCnchen_-_Karte_-_OpenStreetMap.png";

// Reliable placeholder service
const PLACEHOLDER_MAP =
  "https://placehold.co/640x390?text=Munich+Map+Not+Available";

const BOOKSTORES = [
  {
    address: "81354 Munich, Haderner Stern",
    label: "Haderner Stern",
    coords: [11.4768, 48.1218],
  },
  {
    address: "80331 Marienplatz",
    label: "Marienplatz",
    coords: [11.5755, 48.1371],
  },
  {
    address: "81675 Bogenhausen",
    label: "Bogenhausen",
    coords: [11.6062, 48.1504],
  },
];

const LOCAL_INLINE_MAP = (
  <svg
    viewBox="0 0 640 390"
    className="w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Simple Munich map placeholder"
  >
    <rect width="100%" height="100%" fill="#e5e7eb" />
    <text
      x="50%"
      y="45%"
      alignmentBaseline="middle"
      textAnchor="middle"
      fontSize="32"
      fill="#6b7280"
      fontFamily="sans-serif"
    >
      Munich Map Not Available
    </text>
    <circle cx="320" cy="195" r="110" fill="#bbf7d0" opacity="0.6" />
    <circle cx="340" cy="190" r="8" fill="#22c55e" />
  </svg>
);

const BookstoreSearchPage: React.FC = () => {
  const [search, setSearch] = useState("80331 Munich, Marienplatz");
  const [imgSrc, setImgSrc] = useState(STATIC_MUNICH_MAP);
  const [imgStep, setImgStep] = useState(0);
  // imgStep: 0 - Static, 1 - Placeholder map, 2 - fallback SVG
  const [imgError, setImgError] = useState(false);

  // Handle image error, swapping source through the fallbacks
  const handleImgError = () => {
    console.log(`[BookstoreSearchPage] Image failed to load: ${imgSrc}, step: ${imgStep}`);
    if (imgStep === 0) {
      // Try placeholder service next
      setImgSrc(PLACEHOLDER_MAP);
      setImgStep(1);
      setImgError(false);
    } else if (imgStep === 1) {
      // Fallback to SVG inline
      setImgError(true);
    }
    // if step > 1: do nothing, SVG will show as fallback
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen pb-16 bg-gradient-to-b from-white to-gray-50">
      {/* Top Search */}
      <section className="w-full max-w-3xl pt-10 px-2 md:px-0">
        <div className="flex flex-col gap-3 md:gap-0 md:flex-row md:items-stretch shadow-sm rounded-lg bg-white border border-gray-200">
          <div className="flex-1 flex items-center px-4 py-3">
            <MapPin className="text-green-600 mr-2" />
            <Input
              className="text-lg border-none bg-transparent focus:ring-0 p-0"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Enter your address in Munich…"
              aria-label="Search address"
            />
          </div>
        </div>
      </section>

      {/* Results List */}
      <section className="w-full max-w-3xl mt-8 px-2">
        <div className="rounded-lg shadow border border-gray-200 bg-white">
          <div className="grid grid-cols-1 gap-1">
            {BOOKSTORES.map((store, idx) => (
              <div
                key={store.address}
                className="flex items-center px-4 py-4 border-b last:border-0 hover:bg-green-50 transition-colors group"
              >
                <MapPin className="text-green-600 mr-4 shrink-0" />
                <div>
                  <div className="font-semibold text-gray-800">{store.label}</div>
                  <div className="text-gray-500 text-sm">{store.address}</div>
                </div>
                <div className="ml-auto text-xs text-gray-400 opacity-0 group-hover:opacity-80 transition-opacity">
                  Show on map
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookstoreSearchPage;
