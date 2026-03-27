import React from 'react';

interface TopBarProps {
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }) => {
  return (
    <div className="bg-slate-800 dark:bg-slate-900 border-b border-slate-700 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="w-40 px-3 py-2 bg-slate-700 dark:bg-slate-800 rounded-lg text-slate-300 text-sm focus:outline-none">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent text-white placeholder-slate-400 outline-none"
          />
        </div>
        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </div>
  );
};

export default TopBar;
