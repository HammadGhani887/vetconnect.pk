import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Plus, PawPrint, ChevronRight, Filter } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/PageHeader";

const SPECIES = ["All", "Dog", "Cat", "Bird", "Rabbit", "Other"];

export function PetsList() {
  const { pets, getOwnerById } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("All");

  const filtered = pets.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.breed.toLowerCase().includes(search.toLowerCase()) ||
      getOwnerById(p.ownerId)?.name.toLowerCase().includes(search.toLowerCase());
    const matchSpecies = speciesFilter === "All" || p.species === speciesFilter;
    return matchSearch && matchSpecies;
  });

  const speciesIcon = (species: string) => {
    switch (species) {
      case "Dog": return "🐕";
      case "Cat": return "🐈";
      case "Bird": return "🐦";
      case "Rabbit": return "🐇";
      default: return "🐾";
    }
  };

  return (
    <div>
      <PageHeader
        title="Pets"
        subtitle={`${pets.length} registered pets`}
        action={{ label: "Add Pet", onClick: () => navigate("/pets/add") }}
      />

      <div className="p-4 md:p-6">
        {/* Search */}
        <div className="relative mb-3">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search pets by name, breed or owner..."
            className="w-full pl-10 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#2E86C1] transition-colors"
          />
        </div>

        {/* Species Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {SPECIES.map(s => (
            <button
              key={s}
              onClick={() => setSpeciesFilter(s)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm transition-colors ${
                speciesFilter === s
                  ? "bg-[#1B4F72] text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#2E86C1]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Pet List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <PawPrint size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No pets found</p>
            </div>
          ) : (
            filtered.map((pet, i) => {
              const owner = getOwnerById(pet.ownerId);
              return (
                <div
                  key={pet.id}
                  onClick={() => navigate(`/pets/${pet.id}`)}
                  className={`flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors ${
                    i < filtered.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div className="w-12 h-12 bg-[#2E86C1]/10 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
                    {speciesIcon(pet.species)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#333333] font-medium">{pet.name}</p>
                    <p className="text-gray-500 text-sm">{pet.species} · {pet.breed}</p>
                    <p className="text-[#2E86C1] text-xs mt-0.5">{owner?.name}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs mb-1 ${
                      pet.gender === "Male" ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"
                    }`}>
                      {pet.gender}
                    </span>
                    <br />
                    <ChevronRight size={16} className="text-gray-300 ml-auto" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Mobile FAB */}
      <button
        onClick={() => navigate("/pets/add")}
        className="md:hidden fixed right-5 bottom-24 w-14 h-14 bg-[#1B4F72] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#2E86C1] transition-colors z-20"
      >
        <Plus size={26} />
      </button>
    </div>
  );
}
