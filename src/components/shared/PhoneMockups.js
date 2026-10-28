import { MapPin, MessageCircle, Search } from "lucide-react";
import { format } from "@/lib/format";
import { cn } from "@/lib/utils";

/** A CSS-only phone frame; content is plain markup, so it scales with the layout. */
function Phone({ className, children }) {
  return (
    <div className={cn("relative aspect-[9/19] w-36 rounded-[2rem] border-[7px] border-[#1b1f24] bg-[#1b1f24] shadow-2xl sm:w-44 lg:w-52", className)}>
      <div aria-hidden="true" className="absolute top-1.5 left-1/2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-[#1b1f24]" />
      <div className="size-full overflow-hidden rounded-[1.5rem]">{children}</div>
    </div>
  );
}

/**
 * Two tilted phones illustrating how customers reach the business: the
 * website's area search and a WhatsApp enquiry. Decorative; described once
 * for screen readers.
 */
export function PhoneMockups({ labels, areas, area }) {
  const question = format(labels.question, { area });
  return (
    <div role="img" aria-label={labels.aria} className="relative mx-auto flex h-[22rem] w-full max-w-md items-center justify-center sm:h-[27rem] lg:h-[31rem]">
      <Phone className="absolute start-[6%] top-4 -rotate-6">
        <div aria-hidden="true" className="flex size-full flex-col bg-charcoal px-3 pt-7 text-ivory">
          <p className="text-[0.55rem] font-extrabold tracking-[0.2em] text-gold">NADEEM MARBLES</p>
          <p className="mt-2 font-display text-base leading-tight">{labels.findArea}</p>
          <div className="mt-2 flex items-center gap-1.5 rounded-full bg-white px-2 py-1.5 text-[0.6rem] text-charcoal">
            <Search className="size-3 text-muted-foreground" />
            {area}
          </div>
          <ul className="mt-3 space-y-1.5">
            {areas.map((name) => (
              <li key={name} className="flex items-center gap-1.5 rounded-md bg-ivory/10 px-2 py-1.5 text-[0.6rem]">
                <MapPin className="size-3 shrink-0 text-gold" />
                <span className="flex-1 truncate">{name}</span>
                <MessageCircle className="size-3 shrink-0 text-[#25d366]" />
              </li>
            ))}
          </ul>
        </div>
      </Phone>

      <Phone className="absolute end-[6%] bottom-2 rotate-6">
        <div aria-hidden="true" className="flex size-full flex-col bg-[#efe7dd]">
          <div className="bg-[#075e54] px-3 pt-7 pb-2 text-white">
            <p className="text-[0.7rem] font-semibold">{labels.chatName}</p>
            <p className="text-[0.55rem] opacity-80">{labels.online}</p>
          </div>
          <div className="flex flex-1 flex-col gap-2 p-2.5 text-[0.62rem] leading-snug text-charcoal">
            <p className="max-w-[85%] self-end rounded-lg rounded-tr-none bg-[#d9fdd3] px-2 py-1.5">{question}</p>
            <p className="max-w-[85%] self-start rounded-lg rounded-tl-none bg-white px-2 py-1.5">{labels.reply}</p>
          </div>
          <div className="m-2 flex items-center gap-1.5 rounded-full bg-white px-2 py-1.5 text-[0.55rem] text-muted-foreground">
            <span className="flex-1">{labels.typing}</span>
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-[#075e54] text-white">
              <MessageCircle className="size-3" />
            </span>
          </div>
        </div>
      </Phone>
    </div>
  );
}
