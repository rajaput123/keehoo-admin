import { useState, useEffect } from "react";
import { StickyNote, X, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const NOTES_KEY = "keehoo-global-notes";

export const GlobalNotes = () => {
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState<{ id: string; text: string; date: string }[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(NOTES_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [noteInput, setNoteInput] = useState("");

  const saveNotes = (updated: typeof notes) => {
    setNotes(updated);
    localStorage.setItem(NOTES_KEY, JSON.stringify(updated));
  };

  const addNote = () => {
    if (!noteInput.trim()) return;
    const newNote = {
      id: Date.now().toString(),
      text: noteInput.trim(),
      date: new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    };
    saveNotes([newNote, ...notes]);
    setNoteInput("");
  };

  const deleteNote = (id: string) => {
    saveNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <>
      {/* ── Global Floating Notes Button ── */}
      <button
        onClick={() => setShowNotes((p) => !p)}
        title="Change Notes"
        className={cn(
          "fixed bottom-6 right-6 z-[9999] h-12 w-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 active:scale-95",
          showNotes
            ? "bg-amber-500 text-white rotate-12 scale-110"
            : "bg-white border-2 border-amber-200 text-amber-500 hover:bg-amber-50 hover:border-amber-300"
        )}
      >
        <StickyNote size={20} strokeWidth={2.5} />
        {notes.length > 0 && !showNotes && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg border-2 border-white">
            {notes.length}
          </span>
        )}
      </button>

      {/* ── Global Notes Panel ── */}
      {showNotes && (
        <>
          <div
            className="fixed inset-0 z-[9998] bg-black/5 backdrop-blur-[1px]"
            onClick={() => setShowNotes(false)}
          />
          <div
            className="fixed bottom-20 right-6 z-[9999] w-85 bg-white rounded-2xl border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
            style={{ width: "340px", maxHeight: "70vh" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-amber-100 bg-amber-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <StickyNote size={16} className="text-amber-600" />
                </div>
                <div>
                  <span className="text-sm font-bold text-gray-900 block leading-none">Change Notes</span>
                  <span className="text-[10px] text-amber-600 font-medium uppercase tracking-wider mt-1 block">Global System Notes</span>
                </div>
              </div>
              <button
                onClick={() => setShowNotes(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-xl hover:bg-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Add Note */}
            <div className="px-5 py-4 border-b border-gray-100 bg-white">
              <textarea
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) addNote();
                }}
                placeholder="Write a change note... (Ctrl+Enter to save)"
                rows={3}
                className="w-full text-sm border-2 border-gray-100 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 bg-gray-50/30 transition-all placeholder:text-gray-400"
              />
              <div className="flex items-center justify-between mt-3">
                <span className="text-[10px] text-gray-400 italic">Supports multiple lines</span>
                <button
                  onClick={addNote}
                  disabled={!noteInput.trim()}
                  className="flex items-center justify-center gap-2 px-4 h-9 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-md shadow-amber-200"
                >
                  <Plus size={14} /> Add Note
                </button>
              </div>
            </div>

            {/* Notes List */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-gray-50/50">
              {notes.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-gray-100">
                    <StickyNote size={28} className="text-gray-200" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">No notes yet.</p>
                  <p className="text-xs text-gray-400 mt-1">Capture your thoughts or system changes here.</p>
                </div>
              ) : (
                notes.map((n) => (
                  <div
                    key={n.id}
                    className="bg-white border border-amber-100 rounded-2xl p-4 group relative shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-l-amber-400"
                  >
                    <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed pr-6">
                      {n.text}
                    </p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                      <span className="text-[10px] font-bold text-amber-500/70 uppercase tracking-tighter">
                        {n.date}
                      </span>
                      <button
                        onClick={() => deleteNote(n.id)}
                        className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all p-1 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
