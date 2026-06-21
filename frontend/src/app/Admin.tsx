import { useState, useEffect } from "react";
import axios from "axios";

export default function Admin() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryDescription, setCategoryDescription] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState<any[]>([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [pdf, setPdf] =
  useState<File | null>(null);
  const [roadmapTitle, setRoadmapTitle] =
  useState("");

const [roadmapLevel, setRoadmapLevel] =
  useState("Beginner → Advanced");
  const [roadmapSteps, setRoadmapSteps] =
  useState<any[]>([
    {
      title: "",
      noteId: "",
    },
  ]);

  const [thumbnail, setThumbnail] =
    useState<File | null>(null);
    
  useEffect(() => {
  fetchCategories();
  fetchNotes();
}, []);

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/categories");
    setCategories(res.data);
  };
  const fetchNotes = async () => {
  const res = await axios.get(
    "http://localhost:5000/notes"
  );

  setNotes(res.data);
};

  const addRoadmapStep = () => {
  setRoadmapSteps([
    ...roadmapSteps,

    {
      title: "",
      noteId: "",
    },
  ]);
};

const createRoadmap = async () => {

  await axios.post(
    "http://localhost:5000/roadmaps",
    {
      title: roadmapTitle,
      level: roadmapLevel,
      steps: roadmapSteps,
    }
  );

  alert("Roadmap Created");

  setRoadmapTitle("");

  setRoadmapLevel(
    "Beginner → Advanced"
  );

  setRoadmapSteps([
    {
      title: "",
      noteId: "",
    },
  ]);
};

  const createCategory = async () => {
    if (!categoryName.trim()) {
      alert("Enter category name");
      return;
    }

    await axios.post("http://localhost:5000/categories", {
      name: categoryName,
      description: categoryDescription,
    });

    alert("Category Created");

    setCategoryName("");
    setCategoryDescription("");
    fetchCategories();
  };

 const createNote = async () => {

  const formData = new FormData();

  formData.append("title", title);
  formData.append("description", description);
  formData.append("category", category);

  if (pdf) {
    formData.append("pdf", pdf);
  }

  if (thumbnail) {
    formData.append("thumbnail", thumbnail);
  }

  await axios.post(
    "http://localhost:5000/notes",
    formData
  );

  alert("Note Created");

  setTitle("");
  setDescription("");
  setCategory("");

  setPdf(null);
  setThumbnail(null);
};

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Dashboard</h1>

      <h2>Create Category</h2>

      <input
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Category Name"
      />

      <br /><br />

      <textarea
        value={categoryDescription}
        onChange={(e) =>
          setCategoryDescription(e.target.value)
        }
        placeholder="Category Description"
      />

      <br /><br />

      <button onClick={createCategory}>
        Create Category
      </button>

      <hr style={{ margin: "30px 0" }} />

      <h2>Create Note</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
      />

      <br />
      <br />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>

        {categories.map((cat) => (
          <option key={cat._id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <br />
      <br />
      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setPdf(
            e.target.files?.[0] || null
          )
        }
      />

      <br /><br />

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setThumbnail(
            e.target.files?.[0] || null
          )
        }
      />

      <button onClick={createNote}>
        Create Note
      </button>


      <hr style={{ margin: "30px 0" }} />

      <h2>Create Roadmap</h2>

        <input
          value={roadmapTitle}
          onChange={(e) =>
            setRoadmapTitle(e.target.value)
          }
          placeholder="Roadmap Title"
        />

        <br /><br />

        <select
        value={roadmapLevel}
        onChange={(e) =>
          setRoadmapLevel(e.target.value)
        }
      >
        <option>Beginner</option>

        <option>Intermediate</option>

        <option>Advanced</option>

        <option>Expert</option>

        <option>Beginner → Intermediate</option>

        <option>Intermediate → Advanced</option>

        <option>Advanced → Expert</option>

        <option>Beginner → Advanced</option>

        <option>Beginner → Expert</option>
      </select>

      <br />
        <br />

        <h3>Roadmap Steps</h3>

        {roadmapSteps.map((step, index) => (
          <div
            key={index}
            style={{
              marginBottom: "20px",
            }}
          >
            <input
              placeholder="Step Title"
              value={step.title}
              onChange={(e) => {
                const updated =
                  [...roadmapSteps];

                updated[index].title =
                  e.target.value;

                setRoadmapSteps(updated);
              }}
            />

            <br />
            <br />

            <select
              value={step.noteId}
              onChange={(e) => {
                const updated =
                  [...roadmapSteps];

                updated[index].noteId =
                  e.target.value;

                setRoadmapSteps(updated);
              }}
            >
              <option value="">
                Select Note
              </option>

              {notes.map((note: any) => (
                <option
                  key={note._id}
                  value={note._id}
                >
                  {note.title}
                </option>
              ))}

             
          </select>
        </div>
      ))}
      <button onClick={addRoadmapStep}>
        Add Step
      </button>
      <br />
      <br />

      <button
        onClick={createRoadmap}
      >
        Create Roadmap
      </button>
    </div>
  );
}