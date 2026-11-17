export default function AuraBg({ className = "", children }) {
  return (
    <div
      className={`fixed top-0 w-screen h-screen isolate overflow-hidden ${className}`}
    >
      {/* aura layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-32 -left-24 size-[28rem] rounded-full bg-brand/40 blur-3xl animate-aura" />
        <div className="absolute top-1/3 -right-32 size-[32rem] rounded-full bg-brand-light/30 blur-[120px] animate-aura [animation-delay:-4s]" />
        <div className="absolute -bottom-40 left-1/4 size-[26rem] rounded-full bg-accent-light/40 blur-3xl animate-aura [animation-delay:-8s]" />
      </div>

      {children}
    </div>
  );
}
