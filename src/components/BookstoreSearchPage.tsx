import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

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

const HADERNER_STERN_BOOKS = [
  {
    name: "The Metamorphosis - Franz Kafka",
    image: "/lovable-uploads/35d51fbb-1258-4c2b-8184-cfe5768e1798.png",
  },
];

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

  // Determine which books to show for a highlighted location (only Haderner Stern for now)
  let books: Array<{ name: string; image: string }> = [];
  if (highlightIndex === 0) {
    books = HADERNER_STERN_BOOKS;
  }

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
  );
};

export default BookstoreSearchPage;
