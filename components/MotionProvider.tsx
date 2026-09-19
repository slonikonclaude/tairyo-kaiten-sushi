"use client";

import { domAnimation, LazyMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Один LazyMotion на страницу: компоненты используют `m.*`, а набор domAnimation (анимации,
 * whileInView, варианты) подгружается здесь. strict — случайный `motion.*` сразу виден ошибкой.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
