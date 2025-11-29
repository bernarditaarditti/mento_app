import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-4 bg-white py-12">
      <div className="w-full max-w-md flex flex-col items-center gap-8 flex-1 justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-64 h-24">
            <Image src="/images/mento-logo.png" alt="Mento" fill className="object-contain" priority />
          </div>
          <p className="text-xl text-center" style={{ color: "#EF6B7B" }}>
            Resignifica tus emociones.
          </p>
        </div>
      </div>

      <div className="w-full max-w-md flex flex-col gap-4 pb-8">
        <Link href="/login" className="block">
          <Button
            size="lg"
            className="w-full text-white font-poppins font-semibold text-base h-14 rounded-2xl"
            style={{ backgroundColor: "#00C49A" }}
          >
            INICIAR SESIÓN
          </Button>
        </Link>
        <Link href="/register" className="block">
          <Button
            size="lg"
            className="w-full text-white font-poppins font-semibold text-base h-14 rounded-2xl"
            style={{ backgroundColor: "#00C49A" }}
          >
            CREAR CUENTA
          </Button>
        </Link>
      </div>
    </div>
  )
}
