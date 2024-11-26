import { cn } from '@/lib/utils';

export function SectionContent({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mx-auto px-6 max-w-7xl', props.className)}>
      {props.children}
    </div>
  );
}
