import { Button } from "@/components/ui/button"
import { MentoLogo } from "@/components/mento-logo"
import Link from "next/link"

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
      <div className="w-full max-w-md flex flex-col items-center gap-12">
        {/* Logo and tagline */}
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-64 text-primary">
            <MentoLogo />
          </div>
          <p className="text-lg font-medium text-center" style={{ color: '#FF8FA3' }}>Resignifica tus emociones</p>
        </div>

        {/* Action buttons */}
        <div className="w-full flex flex-col gap-4 px-4">
          <Link href="/login" className="block">
            <Button
              size="lg"
              className="w-full font-semibold text-base h-14 rounded-xl text-white hover:opacity-90"
              style={{ backgroundColor: '#00C49A' }}
            >
              INICIAR SESIÓN
            </Button>
          </Link>
          <Link href="/register" className="block">
            <Button
              size="lg"
              className="w-full font-semibold text-base h-14 rounded-xl text-white hover:opacity-90"
              style={{ backgroundColor: '#00C49A' }}
            >
              CREAR CUENTA
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
