export function ForwardArrow({ className = "", strokeColor = "#00C49A" }: { className?: string; strokeColor?: string }) {
  return (
    <svg width="45" height="29" viewBox="0 0 45 29" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <line x1="6.12428" y1="14.0193" x2="41.6506" y2="14.0193" stroke={strokeColor} strokeWidth="4.73684" strokeLinecap="round"/>
      <line x1="30.981" y1="2.3685" x2="42.6315" y2="14.019" stroke={strokeColor} strokeWidth="4.73684" strokeLinecap="round"/>
      <line x1="42.6315" y1="14.019" x2="30.981" y2="25.6696" stroke={strokeColor} strokeWidth="4.73684" strokeLinecap="round"/>
    </svg>
  )
}

