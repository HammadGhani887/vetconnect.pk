import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Save, Plus, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/PageHeader";
import { InvoiceItem } from "../data/mockData";

let itemIdCounter = 100;

export function GenerateInvoice() {
  const { visitId } = useParams();
  const navigate = useNavigate();
  const { getVisitById, getPetById, getOwnerById, getTreatmentsByVisit, addInvoice, clinicProfile } = useApp();

  const visit = getVisitById(visitId || "");
  const pet = visit ? getPetById(visit.petId) : undefined;
  const owner = pet ? getOwnerById(pet.ownerId) : undefined;
  const treatments = getTreatmentsByVisit(visitId || "");

  const initialItems: InvoiceItem[] = [
    { id: `ii_${itemIdCounter++}`, description: "Consultation Fee", quantity: 1, unitPrice: 50.00 },
    ...treatments.map(t => ({
      id: `ii_${itemIdCounter++}`,
      description: t.description + (t.medicationName ? ` (${t.medicationName})` : ""),
      quantity: 1,
      unitPrice: t.cost,
    }))
  ];

  const [items, setItems] = useState<InvoiceItem[]>(initialItems);
  const [discount, setDiscount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState<"paid" | "unpaid" | "partial">("unpaid");
  const [paymentMethod, setPaymentMethod] = useState<"" | "cash" | "card" | "transfer">("");

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const taxAmount = (subtotal - discount) * (clinicProfile.taxRate / 100);
  const total = subtotal - discount + taxAmount;

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = () => {
    setItems(prev => [...prev, { id: `ii_${itemIdCounter++}`, description: "", quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visit || !pet) return;
    const invoice = addInvoice({
      visitId: visitId || "",
      petId: pet.id,
      date: new Date().toISOString().split("T")[0],
      items,
      subtotal,
      tax: taxAmount,
      discount,
      total,
      paymentStatus,
      paymentMethod,
    });
    navigate(`/invoices/${invoice.id}`);
  };

  if (!visit || !pet) return <div className="p-6 text-center text-gray-500">Visit not found</div>;

  return (
    <div>
      <PageHeader title="Generate Invoice" showBack />
      <div className="max-w-2xl mx-auto p-4 md:p-6">
        {/* Patient */}
        <div className="bg-[#1B4F72]/5 border border-[#1B4F72]/10 rounded-xl p-3 mb-4 text-sm">
          <span className="text-gray-500">Invoice for </span>
          <span className="text-[#1B4F72] font-medium">{pet.name}</span>
          <span className="text-gray-500"> · Owner: </span>
          <span className="text-[#1B4F72] font-medium">{owner?.name}</span>
          <span className="text-gray-500"> · Visit: {visit.date}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Line Items */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-[#F5F7FA] border-b border-gray-100">
              <h3 className="text-[#1B4F72] text-sm">Line Items</h3>
              <button type="button" onClick={addItem} className="flex items-center gap-1 text-[#2E86C1] text-sm hover:text-[#1B4F72]">
                <Plus size={16} /> Add Item
              </button>
            </div>
            <div className="p-4 space-y-3">
              {/* Header */}
              <div className="grid grid-cols-12 gap-2 text-xs text-gray-500 px-1">
                <span className="col-span-5">Description</span>
                <span className="col-span-2 text-center">Qty</span>
                <span className="col-span-3 text-right">Price</span>
                <span className="col-span-2 text-right">Total</span>
              </div>
              {items.map(item => (
                <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                  <input
                    value={item.description}
                    onChange={e => updateItem(item.id, "description", e.target.value)}
                    placeholder="Description"
                    className="col-span-5 px-2 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:border-[#2E86C1]"
                  />
                  <input
                    value={item.quantity}
                    onChange={e => updateItem(item.id, "quantity", parseInt(e.target.value) || 1)}
                    type="number"
                    min="1"
                    className="col-span-2 px-2 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm text-center focus:outline-none focus:border-[#2E86C1]"
                  />
                  <input
                    value={item.unitPrice}
                    onChange={e => updateItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)}
                    type="number"
                    step="0.01"
                    min="0"
                    className="col-span-3 px-2 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm text-right focus:outline-none focus:border-[#2E86C1]"
                  />
                  <div className="col-span-2 flex items-center justify-end gap-1">
                    <span className="text-[#333333] text-sm">${(item.quantity * item.unitPrice).toFixed(0)}</span>
                    <button type="button" onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 p-0.5 flex-shrink-0">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 bg-[#F5F7FA] border-b border-gray-100">
              <h3 className="text-[#1B4F72] text-sm">Summary</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="text-gray-600">Discount ($)</label>
                <input
                  value={discount}
                  onChange={e => setDiscount(parseFloat(e.target.value) || 0)}
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-24 px-2 py-1.5 border border-gray-200 rounded-lg text-sm text-right focus:outline-none focus:border-[#2E86C1]"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Tax ({clinicProfile.taxRate}%)</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-[#1B4F72] font-bold border-t border-gray-100 pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 bg-[#F5F7FA] border-b border-gray-100">
              <h3 className="text-[#1B4F72] text-sm">Payment</h3>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-[#333333] text-sm mb-2">Payment Status</label>
                <div className="flex gap-2">
                  {(["paid", "partial", "unpaid"] as const).map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setPaymentStatus(s)}
                      className={`flex-1 py-2.5 rounded-xl text-sm border-2 capitalize transition-colors ${
                        paymentStatus === s
                          ? s === "paid" ? "border-green-500 bg-green-50 text-green-700"
                            : s === "partial" ? "border-amber-500 bg-amber-50 text-amber-700"
                            : "border-red-500 bg-red-50 text-red-700"
                          : "border-gray-200 text-gray-500"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              {paymentStatus !== "unpaid" && (
                <div>
                  <label className="block text-[#333333] text-sm mb-2">Payment Method</label>
                  <div className="flex gap-2">
                    {(["cash", "card", "transfer"] as const).map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setPaymentMethod(m)}
                        className={`flex-1 py-2.5 rounded-xl text-sm border-2 capitalize transition-colors ${
                          paymentMethod === m
                            ? "border-[#1B4F72] bg-[#1B4F72]/5 text-[#1B4F72]"
                            : "border-gray-200 text-gray-500"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => navigate(-1)} className="flex-1 py-4 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-4 bg-[#1B4F72] text-white rounded-xl hover:bg-[#2E86C1] transition-colors flex items-center justify-center gap-2 shadow-md">
              <Save size={18} /> Generate Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
