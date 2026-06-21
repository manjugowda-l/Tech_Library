import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NoteCard from "./NoteCard";

export default function CategoryPage() {
  const { name } = useParams();

  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/notes")
      .then((res) => setNotes(res.data));
  }, []);

  const categoryNotes = notes.filter(
    (note) => note.category === name
  );

 return (
  <div
    className="min-h-screen text-slate-200"
    style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      background:
        "linear-gradient(135deg, #05080f 0%, #080d1a 50%, #05080f 100%)",
    }}
  >
    {/* Ambient glow */}
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, #4f46e5 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, #7c3aed 0%, transparent 70%)",
        }}
      />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">

      <h1 className="text-5xl font-black text-white mb-3">
        {name} Notes
      </h1>

      <p className="text-slate-500 mb-12">
        Explore all notes available in {name}.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categoryNotes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
          />
        ))}
      </div>

    </div>
  </div>
);
}