import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function RoadmapPage() {
  const { id } = useParams();

  const [roadmap, setRoadmap] = useState<any>(null);
  const [completedSteps, setCompletedSteps] =
  useState<string[]>([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/roadmaps/${id}`)
      .then((res) => setRoadmap(res.data));

      const saved =
  localStorage.getItem(
    `roadmap-${id}`
  );

if (saved) {
  setCompletedSteps(
    JSON.parse(saved)
  );
}
  }, [id]);

  if (!roadmap) {
    return (
      <div className="p-10 text-white">
        Loading...
      </div>
    );
  }



  const toggleStep = (
  stepId: string
) => {

  let updated;

  if (
    completedSteps.includes(stepId)
  ) {
    updated =
      completedSteps.filter(
        (id) => id !== stepId
      );
  } else {
    updated = [
      ...completedSteps,
      stepId,
    ];
  }

  setCompletedSteps(updated);

  localStorage.setItem(
    `roadmap-${id}`,
    JSON.stringify(updated)
  );
};


const percentage =
  roadmap
    ? Math.round(
        (completedSteps.length /
          roadmap.steps.length) *
          100
      )
    : 0;

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
        Structured Learning
      </p>

      <h1 className="text-5xl font-black text-white">
        {roadmap.title}
      </h1>

      <div className="flex items-center justify-between mt-4">
  <p className="text-slate-500">
    {roadmap.level}
  </p>

  <span className="text-white font-black text-2xl">
    {percentage}%
  </span>
</div>

<div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mt-6">
  <div
    className="h-full bg-indigo-500 rounded-full transition-all duration-500"
    style={{
      width: `${percentage}%`,
    }}
  />
</div>

<p className="text-slate-400 text-sm mt-2">
  {completedSteps.length} / {roadmap.steps.length} completed
</p>

      <div className="mt-12 grid gap-6">

        {roadmap.steps.map((step: any) => (

          <div
            key={step._id}
            onClick={() =>
              window.location.href =
                `/note/${step.noteId}`
            }
            className="
              rounded-2xl
              border
              border-slate-800
              bg-slate-900/70
              backdrop-blur-xl
              p-8
              cursor-pointer
              transition-all
              duration-300
              hover:border-indigo-500
              hover:-translate-y-1
            "
          >
            <div className="flex items-center gap-4">

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStep(step._id);
                }}
                className={`
                  w-5
                  h-5
                  rounded-full
                  border
                  cursor-pointer
                  flex
                  items-center
                  justify-center
                  
                  ${
                    completedSteps.includes(
                      step._id
                    )
                      ? "bg-green-500 border-green-500"
                      : "border-slate-500"
                  }
                `}
              >{completedSteps.includes(step._id)
    ? "✓"
    : ""}
</div>
              <h3 className="text-white font-bold text-xl">
                {step.title}
              </h3>

            </div>

          </div>

        ))}

      </div>

    </div>
  </div>
);
}