"use client"

import clsx, { ClassValue } from 'clsx';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import { cn } from '@/lib/utils'
import { Plus, Check, X,} from 'lucide-react';

export default function HomePage() {
  const [direction, setDirection] = useState("col");
  return (
    <main className={cn('bg-background w-full min-h-screen overflow-y-auto px-12 py-8 pt-20 flex', direction == "col" ? "flex-col" : "flex-row" )}>
      <Header />
      <TaskBlock />
    </main>
  );
}

export function Header() {
  return (
    <header className={cn('bg-background shadow-sm fixed inset-x-0 top-0 h-14 py-2 px-4 flex flex-row gap-2 items-center justify-between')}>

    </header>
  );
}

export function TaskBlock() {return (
    <div className={cn('grid grid-cols-[1.75rem_1fr] gap-2 w-full border-t-3 border-border py-2')}>
      <div className={cn('grid grid-cols-subgrid col-span-2 gap-2 -mx-2 px-2 py-1.5 rounded-lg hover:bg-secondary duration-200 transition-colors cursor-pointer items-center')}>
        <Plus />
        <h2 className={cn('text-lg font-semibold text-text')}>Task Block</h2>
      </div>
      <ul className={cn('grid grid-cols-subgrid col-span-2 px-2')}>
        <Task title="Task name" dueDate='tomorrow' completed={false} />
      </ul>
    </div>
  );
}

type TaskProps = {
  title: string,
  description?: string,
  dueDate?: string,
  tags?: TagProps[];
  completed?: boolean | undefined;
}

export function Task(props: TaskProps) {
  const [isCompleted, setIsCompleted] = useState(props.completed ?? false);
  return (
    <li className={cn('grid col-span-2 grid-cols-subgrid gap-2 items-center')}>
      <label className={cn('peer/check-container w-full aspect-square cursor-pointer border-3 border-border rounded-full overflow-hidden')}>
        <input type="checkbox" className={cn('peer/check-html sr-only')} />
        <span className={cn('flex group/check-span items-center justify-center w-full h-full peer-checked/check-html:bg-blue-400 duration-175 transition-colors')}>
          <Check size={12} className={cn('text-text-soft opacity-0 group-hover/check-span:opacity-100 transition-opacity duration-175')}/>
        </span>
      </label>
      <div className={cn('shadow-sm group transition-colors ease-in-out overflow-hidden duration-300 w-full cursor-pointer flex flex-col px-3 py-2 gap-2 rounded-xl border-3 border-border hover:bg-foreground hover:shadow-md peer-hover/check-container:bg-foreground decoration-text-soft')}>
        <div className={cn('w-full flex flex-row justify-between items-center h-6')}>
          <h3 className={cn('font-bold text-text')}>{props.title}</h3>
          <span className={cn('text-xs text-text-soft')}>{props.dueDate}</span>
        </div>
        <div className={cn('relative w-full after:w-8 after:absolute after:right-0 after:duration-300 after:transition-colors after:ease-in-out after:inset-y-0 after:bg-linear-to-r after:pointer-events-none after:from-transparent after:to-background group-hover:after:to-foreground')}>
          {props.tags && props.tags.length > 0 && (
            <span className={cn('w-full overflow-x-auto no-scrollbar flex flex-row gap-2 pr-6')}>
              {props.tags.map((tag, i) => (
                <Tag key={i} {...tag} />
              ))}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}

export type TagColors = {
  border: string;
  background: string;
  text: string;
}

type TagProps = {
  theme: "success" | "warning" | "destructive" | "info" | "custom";
  colors?: TagColors;
  label: string;
  showX: boolean;
}
export function Tag (props: TagProps) {
  let tagColors : TagColors;
  if (props.theme === 'custom') {
    tagColors = props.colors ?? {
      background: "bg-blue-100",
      border: "border-blue-400",
      text: "text-blue-800"
    };
  } else {
    switch (props.theme) {
      case "success": 
        tagColors = {
          background: "bg-green-100",
          border: "border-green-400",
          text: "text-green-600"
        };
      break;
      case "warning":
        tagColors = {
          background: "bg-yellow-100",
          border: "border-yellow-400",
          text: "text-yellow-700"
        };
      break;
      case "destructive":
        tagColors = {
          background: "bg-red-100",
          border: "border-red-400",
          text: "text-red-600"
        };
        break;
        default:
        tagColors = {
          background: "bg-blue-100",
          border: "border-blue-400",
          text: "text-blue-800"
        };
        break;
    }
  }
  return (
    <span className={cn('rounded relative leading-none duration-200 group/tag border-2 px-1.5 py-1 text-xs flex flex-row gap-1 items-center justify-center', props.showX && "hover:pr-5.5", tagColors && Object.values(tagColors).join(' ') )}>
      <p className={cn('-mt-0.5')}>{props.label}</p>
      { props.showX && (
        <button className={cn('rounded-full absolute right-1 size-4 opacity-0 group-hover/tag:opacity-100 transition-opacity duration-200 hover:bg-black/10 flex items-center justify-center')}>
          <X className={cn('')} size={12} />
        </button>
      )}
    </span>
  );
}


