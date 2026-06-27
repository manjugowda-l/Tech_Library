import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [roadmaps, setRoadmaps] = useState<any[]>([]);

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState("");

  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [noteCategory, setNoteCategory] = useState("");
  const [notePdf, setNotePdf] = useState<File | null>(null);
  const [noteThumbnail, setNoteThumbnail] = useState<File | null>(null);
  const [editingNoteId, setEditingNoteId] = useState("");

  const [roadmapTitle, setRoadmapTitle] = useState("");
  const [roadmapLevel, setRoadmapLevel] = useState("Beginner");
  const [roadmapSteps, setRoadmapSteps] = useState<any[]>([
    { title: "", noteId: "" },
  ]);
  const [editingRoadmapId, setEditingRoadmapId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      setAdminToken(token);
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchCategories();
      fetchNotes();
      fetchRoadmaps();
    }
  }, [isAdmin]);

  const api = axios.create({
    baseURL: "http://localhost:5000",
    headers: adminToken ? { Authorization: `Bearer ${adminToken}` } : undefined,
  });

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  const fetchNotes = async () => {
    const res = await api.get("/notes");
    setNotes(res.data);
  };

  const fetchRoadmaps = async () => {
    const res = await api.get("/roadmaps");
    setRoadmaps(res.data);
  };

  const loginAdmin = async () => {
    try {
      const res = await api.post("/admin/login", {
        password: adminPassword,
      });

      const token = res.data.token;
      if (!token) {
        setLoginError("Invalid server response.");
        return;
      }

      localStorage.setItem("admin_token", token);
      setAdminToken(token);
      setIsAdmin(true);
      setLoginError("");
      setAdminPassword("");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Incorrect password";
      setLoginError(message);
    }
  };

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginAdmin();
  };

  const logoutAdmin = () => {
    localStorage.removeItem("admin_token");
    setAdminToken(null);
    setIsAdmin(false);
  };

  const resetCategoryForm = () => {
    setEditingCategoryId("");
    setCategoryName("");
    setCategoryDescription("");
  };

  const resetNoteForm = () => {
    setEditingNoteId("");
    setNoteTitle("");
    setNoteDescription("");
    setNoteCategory("");
    setNotePdf(null);
    setNoteThumbnail(null);
  };

  const resetRoadmapForm = () => {
    setEditingRoadmapId("");
    setRoadmapTitle("");
    setRoadmapLevel("Beginner");
    setRoadmapSteps([{ title: "", noteId: "" }]);
  };

  const saveCategory = async () => {
    if (!categoryName.trim()) {
      alert("Enter category name");
      return;
    }

    if (editingCategoryId) {
      await api.put(`/categories/${editingCategoryId}`, {
        name: categoryName,
        description: categoryDescription,
      });
      alert("Category updated");
    } else {
      await api.post("/categories", {
        name: categoryName,
        description: categoryDescription,
      });
      alert("Category created");
    }

    resetCategoryForm();
    fetchCategories();
  };

  const editCategory = (categoryItem: any) => {
    setEditingCategoryId(categoryItem._id);
    setCategoryName(categoryItem.name || "");
    setCategoryDescription(categoryItem.description || "");
  };

  const deleteCategory = async (id: string) => {
    if (!window.confirm("Delete this category?")) {
      return;
    }
    await api.delete(`/categories/${id}`);
    if (editingCategoryId === id) {
      resetCategoryForm();
    }
    fetchCategories();
  };

  const saveNote = async () => {
    if (!noteTitle.trim() || !noteCategory.trim()) {
      alert("Enter note title and category");
      return;
    }

    const formData = new FormData();
    formData.append("title", noteTitle);
    formData.append("description", noteDescription);
    formData.append("category", noteCategory);

    if (notePdf) {
      formData.append("pdf", notePdf);
    }

    if (noteThumbnail) {
      formData.append("thumbnail", noteThumbnail);
    }

    if (editingNoteId) {
      await api.put(`/notes/${editingNoteId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Note updated");
    } else {
      await api.post("/notes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Note created");
    }

    resetNoteForm();
    fetchNotes();
  };

  const editNote = (noteItem: any) => {
    setEditingNoteId(noteItem._id);
    setNoteTitle(noteItem.title || "");
    setNoteDescription(noteItem.description || "");
    setNoteCategory(noteItem.category || "");
    setNotePdf(null);
    setNoteThumbnail(null);
  };

  const deleteNote = async (id: string) => {
    if (!window.confirm("Delete this note?")) {
      return;
    }
    await api.delete(`/notes/${id}`);
    if (editingNoteId === id) {
      resetNoteForm();
    }
    fetchNotes();
  };

  const saveRoadmap = async () => {
    if (!roadmapTitle.trim()) {
      alert("Enter roadmap title");
      return;
    }

    const roadmapData = {
      title: roadmapTitle,
      level: roadmapLevel,
      steps: roadmapSteps.map((step) => ({
        title: step.title,
        noteId: step.noteId,
      })),
    };

    if (editingRoadmapId) {
      await api.put(`/roadmaps/${editingRoadmapId}`, roadmapData);
      alert("Roadmap updated");
    } else {
      await api.post("/roadmaps", roadmapData);
      alert("Roadmap created");
    }

    resetRoadmapForm();
    fetchRoadmaps();
  };

  const editRoadmap = (roadmapItem: any) => {
    setEditingRoadmapId(roadmapItem._id);
    setRoadmapTitle(roadmapItem.title || "");
    setRoadmapLevel(roadmapItem.level || "Beginner");
    setRoadmapSteps(
      roadmapItem.steps?.length
        ? roadmapItem.steps.map((step: any) => ({
            title: step.title || "",
            noteId: step.noteId || "",
          }))
        : [{ title: "", noteId: "" }]
    );
  };

  const deleteRoadmap = async (id: string) => {
    if (!window.confirm("Delete this roadmap?")) {
      return;
    }
    await api.delete(`/roadmaps/${id}`);
    if (editingRoadmapId === id) {
      resetRoadmapForm();
    }
    fetchRoadmaps();
  };

  const addRoadmapStep = () => {
    setRoadmapSteps([...roadmapSteps, { title: "", noteId: "" }]);
  };

  const removeRoadmapStep = (index: number) => {
    const updated = roadmapSteps.filter((_, idx) => idx !== index);
    setRoadmapSteps(updated.length ? updated : [{ title: "", noteId: "" }]);
  };

  const updateRoadmapStep = (index: number, field: string, value: string) => {
    const updated = [...roadmapSteps];
    updated[index] = { ...updated[index], [field]: value };
    setRoadmapSteps(updated);
  };

  const [expandedNoteCategories, setExpandedNoteCategories] = useState<Record<string, boolean>>({});
  const [expandedRoadmapGroups, setExpandedRoadmapGroups] = useState<Record<string, boolean>>({});

  const sectionCard = "rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/10";
  const fieldLabel = "mb-2 block text-sm font-medium text-slate-300";
  const inputClass = "h-11 rounded-2xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-base text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-indigo-500/25 focus:ring-1";
  const textareaClass = "min-h-[104px] rounded-2xl border border-slate-800 bg-slate-950/80 px-3 py-3 text-base text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-indigo-500/25 focus:ring-1";
  const selectClass = "w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-3 py-3 text-sm text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-indigo-500/25 focus:ring-1";
  const primaryButtonClass = "h-11 min-w-[140px] rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-sky-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:to-sky-400";
  const secondaryButtonClass = "h-11 min-w-[120px] rounded-xl bg-slate-800 text-slate-100 hover:bg-slate-700";
  const outlineButtonClass = "h-11 min-w-[120px] rounded-xl border border-slate-700 bg-transparent text-slate-100 hover:bg-slate-900";
  const cardActionButton = "h-10 min-w-[96px] rounded-xl text-sm";
  const cardItem = "rounded-2xl border border-slate-800 bg-slate-950/80 p-4 transition hover:border-slate-600 hover:bg-slate-900/80";
  const scrollAreaClass = "overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-inner shadow-slate-950/20 flex-1 min-h-0";
  const scrollInnerClass = "h-full min-h-0 overflow-y-auto p-4 pr-2 space-y-3 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-950/40 hover:scrollbar-thumb-slate-500";

  const toggleNoteCategory = (category: string) => {
    setExpandedNoteCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleRoadmapGroup = (group: string) => {
    setExpandedRoadmapGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  const noteGroups = notes.reduce((groups: Record<string, any[]>, note) => {
    const category = note.category || "Uncategorized";
    groups[category] = groups[category] || [];
    groups[category].push(note);
    return groups;
  }, {} as Record<string, any[]>);

  const noteCategories = Object.entries(noteGroups).sort((a, b) => b[1].length - a[1].length);

  const noteById = notes.reduce((map: Record<string, any>, note) => {
    map[note._id] = note;
    return map;
  }, {} as Record<string, any>);

  const getRoadmapGroupName = (roadmapItem: any) => {
    const linkedNote = roadmapItem.steps?.map((step: any) => noteById[step.noteId]).find(Boolean);
    return linkedNote?.category || "General";
  };

  const roadmapGroups = roadmaps.reduce((groups: Record<string, any[]>, roadmapItem) => {
    const groupName = getRoadmapGroupName(roadmapItem);
    groups[groupName] = groups[groupName] || [];
    groups[groupName].push(roadmapItem);
    return groups;
  }, {} as Record<string, any[]>);

  const roadmapCategories = Object.entries(roadmapGroups).sort((a, b) => b[1].length - a[1].length);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
        <div className="mx-auto flex w-full max-w-md flex-col rounded-3xl border border-slate-800 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/20">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">Admin Login</h1>
            <p className="mt-3 text-sm text-slate-400">Enter the password to access the admin dashboard.</p>
          </div>
          <form className="space-y-6" onSubmit={handleLoginSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
              <Input
                className="h-11 w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-base text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-indigo-500/25 focus:ring-1"
                type="password"
                value={adminPassword}
                onChange={(e) => {
                  setAdminPassword(e.target.value);
                  if (loginError) setLoginError("");
                }}
                placeholder="Enter admin password"
              />
            </div>
            {loginError ? (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{loginError}</div>
            ) : null}
            <Button className="w-full" type="submit">Login</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Admin Panel</p>
            <h1 className="mt-3 text-4xl font-black text-white">Manage Notes, Categories, Roadmaps</h1>
            <p className="mt-2 max-w-2xl text-slate-400">A clean admin workspace for adding, updating and organizing your content without changing backend logic.</p>
          </div>
          <Button variant="outline" onClick={logoutAdmin}>Logout</Button>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_1.85fr]">
          <div className={`${sectionCard} lg:sticky lg:top-6 lg:self-start`}>
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-white">Categories</h2>
              <p className="mt-1 text-sm text-slate-400">Manage category names and descriptions used by notes.</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className={fieldLabel}>Category Name</label>
                <Input className={inputClass} value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Enter category name" />
              </div>
              <div>
                <label className={fieldLabel}>Description</label>
                <Textarea className={textareaClass} value={categoryDescription} onChange={(e) => setCategoryDescription(e.target.value)} placeholder="Enter category description" />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button className={primaryButtonClass} onClick={saveCategory}>{editingCategoryId ? "Update Category" : "Create Category"}</Button>
                <Button className={outlineButtonClass} onClick={resetCategoryForm}>Reset</Button>
              </div>
            </div>
          </div>

          <div className={`${sectionCard} h-[650px] flex flex-col`}>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Existing Categories</h2>
                <p className="mt-1 text-sm text-slate-400">Browse your categories in a compact scrollable list.</p>
              </div>
              <span className="rounded-full bg-slate-900 px-3 py-1 text-sm text-slate-300">{categories.length} total</span>
            </div>
            <div className={scrollAreaClass}>
              <div className={scrollInnerClass}>
                {categories.length ? (
                  categories.map((categoryItem) => (
                    <div key={categoryItem._id} className={`${cardItem} sm:grid-cols-[1fr_auto_auto] sm:grid sm:items-center`}>
                      <div>
                        <p className="font-medium text-white">{categoryItem.name}</p>
                        <p className="mt-1 text-sm text-slate-500">{categoryItem.description || "No description"}</p>
                      </div>
                      <div className="flex items-center justify-end gap-2 sm:col-span-2">
                        <Button variant="outline" className={cardActionButton} onClick={() => editCategory(categoryItem)}>Edit</Button>
                        <Button variant="destructive" className={cardActionButton} onClick={() => deleteCategory(categoryItem._id)}>Delete</Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/90 p-8 text-center text-sm text-slate-400">
                    <p className="text-white">No categories yet.</p>
                    <p className="mt-2">Create your first category to start organizing notes.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_1.85fr]">
          <div className={`${sectionCard} lg:sticky lg:top-6 lg:self-start`}>
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-white">Notes</h2>
              <p className="mt-1 text-sm text-slate-400">Create or edit notes while the grouped list remains visible.</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className={fieldLabel}>Note Title</label>
                <Input className={inputClass} value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} placeholder="Enter note title" />
              </div>
              <div>
                <label className={fieldLabel}>Note Description</label>
                <Textarea className={textareaClass} value={noteDescription} onChange={(e) => setNoteDescription(e.target.value)} placeholder="Enter note description" />
              </div>
              <div>
                <label className={fieldLabel}>Category</label>
                <select className={selectClass} value={noteCategory} onChange={(e) => setNoteCategory(e.target.value)}>
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={fieldLabel}>PDF File</label>
                <Input className={inputClass} type="file" accept=".pdf" onChange={(e) => setNotePdf(e.target.files?.[0] || null)} />
              </div>
              <div>
                <label className={fieldLabel}>Thumbnail</label>
                <Input className={inputClass} type="file" accept="image/*" onChange={(e) => setNoteThumbnail(e.target.files?.[0] || null)} />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button className={primaryButtonClass} onClick={saveNote}>{editingNoteId ? "Update Note" : "Create Note"}</Button>
                <Button className={outlineButtonClass} onClick={resetNoteForm}>Reset</Button>
              </div>
            </div>
          </div>

          <div className={`${sectionCard} h-[650px] flex flex-col`}>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Notes by Category</h2>
                <p className="mt-1 text-sm text-slate-400">Expand a category group to manage its notes.</p>
              </div>
              <span className="rounded-full bg-slate-900 px-3 py-1 text-sm text-slate-300">{notes.length} total</span>
            </div>
            <div className={scrollAreaClass}>
              <div className={scrollInnerClass}>
                {noteCategories.length ? (
                  noteCategories.map(([category, categoryNotes]) => {
                    const expanded = expandedNoteCategories[category];
                    return (
                      <div key={category} className="space-y-3">
                        <button
                          type="button"
                          className="w-full rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-left transition hover:border-slate-600"
                          onClick={() => toggleNoteCategory(category)}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="text-sm font-semibold text-white">{category}</p>
                              <p className="mt-1 text-sm text-slate-400">{categoryNotes.length} note{categoryNotes.length === 1 ? "" : "s"}</p>
                            </div>
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-slate-300 transition">{expanded ? "−" : "+"}</span>
                          </div>
                        </button>
                        {expanded ? (
                          <div className="space-y-3">
                            {categoryNotes.map((noteItem) => (
                              <div key={noteItem._id} className={cardItem}>
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                  <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <p className="font-semibold text-white">{noteItem.title}</p>
                                      <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs text-slate-300">{noteItem.category || "Uncategorized"}</span>
                                    </div>
                                    <p className="mt-2 text-sm text-slate-500">{noteItem.description || "No description"}</p>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    <Button variant="outline" className={cardActionButton} onClick={() => editNote(noteItem)}>Edit</Button>
                                    <Button variant="destructive" className={cardActionButton} onClick={() => deleteNote(noteItem._id)}>Delete</Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    );
                  })
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/90 p-8 text-center text-sm text-slate-400">
                    <p className="text-white">No notes available.</p>
                    <p className="mt-2">Add a note to see it appear in the grouped list.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_1.85fr]">
          <div className={`${sectionCard} lg:sticky lg:top-6 lg:self-start`}>
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-white">Roadmaps</h2>
              <p className="mt-1 text-sm text-slate-400">Create or organize roadmaps while the list panel stays visible.</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className={fieldLabel}>Roadmap Title</label>
                <Input className={inputClass} value={roadmapTitle} onChange={(e) => setRoadmapTitle(e.target.value)} placeholder="Enter roadmap title" />
              </div>
              <div>
                <label className={fieldLabel}>Difficulty Level</label>
                <select className={selectClass} value={roadmapLevel} onChange={(e) => setRoadmapLevel(e.target.value)}>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                  <option>Beginner → Intermediate</option>
                  <option>Intermediate → Advanced</option>
                  <option>Advanced → Expert</option>
                  <option>Beginner → Advanced</option>
                </select>
              </div>
              <div className="space-y-4">
                {roadmapSteps.map((step, index) => (
                  <div key={index} className={cardItem}>
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <p className="text-sm font-medium text-white">Step {index + 1}</p>
                      <Button variant="outline" className={cardActionButton} onClick={() => removeRoadmapStep(index)}>Remove</Button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className={fieldLabel}>Step Title</label>
                        <Input className={inputClass} value={step.title} onChange={(e) => updateRoadmapStep(index, "title", e.target.value)} placeholder="Step title" />
                      </div>
                      <div>
                        <label className={fieldLabel}>Linked Note</label>
                        <select className={selectClass} value={step.noteId} onChange={(e) => updateRoadmapStep(index, "noteId", e.target.value)}>
                          <option value="">Select note</option>
                          {notes.map((noteItem) => (
                            <option key={noteItem._id} value={noteItem._id}>{noteItem.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button className={outlineButtonClass} onClick={addRoadmapStep}>Add Step</Button>
                <Button className={primaryButtonClass} onClick={saveRoadmap}>{editingRoadmapId ? "Update Roadmap" : "Create Roadmap"}</Button>
              </div>
            </div>
          </div>

          <div className={`${sectionCard} h-[650px] flex flex-col`}>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Roadmaps by Group</h2>
                <p className="mt-1 text-sm text-slate-400">Expand a group to manage related roadmaps.</p>
              </div>
              <span className="rounded-full bg-slate-900 px-3 py-1 text-sm text-slate-300">{roadmaps.length} total</span>
            </div>
            <div className={scrollAreaClass}>
              <div className={scrollInnerClass}>
                {roadmapCategories.length ? (
                  roadmapCategories.map(([groupName, groupRoadmaps]) => {
                    const expanded = expandedRoadmapGroups[groupName];
                    return (
                      <div key={groupName} className="space-y-3">
                        <button
                          type="button"
                          className="w-full rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-left transition hover:border-slate-600"
                          onClick={() => toggleRoadmapGroup(groupName)}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="text-sm font-semibold text-white">{groupName}</p>
                              <p className="mt-1 text-sm text-slate-400">{groupRoadmaps.length} roadmap{groupRoadmaps.length === 1 ? "" : "s"}</p>
                            </div>
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-slate-300 transition">{expanded ? "−" : "+"}</span>
                          </div>
                        </button>
                        {expanded ? (
                          <div className="space-y-3">
                            {groupRoadmaps.map((roadmapItem) => (
                              <div key={roadmapItem._id} className={cardItem}>
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                  <div className="min-w-0">
                                    <p className="font-semibold text-white">{roadmapItem.title}</p>
                                    <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-300">
                                      <span className="rounded-full bg-indigo-500/10 px-2.5 py-1">{roadmapItem.level || "Unknown"}</span>
                                      <span className="rounded-full bg-slate-900 px-2.5 py-1">{roadmapItem.steps?.length || 0} step{(roadmapItem.steps?.length || 0) === 1 ? "" : "s"}</span>
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    <Button variant="outline" className={cardActionButton} onClick={() => editRoadmap(roadmapItem)}>Edit</Button>
                                    <Button variant="destructive" className={cardActionButton} onClick={() => deleteRoadmap(roadmapItem._id)}>Delete</Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    );
                  })
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/90 p-8 text-center text-sm text-slate-400">
                    <p className="text-white">No roadmaps available.</p>
                    <p className="mt-2">Create a roadmap to start organizing learning paths.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}



    