export default function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`.trim()}>
      viva<span className="wm-tt">TT</span>erra
    </span>
  );
}
