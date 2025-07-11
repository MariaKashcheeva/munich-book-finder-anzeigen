
import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

// Use the uploaded Munich map image (user provided)
const MUNICH_BW_MAP = "/lovable-uploads/3ad12b43-3c80-4e42-88a4-22920ae4a6b7.png";

// Store data
const BOOKSTORES: Array<{
  address: string;
  label: string;
  coords: [number, number];
}> = [
  {
    address: "81375 Haderner Stern",
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

// Book definitions for each store
const BOOKS_BY_STORE = [
  [
    {
      name: "The Metamorphosis - Franz Kafka",
      image: "/lovable-uploads/35d51fbb-1258-4c2b-8184-cfe5768e1798.png",
    },
  ],
  [
    {
      name: "Hänsel und Gretel - Brüder Grimm",
      image: "/lovable-uploads/d23bd7c2-075b-468e-82c4-44d663ac15af.png",
    },
  ],
  [
    {
      name: "Perfume: The Story of a Murderer - Patrick Süskind",
      image: "/lovable-uploads/6360e72d-5042-46a8-ac16-87739fcb205d.png",
    },
  ],
];

// Munich center coordinates
const MUNICH_CENTER: [number, number] = [11.5755, 48.1371];

const BookstoreSearchPage: React.FC = () => {
  const [search, setSearch] = useState("81375");

  // Determine highlight index and not-found state
  let highlightIndex: number | null = null;
  if (search.includes("81375")) highlightIndex = 0;
  else if (search.includes("80331")) highlightIndex = 1;
  else if (search.includes("81675")) highlightIndex = 2;

  const isNotFound =
    search.length > 0 &&
    !search.includes("81375") &&
    !search.includes("80331") &&
    !search.includes("81675");

  // Select books based on the highlighted store (by index)
  let books: Array<{ name: string; image: string }> = [];
  if (highlightIndex !== null) {
    books = BOOKS_BY_STORE[highlightIndex];
  }

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* STATIC BW MUNICH MAP BACKGROUND */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center filter grayscale"
        aria-hidden
        style={{
          // Crop a bit from the bottom to hide the "alamy" black line
          backgroundImage: `url(${MUNICH_BW_MAP})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          height: "100vh",
          width: "100vw",
          opacity: 0.35,
          pointerEvents: "none",
          // Over-crop bottom: use an overlay below to mask if needed
          // Remove black line using a white gradient overlay below.
        }}
      >
        {/* Gradient overlay at the bottom to hide black line */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0) 92%, #fff 99%, #fff 100%)",
          }}
        />
        {/* Optional overlay for better contrast */}
        <div className="absolute inset-0 bg-white/70" />
      </div>

      {/* PAGE FOREGROUND CONTENT */}
      <div className="flex flex-col items-center w-full min-h-screen pb-16">
        {/* Top Search */}
        <section className="w-full max-w-3xl pt-10 px-2 md:px-0">
          <div className="flex flex-col gap-3 md:gap-0 md:flex-row md:items-stretch shadow-sm rounded-lg bg-white border border-gray-200">
            <div className="flex-1 flex items-center px-4 py-3">
              <MapPin className="text-green-600 mr-2" />
              <Input
                className="text-lg border-none bg-transparent focus:ring-0 p-0"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Enter your postal code in Munich.."
                aria-label="Search address"
              />
            </div>
          </div>
          {isNotFound && (
            <div className="mt-4 px-4 py-2 rounded bg-yellow-50 text-yellow-700 border border-yellow-200 text-center">
              Your postal code was not found
            </div>
          )}
        </section>

        {/* Results List */}
        <section className="w-full max-w-3xl mt-8 px-2">
          <div className="rounded-lg shadow border border-gray-200 bg-white">
            <div className="grid grid-cols-1 gap-1">
              {BOOKSTORES.map((store, idx) => (
                <div
                  key={store.address}
                  className={`flex items-center px-4 py-4 border-b last:border-0 hover:bg-green-50 transition-colors group ${
                    idx === highlightIndex ? "bg-yellow-100" : ""
                  }`}
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

        {/* Book List Section: Only show if a store is highlighted */}
        {highlightIndex !== null && !isNotFound && books.length > 0 && (
          <section className="w-full max-w-3xl mt-10 px-2">
            <div className="rounded-lg shadow border border-gray-200 bg-white p-6">
              <h2 className="text-xl font-semibold mb-4">Books available at {BOOKSTORES[highlightIndex].label}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {books.map((book, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-3 border rounded-lg bg-green-50 p-4 shadow-sm">
                    <img
                      src={book.image}
                      alt={book.name}
                      className="w-28 h-32 object-contain rounded"
                    />
                    <div className="text-center font-medium">{book.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default BookstoreSearchPage;

