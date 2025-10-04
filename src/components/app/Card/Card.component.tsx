import type { FC } from 'react';

import { Info } from 'lucide-react';

import type { CardProps } from './Card.types';

export const Card: FC<CardProps> = ({ title, info, children }) => (
  <div className="bg-card text-foreground flex flex-col gap-4 rounded-md p-4 shadow-md">
    <h3 className="text-foreground/90 text-xl font-semibold">{title}</h3>

    {/* Content */}
    <div className="text-foreground/80">{children}</div>

    <div className="text-foreground/60 flex gap-1 text-xs">
      <Info className="size-4" />
      <p>{info}</p>
    </div>
  </div>
);
