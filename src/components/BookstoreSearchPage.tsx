
import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

type Bookstore = {
  address: string;
  label: string;
  coords: [number, number];
};

const MUNICH_CENTER: [number, number] = [11.5662, 48.137];
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

const STATIC_MUNICH_MAP =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/M%C3%BCnchen_-_Karte_-_OpenStreetMap.png/640px-M%C3%BCnchen_-_Karte_-_OpenStreetMap.png";

// eBay Kleinanzeigen style colors: green, white, soft grey/blue
const BookstoreSearchPage: React.FC = () => {
  const [search, setSearch] = useState("80331 Munich, Marienplatz");

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
      <section className="w-full max-w-5xl h-[390px] md:h-[470px] relative mt-8 px-2 mb-2 flex items-center justify-center">
        <div className="relative w-full h-full">
          <img
            src={STATIC_MUNICH_MAP}
            alt="Munich map"
            className="object-cover w-full h-full rounded-lg border border-gray-200 shadow"
            draggable={false}
            />
          {/* Optionally, could add pins as absolute-positioned elements here */}
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

