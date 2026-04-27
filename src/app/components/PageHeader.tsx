import { useNavigate } from "react-router";
import { ArrowLeft, Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  action?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };
}

export function PageHeader({ title, subtitle, showBack = false, action }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-gray-100 px-4 py-4 md:px-6">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors text-[#1B4F72] flex-shrink-0"
          >
            <ArrowLeft size={22} />
          </button>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-[#1B4F72] truncate">{title}</h1>
          {subtitle && <p className="text-gray-500 text-sm mt-0.5">{subtitle}</p>}
        </div>
        {action && (
          <button
            onClick={action.onClick}
            className="flex items-center gap-2 bg-[#1B4F72] text-white px-4 py-2.5 rounded-xl hover:bg-[#2E86C1] transition-colors flex-shrink-0 shadow-sm"
          >
            {action.icon || <Plus size={18} />}
            <span className="text-sm hidden sm:inline">{action.label}</span>
          </button>
        )}
      </div>
    </div>
  );
}
