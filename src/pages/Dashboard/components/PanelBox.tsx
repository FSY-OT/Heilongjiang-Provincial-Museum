import type { ReactNode } from 'react';

interface PanelBoxProps {
  title: string;
  icon?: string;
  children: ReactNode;
  className?: string;
}

export default function PanelBox({ title, icon, children, className = '' }: PanelBoxProps) {
  return (
    <div className={`panel-box ${className}`}>
      <div className="panel-header">
        {icon && <span className="text-xs mr-1.5">{icon}</span>}
        <span className="text-[13px] font-semibold tracking-wide">{title}</span>
        <div className="panel-header-line" />
      </div>
      <div className="panel-content">{children}</div>
    </div>
  );
}
