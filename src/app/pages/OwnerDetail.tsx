import { useNavigate, useParams } from "react-router";
import { Phone, Mail, MapPin, FileText, Edit2, Plus, PawPrint, ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/PageHeader";

export function OwnerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOwnerById, getPetsByOwner } = useApp();

  const owner = getOwnerById(id || "");
  if (!owner) return (
    <div className="p-6 text-center">
      <p className="text-gray-500">Owner not found</p>
    </div>
  );

  const pets = getPetsByOwner(owner.id);

  return (
    <div>
      <PageHeader
        title="Owner Details"
        showBack
        action={{ label: "Edit", icon: <Edit2 size={16} />, onClick: () => navigate(`/owners/${id}/edit`) }}
      />

      <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
        {/* Owner Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#1B4F72] to-[#2E86C1] p-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-white text-2xl font-bold">{owner.name.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-white">{owner.name}</h2>
                <p className="text-[#AED6F1] text-sm mt-0.5">ID: {owner.idNumber || "N/A"}</p>
                <p className="text-[#AED6F1] text-xs mt-1">Member since {owner.createdAt}</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            <InfoRow icon={<Phone size={18} />} label="Phone" value={owner.phone} />
            <InfoRow icon={<Mail size={18} />} label="Email" value={owner.email || "Not provided"} />
            <InfoRow icon={<MapPin size={18} />} label="Address" value={owner.address || "Not provided"} />
            {owner.notes && (
              <InfoRow icon={<FileText size={18} />} label="Notes" value={owner.notes} />
            )}
          </div>
        </div>

        {/* Pets Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <PawPrint size={18} className="text-[#1B4F72]" />
              <h3 className="text-[#1B4F72]">Pets ({pets.length})</h3>
            </div>
            <button
              onClick={() => navigate(`/pets/add?ownerId=${owner.id}`)}
              className="flex items-center gap-1.5 text-[#2E86C1] text-sm hover:text-[#1B4F72] transition-colors"
            >
              <Plus size={16} /> Add Pet
            </button>
          </div>

          {pets.length === 0 ? (
            <div className="py-10 text-center">
              <PawPrint size={32} className="mx-auto text-gray-300 mb-2" />
              <p className="text-gray-500 text-sm">No pets registered yet</p>
              <button
                onClick={() => navigate(`/pets/add?ownerId=${owner.id}`)}
                className="mt-3 text-[#2E86C1] text-sm"
              >
                Add first pet →
              </button>
            </div>
          ) : (
            pets.map((pet, i) => (
              <div
                key={pet.id}
                onClick={() => navigate(`/pets/${pet.id}`)}
                className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors ${
                  i < pets.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="w-11 h-11 bg-[#2E86C1]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <PawPrint size={20} className="text-[#2E86C1]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#333333] font-medium">{pet.name}</p>
                  <p className="text-gray-500 text-sm">{pet.species} • {pet.breed} • {pet.gender}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-gray-400 text-xs">{pet.weight} kg</p>
                  <ChevronRight size={16} className="text-gray-300 ml-auto mt-1" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3.5">
      <div className="text-[#2E86C1] mt-0.5 flex-shrink-0">{icon}</div>
      <div>
        <p className="text-gray-500 text-xs mb-0.5">{label}</p>
        <p className="text-[#333333]">{value}</p>
      </div>
    </div>
  );
}
