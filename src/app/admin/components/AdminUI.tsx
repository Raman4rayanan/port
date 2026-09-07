"use client";

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  hint?: string;
  type?: string;
}

export function FormField({ label, value, onChange, placeholder, multiline, rows = 3, hint, type = "text" }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">{label}</label>
      {multiline ? (
        <textarea
          rows={rows}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent border border-white/10 focus:border-white/30 text-white placeholder-zinc-700 font-sans text-sm p-3 outline-none transition-colors resize-none rounded-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent border-b border-white/20 focus:border-white pb-2 pt-1 text-white placeholder-zinc-700 font-sans text-sm outline-none transition-colors"
        />
      )}
      {hint && <span className="font-mono text-[9px] text-zinc-600 uppercase">{hint}</span>}
    </div>
  );
}

interface FormSelectProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}

export function FormSelect({ label, value, onChange, options }: FormSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-[#1a1a1a] border border-white/10 text-white font-mono text-xs tracking-widest uppercase p-3 outline-none focus:border-white/30 transition-colors"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

interface AdminButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "ghost" | "danger";
  className?: string;
  disabled?: boolean;
}

export function AdminButton({ children, onClick, type = "button", variant = "primary", className = "", disabled }: AdminButtonProps) {
  const base = "font-mono text-xs tracking-widest uppercase px-6 py-3 transition-colors border disabled:opacity-40 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-white text-black border-white hover:bg-zinc-200",
    ghost: "bg-transparent text-zinc-400 border-white/20 hover:text-white hover:border-white/40",
    danger: "bg-transparent text-red-400 border-red-500/30 hover:bg-red-500/10 hover:border-red-400",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

interface ConfirmDeleteProps {
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDelete({ itemName, onConfirm, onCancel }: ConfirmDeleteProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80" onClick={onCancel} />
      <div className="relative bg-[#111] border border-white/10 p-8 max-w-md w-full mx-4">
        <div className="font-mono text-[10px] tracking-widest text-red-400 uppercase mb-4">[ CONFIRM DELETE ]</div>
        <p className="font-sans text-white mb-2">Delete <span className="font-bold">&ldquo;{itemName}&rdquo;</span>?</p>
        <p className="font-mono text-xs text-zinc-500 mb-8">This action cannot be undone.</p>
        <div className="flex gap-4">
          <AdminButton variant="danger" onClick={onConfirm}>DELETE</AdminButton>
          <AdminButton variant="ghost" onClick={onCancel}>CANCEL</AdminButton>
        </div>
      </div>
    </div>
  );
}
