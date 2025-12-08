import React, { useState } from 'react';
import { XIcon, PlusIcon, CheckIcon, TrashIcon } from './Icons';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface ToDoListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ToDoListModal: React.FC<ToDoListModalProps> = ({ isOpen, onClose }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Review quarterly report', completed: false },
    { id: 2, text: 'Update user permissions', completed: true },
    { id: 3, text: 'Schedule team meeting', completed: false },
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  if (!isOpen) return null;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTaskText, completed: false },
      ]);
      setNewTaskText('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-[#18181B] border border-white/10 rounded-3xl w-full max-w-md p-6 relative shadow-2xl z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Tasks</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
          >
            <XIcon />
          </button>
        </div>

        <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-neon-lime/50"
          />
          <button 
            type="submit"
            className="bg-neon-lime text-black p-2.5 rounded-xl hover:bg-neon-lime/90 transition-colors"
          >
            <PlusIcon />
          </button>
        </form>

        <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-hide">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No tasks yet.</p>
          ) : (
            tasks.map(task => (
              <div 
                key={task.id}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  task.completed 
                    ? 'bg-white/5 border-transparent opacity-60' 
                    : 'bg-[#27272A] border-white/5'
                }`}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                    task.completed
                      ? 'bg-neon-lime border-neon-lime text-black'
                      : 'border-gray-500 hover:border-neon-lime'
                  }`}
                >
                  {task.completed && <CheckIcon className="w-3 h-3" />}
                </button>
                <span className={`flex-1 text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDoListModal;