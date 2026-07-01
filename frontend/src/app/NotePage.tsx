import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api, { API_BASE_URL } from "../config/api";

export default function NotePage() {

  const { id } = useParams();

  const [note, setNote] =
    useState<any>(null);

  useEffect(() => {

    api
      .get(`/notes/${id}`)
      .then((res) =>
        setNote(res.data)
      );

  }, [id]);

  if (!note) {
    return (
      <div className="p-10 text-white">
        Loading...
      </div>
    );
  }

  return (
  <div
    className="min-h-screen"
    style={{
      background:
        "radial-gradient(circle at top, rgba(79,70,229,0.15), transparent 35%), #020617"
    }}
  >
    <div className="max-w-6xl mx-auto px-6 py-16">

      <p
        className="text-xs font-mono uppercase tracking-widest mb-3"
        style={{ color: "#818cf8" }}
      >
        Note
      </p>

      <h1 className="text-5xl font-black text-white">
        {note.title}
      </h1>

      <p className="text-slate-500 mt-4">
        {note.description}
      </p>

      <img
        src={note.thumbnail}
        alt=""
        className="
          mt-10
          rounded-2xl
          border
          border-slate-800
          max-h-[400px]
        "
      />

      <button
        onClick={() => {
  window.open(note.pdfUrl, "_blank");
}}
        className="
          mt-8
          px-8
          py-4
          rounded-xl
          bg-indigo-600
          text-white
          font-semibold
          hover:bg-indigo-500
        "
      >
        Open PDF
      </button>

    </div>
  </div>
);
}