"use client"

import { useRouter } from "next/navigation"

export function BackButton() {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
      aria-label="Volver"
    >
      <svg width="45" height="29" viewBox="0 0 45 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="6.12428" y1="14.0193" x2="41.6506" y2="14.0193" stroke="#00C49A" strokeWidth="4.73684" strokeLinecap="round"/>
        <line x1="14.019" y1="2.3685" x2="2.3685" y2="14.019" stroke="#00C49A" strokeWidth="4.73684" strokeLinecap="round"/>
        <line x1="2.3685" y1="14.019" x2="14.019" y2="25.6696" stroke="#00C49A" strokeWidth="4.73684" strokeLinecap="round"/>
      </svg>
    </button>
  )
}


