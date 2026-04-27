import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  Owner, Pet, Visit, Treatment, Vaccination, FollowUp, Invoice, SyncLog, ClinicProfile,
  owners as initialOwners,
  pets as initialPets,
  visits as initialVisits,
  treatments as initialTreatments,
  vaccinations as initialVaccinations,
  followUps as initialFollowUps,
  invoices as initialInvoices,
  syncLogs as initialSyncLogs,
  clinicProfile as initialClinicProfile,
} from "../data/mockData";

interface AppContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  owners: Owner[];
  pets: Pet[];
  visits: Visit[];
  treatments: Treatment[];
  vaccinations: Vaccination[];
  followUps: FollowUp[];
  invoices: Invoice[];
  syncLogs: SyncLog[];
  clinicProfile: ClinicProfile;
  addOwner: (owner: Omit<Owner, "id" | "createdAt">) => Owner;
  updateOwner: (id: string, owner: Partial<Owner>) => void;
  addPet: (pet: Omit<Pet, "id" | "createdAt">) => Pet;
  updatePet: (id: string, pet: Partial<Pet>) => void;
  addVisit: (visit: Omit<Visit, "id" | "createdAt">) => Visit;
  updateVisit: (id: string, visit: Partial<Visit>) => void;
  addTreatment: (treatment: Omit<Treatment, "id">) => Treatment;
  addVaccination: (vaccination: Omit<Vaccination, "id">) => Vaccination;
  addFollowUp: (followUp: Omit<FollowUp, "id">) => FollowUp;
  updateFollowUp: (id: string, followUp: Partial<FollowUp>) => void;
  addInvoice: (invoice: Omit<Invoice, "id" | "invoiceNumber">) => Invoice;
  updateInvoice: (id: string, invoice: Partial<Invoice>) => void;
  updateClinicProfile: (profile: Partial<ClinicProfile>) => void;
  getPetsByOwner: (ownerId: string) => Pet[];
  getVisitsByPet: (petId: string) => Visit[];
  getTreatmentsByVisit: (visitId: string) => Treatment[];
  getTreatmentsByPet: (petId: string) => Treatment[];
  getVaccinationsByPet: (petId: string) => Vaccination[];
  getFollowUpsByPet: (petId: string) => FollowUp[];
  getOwnerById: (id: string) => Owner | undefined;
  getPetById: (id: string) => Pet | undefined;
  getVisitById: (id: string) => Visit | undefined;
  getInvoiceByVisit: (visitId: string) => Invoice | undefined;
  getInvoiceById: (id: string) => Invoice | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

