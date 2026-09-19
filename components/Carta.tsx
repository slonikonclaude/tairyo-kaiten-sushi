import { MenuTabs } from "@/components/MenuTabs";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { IconExternal } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { cartaPdf } from "@/lib/menu";

/**
 * «La carta» (DESIGN.md §7.5): их PDF из девяти картинок — здесь текстом, вкладками.
 * `overflow-x-clip`, а не hidden: липкая лента вкладок внутри секции иначе не липнет.
 */
export function Carta({ locale }: { locale: Locale }) {
  const c = getDictionary(locale).carta;
  return (
    <Section
      id="carta"
      eyebrow={c.eyebrow}
      title={c.title}
      note={c.note}
      tone="deep"
      kanji="お品書き"
      className="overflow-x-clip"
      headerRight={
        <a
          href={cartaPdf}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/25 px-5 text-[0.95rem] font-bold text-ink transition-colors duration-200 hover:border-ink"
        >
          {c.pdf}
          <IconExternal width={16} height={16} />
          <span className="sr-only"> {getDictionary(locale).cta.newTab}</span>
        </a>
      }
    >
      <MenuTabs locale={locale} />
      <Reveal className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-3 border-t border-ink/10 pt-8 text-[0.9rem] text-muted md:grid-cols-2 md:gap-x-12">
        {c.notes.map((n) => (
          <p key={n}>{n}</p>
        ))}
        <p className="md:col-span-2">{c.source}</p>
      </Reveal>
    </Section>
  );
}
