import { ArrowRight, FileText } from "lucide-react";

export default function NoteCard({ note }: { note: any }) {
  return (
    <div
      className="group relative flex flex-col rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        background:
          "linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(8,15,30,0.95) 100%)",
        backdropFilter: "blur(16px)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
      onClick={() =>
        window.open(
          `http://localhost:5000/uploads/pdfs/${note.pdfUrl}`,
          "_blank"
        )
      }
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow =
          "0 0 40px rgba(99,102,241,0.25), 0 12px 40px rgba(0,0,0,0.5)";
        el.style.borderColor = "rgba(99,102,241,0.4)";
        el.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "none";
        el.style.borderColor = "rgba(255,255,255,0.06)";
        el.style.transform = "translateY(0)";
      }}
    >
      <img
        src={`http://localhost:5000/uploads/thumbnails/${note.thumbnail}`}
        alt={note.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-6 flex flex-col gap-4 flex-1">
        <div>
          <h3 className="font-bold text-lg text-white mb-2">
            {note.title}
          </h3>

          <p
            className="text-[13px] text-slate-500 leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {note.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <FileText size={12} />
            <span className="font-mono">PDF Note</span>
          </div>

          <button
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 transition-all duration-200 group-hover:gap-2"
          >
            Open PDF <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}