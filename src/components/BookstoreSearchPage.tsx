
import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import Map from "@/components/Map";

// Store data
const BOOKSTORES = [
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
  const [mapboxToken, setMapboxToken] = useState("");

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
      {/* MAP BACKGROUND */}
      <div
        className="fixed inset-0 -z-10"
        aria-hidden
        style={{
          filter: "grayscale(1) contrast(1.2)",
          opacity: 0.33,
          pointerEvents: "none",
        }}
      >
        {mapboxToken ? (
          <Map
            token={mapboxToken}
            center={MUNICH_CENTER}
            bookstores={BOOKSTORES}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="text-gray-800/80 font-medium text-center bg-white/70 px-6 py-10 rounded-xl shadow border border-gray-200 backdrop-blur">
              <div className="mb-4 text-base">
                Please enter your public <span className="font-semibold text-green-700">Mapbox access token</span> below to display the Munich map as background.<br /><br />
                <span className="text-xs italic font-normal">
                  (Get your token at <a
                    href="https://mapbox.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-green-800"
                  >mapbox.com</a> &rarr; Dashboard &rarr; Tokens)
                </span>
              </div>
              <Input
                className="w-full text-base"
                type="text"
                placeholder="Paste your Mapbox public token here"
                value={mapboxToken}
                onChange={e => setMapboxToken(e.target.value)}
                autoFocus
              />
            </div>
          </div>
        )}
        {/* Optional overlay for better contrast */}
        <div className="absolute inset-0 bg-white/60" />
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
