import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useNumberAnimation = (value: number) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const prevValue = useRef(value);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (ref.current && value !== prevValue.current) {
      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.fromTo(ref.current, 
        { innerText: prevValue.current },
        {
          innerText: value,
          duration: 1,
          snap: { innerText: 1 },
          ease: "power2.out",
          onComplete: () => {
            prevValue.current = value;
          }
        }
      );
    }
  }, [value]);

  return { ref, currentValue: prevValue.current };
};