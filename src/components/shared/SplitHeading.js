/** Two-tone heading: the accent line is set in gold. */
export function SplitHeading({ id, top, accent, as: Tag = "h2", onDark = false, className = "text-[2.25rem] leading-[1.05] md:text-5xl" }) {
  return (
    <Tag id={id} className={className}>
      <span className={onDark ? "block text-ivory" : "block text-charcoal"}>{top}</span>
      <span className="block text-gold">{accent}</span>
    </Tag>
  );
}
