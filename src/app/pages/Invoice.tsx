import { useNavigate, useParams } from "react-router";
import { Printer, Download, CheckCircle, Clock, AlertCircle, Edit2, PawPrint } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/PageHeader";
import { useState } from "react";

export function InvoicePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getInvoiceById, getPetById, getOwnerById, getVisitById, updateInvoice, clinicProfile } = useApp();

  const invoice = getInvoiceById(id || "");
  const pet = invoice ? getPetById(invoice.petId) : undefined;
  const owner = pet ? getOwnerById(pet.ownerId) : undefined;
  const visit = invoice ? getVisitById(invoice.visitId) : undefined;

  const [editingStatus, setEditingStatus] = useState(false);

  if (!invoice) return <div className="p-6 text-center text-gray-500">Invoice not found</div>;

  const statusConfig = {
    paid: { label: "Paid", bg: "bg-green-100", text: "text-green-700", icon: <CheckCircle size={16} /> },
    unpaid: { label: "Unpaid", bg: "bg-red-100", text: "text-red-700", icon: <AlertCircle size={16} /> },
    partial: { label: "Partial", bg: "bg-amber-100", text: "text-amber-700", icon: <Clock size={16} /> },
  };
  const cfg = statusConfig[invoice.paymentStatus];

  const handlePaymentUpdate = (status: "paid" | "unpaid" | "partial", method: string) => {
    updateInvoice(invoice.id, { paymentStatus: status, paymentMethod: method as any });
    setEditingStatus(false);
  };

  return (
    <div>
      <PageHeader title="Invoice" showBack />
      <div className="max-w-2xl mx-auto">
        {/* Invoice Card */}
        <div className="bg-white mx-4 my-4 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-[#1B4F72] text-white px-6 py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <PawPrint size={20} className="text-[#7FB3D3]" />
                  <span className="text-[#7FB3D3] text-sm">{clinicProfile.name}</span>
                </div>
                <h2 className="text-white text-xl">{invoice.invoiceNumber}</h2>
                <p className="text-[#AED6F1] text-sm mt-1">Date: {invoice.date}</p>
              </div>
              <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm ${cfg.bg} ${cfg.text}`}>
                {cfg.icon} {cfg.label}
              </span>
            </div>
          </div>

          {/* Patient Info */}
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs mb-0.5">Patient</p>
                <p className="text-[#333333] font-medium">{pet?.name} ({pet?.species})</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-0.5">Owner</p>
                <p className="text-[#333333] font-medium">{owner?.name}</p>
              </div>
              {owner?.phone && (
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">Phone</p>
                  <p className="text-[#333333]">{owner.phone}</p>
                </div>
              )}
              {visit && (
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">Visit Date</p>
                  <p className="text-[#333333]">{visit.date}</p>
                </div>
              )}
            </div>
          </div>

          {/* Line Items */}
          <div className="px-6 py-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-xs border-b border-gray-100 pb-2">
                  <th className="text-left py-2">Description</th>
                  <th className="text-right py-2 w-12">Qty</th>
                  <th className="text-right py-2 w-24">Unit Price</th>
                  <th className="text-right py-2 w-24">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {invoice.items.map(item => (
                  <tr key={item.id} className="text-[#333333]">
                    <td className="py-3">{item.description}</td>
                    <td className="text-right py-3">{item.quantity}</td>
                    <td className="text-right py-3">${item.unitPrice.toFixed(2)}</td>
                    <td className="text-right py-3">${(item.quantity * item.unitPrice).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>${invoice.subtotal.toFixed(2)}</span>
            </div>
            {invoice.discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>-${invoice.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tax ({clinicProfile.taxRate}%)</span>
              <span>${invoice.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#1B4F72] font-bold border-t border-gray-200 pt-2">
              <span>Total</span>
              <span>${invoice.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="px-6 py-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs mb-1">Payment Status</p>
                <div className={`flex items-center gap-1.5 text-sm ${cfg.text}`}>
                  {cfg.icon}
                  <span>{cfg.label}</span>
                  {invoice.paymentMethod && (
                    <span className="text-gray-400 ml-1 capitalize">· {invoice.paymentMethod}</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setEditingStatus(!editingStatus)}
                className="flex items-center gap-1.5 text-[#2E86C1] text-sm hover:text-[#1B4F72] transition-colors"
              >
                <Edit2 size={14} /> Update
              </button>
            </div>

            {editingStatus && (
              <div className="mt-3 space-y-2">
                <p className="text-gray-500 text-xs">Mark as:</p>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { status: "paid" as const, label: "Paid - Cash", method: "cash" },
                    { status: "paid" as const, label: "Paid - Card", method: "card" },
                    { status: "paid" as const, label: "Paid - Transfer", method: "transfer" },
                    { status: "partial" as const, label: "Partial", method: "cash" },
                    { status: "unpaid" as const, label: "Unpaid", method: "" },
                  ].map(opt => (
                    <button
                      key={opt.label}
                      onClick={() => handlePaymentUpdate(opt.status, opt.method)}
                      className="px-3 py-2 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Clinic Footer */}
          <div className="px-6 py-3 bg-[#1B4F72]/5 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-xs">{clinicProfile.address} · {clinicProfile.phone}</p>
            <p className="text-gray-400 text-xs mt-0.5">License: {clinicProfile.licenseNumber}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-4 pb-8">
          <button className="flex-1 flex items-center justify-center gap-2 py-4 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
            <Download size={18} /> Download PDF
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#1B4F72] text-white rounded-xl hover:bg-[#2E86C1] transition-colors shadow-md">
            <Printer size={18} /> Print
          </button>
        </div>
      </div>
    </div>
  );
}
