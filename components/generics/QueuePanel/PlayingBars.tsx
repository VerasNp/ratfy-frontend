// NowPlayingBars.tsx
export function NowPlayingBars() {
  return (
    <div className="flex items-end gap-0.5 h-3">
      <span className="w-0.75 bg-green-400 rounded-sm animate-[musicBar_0.8s_ease-in-out_infinite_alternate]" />
      <span className="w-0.75 bg-green-400 rounded-sm animate-[musicBar_0.8s_ease-in-out_0.2s_infinite_alternate]" />
      <span className="w-0.75 bg-green-400 rounded-sm animate-[musicBar_0.8s_ease-in-out_0.4s_infinite_alternate]" />
    </div>
  )
}
