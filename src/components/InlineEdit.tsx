import { useState } from "react";

interface InlineEditProps {
  value: string;
  onSave: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
  displayClassName?: string;
}

export function InlineEdit({ value, onSave, multiline = false, placeholder, displayClassName = "" }: InlineEditProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleStartEditing = () => {
    setEditValue(value);
    setEditing(true);
  };

  const handleSave = () => {
    onSave(editValue);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  if (editing) {
    const inputClass =
      "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";

    return (
      <div>
        {multiline
          ? (
            <textarea
              autoFocus
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") handleCancel();
              }}
              rows={3}
              className={`${inputClass} text-gray-600`}
            />
          )
          : (
            <input
              autoFocus
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") handleCancel();
              }}
              className={`${inputClass} text-xl font-bold text-gray-900`}
            />
          )}
        <div className="mt-2 flex gap-2">
          <button
            onClick={handleSave}
            className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleStartEditing}
      className={`cursor-pointer hover:text-indigo-600 ${displayClassName}`}
    >
      {value
        ? (multiline ? <p>{value}</p> : <span>{value}</span>)
        : <span className="italic text-gray-400">{placeholder || "Click to edit..."}</span>}
    </div>
  );
}
