import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, ChevronRight, Phone, PawPrint, Plus } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/PageHeader";

export function OwnersList() {
  const { owners, getPetsByOwner } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = owners.filter(o =>
    o.name.toLowerCase().includes(search.toLowerCase()) ||
    o.phone.includes(search) ||
    o.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Pet Owners"
        subtitle={`${owners.length} registered owners`}
        action={{ label: "Add Owner", onClick: () => navigate("/owners/add") }}
      />

      <div className="p-4 md:p-6">
        {/* Search */}
        <div className="relative mb-4">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, phone or email..."
            className="w-full pl-10 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#2E86C1] transition-colors"
          />
        </div>

        {/* List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <Search size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No owners found</p>
            </div>
          ) : (
            filtered.map((owner, i) => {
              const petCount = getPetsByOwner(owner.id).length;
              return (
                <div
                  key={owner.id}
                  onClick={() => navigate(`/owners/${owner.id}`)}
                  className={`flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors ${
                    i < filtered.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-[#1B4F72] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold">{owner.name.charAt(0)}</span>
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[#333333] font-medium truncate">{owner.name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="flex items-center gap-1 text-gray-500 text-sm">
                        <Phone size={13} /> {owner.phone}
                      </span>
                      <span className="flex items-center gap-1 text-[#2E86C1] text-sm">
                        <PawPrint size={13} /> {petCount} {petCount === 1 ? "pet" : "pets"}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 flex-shrink-0" />
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Mobile FAB */}
      <button
        onClick={() => navigate("/owners/add")}
        className="md:hidden fixed right-5 bottom-24 w-14 h-14 bg-[#1B4F72] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#2E86C1] transition-colors z-20"
      >
        <Plus size={26} />
      </button>
    </div>
  );
}