let idCounter = 1000;
const generateId = () => `gen_${++idCounter}`;

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [owners, setOwners] = useState<Owner[]>(initialOwners);
  const [pets, setPets] = useState<Pet[]>(initialPets);
  const [visits, setVisits] = useState<Visit[]>(initialVisits);
  const [treatments, setTreatments] = useState<Treatment[]>(initialTreatments);
  const [vaccinations, setVaccinations] = useState<Vaccination[]>(initialVaccinations);
  const [followUps, setFollowUps] = useState<FollowUp[]>(initialFollowUps);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [syncLogs] = useState<SyncLog[]>(initialSyncLogs);
  const [clinicProfile, setClinicProfile] = useState<ClinicProfile>(initialClinicProfile);

  const login = (email: string, password: string) => {
    if (email && password) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAuthenticated(false);

  const addOwner = (owner: Omit<Owner, "id" | "createdAt">): Owner => {
    const newOwner: Owner = { ...owner, id: generateId(), createdAt: new Date().toISOString().split("T")[0] };
    setOwners(prev => [newOwner, ...prev]);
    return newOwner;
  };

  const updateOwner = (id: string, owner: Partial<Owner>) => {
    setOwners(prev => prev.map(o => o.id === id ? { ...o, ...owner } : o));
  };

  const addPet = (pet: Omit<Pet, "id" | "createdAt">): Pet => {
    const newPet: Pet = { ...pet, id: generateId(), createdAt: new Date().toISOString().split("T")[0] };
    setPets(prev => [newPet, ...prev]);
    return newPet;
  };

  const updatePet = (id: string, pet: Partial<Pet>) => {
    setPets(prev => prev.map(p => p.id === id ? { ...p, ...pet } : p));
  };

  const addVisit = (visit: Omit<Visit, "id" | "createdAt">): Visit => {
    const newVisit: Visit = { ...visit, id: generateId(), createdAt: new Date().toISOString().split("T")[0] };
    setVisits(prev => [newVisit, ...prev]);
    return newVisit;
  };

  const updateVisit = (id: string, visit: Partial<Visit>) => {
    setVisits(prev => prev.map(v => v.id === id ? { ...v, ...visit } : v));
  };

  const addTreatment = (treatment: Omit<Treatment, "id">): Treatment => {
    const newTreatment: Treatment = { ...treatment, id: generateId() };
    setTreatments(prev => [newTreatment, ...prev]);
    return newTreatment;
  };

  const addVaccination = (vaccination: Omit<Vaccination, "id">): Vaccination => {
    const newVac: Vaccination = { ...vaccination, id: generateId() };
    setVaccinations(prev => [newVac, ...prev]);
    return newVac;
  };

  const addFollowUp = (followUp: Omit<FollowUp, "id">): FollowUp => {
    const newFollowUp: FollowUp = { ...followUp, id: generateId() };
    setFollowUps(prev => [newFollowUp, ...prev]);
    return newFollowUp;
  };

  const updateFollowUp = (id: string, followUp: Partial<FollowUp>) => {
    setFollowUps(prev => prev.map(f => f.id === id ? { ...f, ...followUp } : f));
  };

  const addInvoice = (invoice: Omit<Invoice, "id" | "invoiceNumber">): Invoice => {
    const num = invoices.length + 1;
    const newInvoice: Invoice = { ...invoice, id: generateId(), invoiceNumber: `INV-2024-${String(num).padStart(3, "0")}` };
    setInvoices(prev => [newInvoice, ...prev]);
    return newInvoice;
  };

  const updateInvoice = (id: string, invoice: Partial<Invoice>) => {
    setInvoices(prev => prev.map(i => i.id === id ? { ...i, ...invoice } : i));
  };

  const updateClinicProfile = (profile: Partial<ClinicProfile>) => {
    setClinicProfile(prev => ({ ...prev, ...profile }));
  };

  const getPetsByOwner = (ownerId: string) => pets.filter(p => p.ownerId === ownerId);
  const getVisitsByPet = (petId: string) => visits.filter(v => v.petId === petId);
  const getTreatmentsByVisit = (visitId: string) => treatments.filter(t => t.visitId === visitId);
  const getTreatmentsByPet = (petId: string) => treatments.filter(t => t.petId === petId);
  const getVaccinationsByPet = (petId: string) => vaccinations.filter(v => v.petId === petId);
  const getFollowUpsByPet = (petId: string) => followUps.filter(f => f.petId === petId);
  const getOwnerById = (id: string) => owners.find(o => o.id === id);
  const getPetById = (id: string) => pets.find(p => p.id === id);
  const getVisitById = (id: string) => visits.find(v => v.id === id);
  const getInvoiceByVisit = (visitId: string) => invoices.find(i => i.visitId === visitId);
  const getInvoiceById = (id: string) => invoices.find(i => i.id === id);

  return (
    <AppContext.Provider value={{
      isAuthenticated, login, logout,
      owners, pets, visits, treatments, vaccinations, followUps, invoices, syncLogs, clinicProfile,
      addOwner, updateOwner, addPet, updatePet, addVisit, updateVisit,
      addTreatment, addVaccination, addFollowUp, updateFollowUp, addInvoice, updateInvoice,
      updateClinicProfile,
      getPetsByOwner, getVisitsByPet, getTreatmentsByVisit, getTreatmentsByPet,
      getVaccinationsByPet, getFollowUpsByPet,
      getOwnerById, getPetById, getVisitById, getInvoiceByVisit, getInvoiceById,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
