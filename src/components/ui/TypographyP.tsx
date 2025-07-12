import { cn } from '@/lib/utils';

export default function TypographyP({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <p className={cn('leading-7  md:text-base text-sm font-normal', className)}>{children}</p>;
}
