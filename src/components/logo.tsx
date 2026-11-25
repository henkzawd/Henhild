export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="96 96 320 320" aria-hidden className={className}>
      <path
        d="M 330 150 A 130 130 0 1 0 380 230"
        fill="none"
        stroke="currentColor"
        strokeWidth="30"
        strokeLinecap="round"
      />
      <circle cx="372" cy="168" r="20" className="fill-accent" />
    </svg>
  );
}
