import { cn } from '@/lib/utils';

export default function TypographyH2({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn('md:text-4xl text-2xl font-semibold', className)}>{children}</h2>;
}
