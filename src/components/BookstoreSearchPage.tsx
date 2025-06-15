
import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

type Bookstore = {
  address: string;
  label: string;
  coords: [number, number];
};

// You can try this Wikimedia image (OSM): If this fails, it's likely CORS or Wikimedia blocking hotlinking
const STATIC_MUNICH_MAP =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/M%C3%BCnchen_-_Karte_-_OpenStreetMap.png/640px-M%C3%BCnchen_-_Karte_-_OpenStreetMap.png";
// If that fails to load, use a local placeholder instead:
const PLACEHOLDER_MAP =
  "https://placehold.co/640x390?text=Munich+Map+Not+Available";

const BOOKSTORES: Bookstore[] = [
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

const BookstoreSearchPage: React.FC = () => {
  const [search, setSearch] = useState("80331 Munich, Marienplatz");
  const [imgSrc, setImgSrc] = useState(STATIC_MUNICH_MAP);
  const [imgError, setImgError] = useState(false);

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

      {/* Static Map Area */}
      <section className="w-full max-w-5xl h-[390px] md:h-[470px] relative mt-8 px-2 mb-2">
        <div className="relative w-full h-[390px] md:h-[470px] flex items-center justify-center">
          {!imgError ? (
            <img
              src={imgSrc}
              alt="Munich map"
              onError={() => {
                setImgSrc(PLACEHOLDER_MAP);
                setImgError(true);
              }}
              className="object-cover w-full h-full rounded-lg border-2 border-dashed border-gray-400 shadow"
              draggable={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-400 rounded-lg">
              <span className="text-gray-400 text-lg">
                Munich map is not available.
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Results List */}
      <section className="w-full max-w-3xl mt-4 px-2">
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

