import { Phone, MessageSquare, ArrowUpRight } from "lucide-react";
import { formatSmsUri } from "@/data/calculator";

interface StickyMobileCallProps {
  onOpenCalculator?: () => void;
}

export default function StickyMobileCall({ onOpenCalculator }: StickyMobileCallProps) {
  return (
    <aside
      aria-label="Mobile quick contact action bar"
      className="fixed inset-x-0 bottom-0 z-30 block md:hidden border-t border-ink/10 bg-paper/95 px-3 py-2.5 shadow-[0_-10px_25px_-5px_rgba(34,29,23,0.12)] backdrop-blur-lg pb-[max(0.625rem,env(safe-area-inset-bottom))]"
    >
      <div className="mx-auto flex max-w-lg items-center gap-2">
        {/* Primary Call Button with real phone number */}
        <a
          href="tel:5595753014"
          className="flex flex-1 min-w-0 items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-center font-serif text-[0.85rem] font-semibold text-linen shadow-md transition-all active:scale-[0.98] hover:bg-clay"
          aria-label="Call Adam Youssef at (559) 575-3014"
        >
          <Phone className="h-4 w-4 text-clay shrink-0" />
          <span className="truncate">Call (559) 575-3014</span>
        </a>

        {/* SMS Text Direct Dispatch */}
        <a
          href={formatSmsUri()}
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-ink/20 bg-linen px-3.5 py-3 text-center font-sans text-xs font-semibold text-ink shadow-xs transition-all active:scale-[0.98] hover:bg-paper-deep"
          aria-label="Text Adam Youssef at (559) 575-3014"
        >
          <MessageSquare className="h-3.5 w-3.5 text-stone shrink-0" />
          <span>Text</span>
        </a>

        {/* Quick Scope Estimate Trigger */}
        {onOpenCalculator && (
          <button
            type="button"
            onClick={onOpenCalculator}
            className="inline-flex shrink-0 items-center justify-center gap-1 rounded-full border border-ink/20 bg-linen px-3 py-3 text-center font-sans text-xs font-semibold text-ink shadow-xs transition-all active:scale-[0.98] hover:bg-paper-deep"
            aria-label="Jump to Estimate Calculator"
          >
            <span>Quote</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-clay shrink-0" />
          </button>
        )}
      </div>
    </aside>
  );
}
