import { IconStar, IconStarHalf } from "@/components/icons";

/**
 * Звёзды рейтинга. Сами звёзды декоративные (aria-hidden внутри иконок):
 * смысл несёт текст рядом — «4,6 de 5», поэтому информация не передаётся
 * одной картинкой и одним цветом (DESIGN.md §10).
 *
 * Дробная часть заливается точно: 4,6 — это шестьдесят процентов пятой
 * звезды, а не половина. `idPrefix` нужен частичной звезде: её градиент
 * ссылается на id, и два ряда звёзд на странице не должны делить один.
 */
export function Stars({
  value,
  idPrefix,
  size = 16,
  className,
}: {
  value: number;
  idPrefix: string;
  size?: number;
  className?: string;
}) {
  const whole = Math.floor(value);
  const frac = Math.round((value - whole) * 100) / 100;

  return (
    <span className={`inline-flex items-center gap-0.5 ${className ?? ""}`}>
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < whole) return <IconStar key={i} width={size} height={size} />;
        if (i === whole && frac > 0)
          return <IconStarHalf key={i} width={size} height={size} gradientId={`${idPrefix}-part`} ratio={frac} />;
        return <IconStar key={i} width={size} height={size} className="opacity-25" />;
      })}
    </span>
  );
}
