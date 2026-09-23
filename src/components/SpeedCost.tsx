import { useState } from "preact/hooks";
import { ASSUMPTIONS, speedCost } from "@/lib/speedCost";
import { PRICING_CONSTANTS, smsUri } from "@/data/calculator";

const PRICE = PRICING_CONSTANTS.tiers.landing.price;
const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const pct = (n: number) => `${Math.round(n * 100)}%`;

const inputClass =
  "mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-3.5 py-2.5 text-base text-ink focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/30";

function Field(props: { label: string; hint?: string; value: number; step?: number; min?: number; max?: number; onInput: (n: number) => void }) {
  return (
    <label class="block text-sm font-medium text-ink">
      {props.label}
      <input
        type="number"
        inputMode="decimal"
        class={inputClass}
        value={props.value}
        step={props.step ?? 1}
        min={props.min ?? 0}
        max={props.max}
        onInput={(e) => {
          const n = parseFloat(e.currentTarget.value);
          if (Number.isFinite(n) && n >= 0) props.onInput(n);
        }}
      />
      {props.hint && <span class="mt-1 block text-xs font-normal text-stone">{props.hint}</span>}
    </label>
  );
}

export default function SpeedCost() {
  const [seconds, setSeconds] = useState(5);
  const [visitors, setVisitors] = useState(300);
  const [jobValue, setJobValue] = useState(500);
  const [closeRate, setCloseRate] = useState(50);

  const r = speedCost({ seconds, visitors, jobValue, closeRate: closeRate / 100 }, PRICE);
  const message = `Hi Adam, my site loads in about ${seconds}s. Your calculator says that could be costing me ~${usd(r.lostPerMonth)}/mo.`;

  return (
    <div id="cost-of-slow" class="mt-8 scroll-mt-24 rounded-3xl border border-ink/15 bg-linen p-7 shadow-sm sm:p-9">
      <span class="t-eyebrow text-stone">What a slow site costs you</span>
      <h3 class="mt-2 font-serif text-2xl font-bold text-ink sm:text-3xl">Put in your numbers.</h3>

      <div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field
          label="Load time on a phone (seconds)"
          value={seconds}
          step={0.1}
          min={0}
          max={30}
          onInput={setSeconds}
        />
        <Field label="Website visitors a month" value={visitors} step={10} onInput={setVisitors} />
        <Field label="Average job ($)" value={jobValue} step={50} onInput={setJobValue} />
        <Field label="Calls you turn into jobs (%)" value={closeRate} step={5} max={100} onInput={(n) => setCloseRate(Math.min(n, 100))} />
      </div>
      <p class="mt-3 text-xs text-stone">
        Don&rsquo;t know your load time?{" "}
        <a href="https://pagespeed.web.dev/" target="_blank" rel="noopener" class="underline underline-offset-4 hover:text-clay">
          Check it free on Google PageSpeed ↗
        </a>{" "}
        and use the mobile &ldquo;Largest Contentful Paint&rdquo; number.
      </p>

      <div class="mt-7 grid gap-4 border-t border-dashed border-ink/20 pt-6 sm:grid-cols-3" aria-live="polite">
        <div>
          <span class="block font-serif text-4xl font-bold text-ink">{usd(r.lostPerMonth)}</span>
          <span class="text-xs font-medium uppercase tracking-wider text-stone">lost a month, roughly</span>
        </div>
        <div>
          <span class="block font-serif text-4xl font-bold text-ink">{Math.round(r.lostVisitors)}</span>
          <span class="text-xs font-medium uppercase tracking-wider text-stone">visitors who give up waiting</span>
        </div>
        <div>
          <span class="block font-serif text-4xl font-bold text-ink">
            {r.paybackDays === null ? "—" : `${r.paybackDays} days`}
          </span>
          <span class="text-xs font-medium uppercase tracking-wider text-stone">for a {usd(PRICE)} page to pay for itself</span>
        </div>
      </div>

      {r.lostPerMonth > 0 && (
        <a
          href={smsUri(message)}
          class="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-linen transition-colors hover:bg-clay focus:outline-none focus:ring-2 focus:ring-clay focus:ring-offset-2"
        >
          Text me these numbers
        </a>
      )}

      <details class="mt-6 text-xs text-ink-soft">
        <summary class="flex min-h-[48px] cursor-pointer items-center font-semibold text-ink py-2 focus:outline-none">
          How this is worked out
        </summary>
        <p class="mt-2 leading-relaxed">
          Compared with a page that loads in about a second. Google&rsquo;s mobile research found that going from 1s to 3s
          raises the chance someone leaves by 32%, to 5s by 90%, and to 10s by 123%. I assume {pct(ASSUMPTIONS.baseBounce)} of
          visitors leave even from a fast page, and {pct(ASSUMPTIONS.leadRate)} of the ones who stay call or text you. It&rsquo;s
          an estimate, not a promise — but every number is here so you can check it.{" "}
          <a
            href="https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/page-load-time-statistics/"
            target="_blank"
            rel="noopener"
            class="underline underline-offset-4 hover:text-clay"
          >
            Source ↗
          </a>
        </p>
      </details>
    </div>
  );
}
