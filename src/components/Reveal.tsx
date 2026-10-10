import { useEffect, useRef, useState, type ReactNode } from 'react';

export default function Reveal({
  children, delay = 0, className = '', as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li';
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOn(true);
      return;
    }
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          ob.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`rv ${on ? 'rv-on' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
