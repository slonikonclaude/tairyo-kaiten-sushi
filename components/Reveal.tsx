"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";

/**
 * Единственная скролловая анимация сайта (DESIGN.md §9): 24 px вверх, 0,5 с,
 * ease-out, once, только opacity и transform.
 *
 * Три правила, каждое выстрадано в прошлых домах папки:
 *
 * 1. Пропсы motion не снимаются при prefers-reduced-motion. motion при SSR
 *    вписывает `initial` в серверный HTML (`opacity:0`); если на клиенте отдать
 *    «статику» без пропсов, инлайновый opacity:0 никто не уберёт.
 * 2. Ветвится только `transition` (нулевая длительность), но не `initial`:
 *    useReducedMotion() на сервере — false, ветка в `initial` дала бы рассинхрон
 *    гидратации.
 * 3. Порог — `amount: "some"` с отступом снизу, а не доля площади: высокий
 *    список (вкладка карты на 14 блюд) на низком экране доли 0,2 не достигает
 *    и навсегда остаётся прозрачным.
 *
 * data-reveal нужен <noscript>-правилу в RootShell: без JS блок виден.
 *
 * `m.*` вместо `motion.*`: функции подгружает LazyMotion (components/MotionProvider.tsx, domAnimation),
 * drag/layout в первый бандл не попадают.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: "some", margin: "0px 0px -10% 0px" } as const;

const HIDDEN = { opacity: 0, y: 24 };
const SHOWN = { opacity: 1, y: 0 };

export function Reveal({
  as = "div",
  children,
  className,
  id,
  delay = 0,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const MotionTag = m[as as keyof typeof m] as typeof m.div;

  return (
    <MotionTag
      id={id}
      className={className}
      data-reveal=""
      initial={HIDDEN}
      whileInView={SHOWN}
      viewport={VIEWPORT}
      transition={reduced ? { duration: 0 } : { duration: 0.5, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Контейнер списка: дети въезжают друг за другом (stagger 0,07 с), а не все разом. */
export function RevealGroup({
  as = "div",
  children,
  className,
  id,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const reduced = useReducedMotion();
  const MotionTag = m[as as keyof typeof m] as typeof m.div;

  const variants: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: reduced ? 0 : 0.07 } },
  };

  return (
    <MotionTag id={id} className={className} variants={variants} initial="hidden" whileInView="shown" viewport={VIEWPORT}>
      {children}
    </MotionTag>
  );
}

/** Ребёнок RevealGroup. Вне группы ведёт себя как обычный блок. */
export function RevealItem({
  as = "div",
  children,
  className,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const MotionTag = m[as as keyof typeof m] as typeof m.div;

  const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    shown: {
      opacity: 1,
      y: 0,
      transition: reduced ? { duration: 0 } : { duration: 0.45, ease: EASE },
    },
  };

  return (
    <MotionTag className={className} data-reveal="" variants={variants}>
      {children}
    </MotionTag>
  );
}
