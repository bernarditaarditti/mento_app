import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/back-button"
import Link from "next/link"

export default function OnboardingIntroPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background relative">
      <div className="absolute top-10 left-10">
        <BackButton />
      </div>
      <div className="w-full max-w-md flex flex-col items-center gap-12">
        {/* Title */}
        <div className="w-full flex flex-col items-center gap-2 min-h-[100px] justify-center">
          <h1 className="text-2xl font-bold text-center leading-relaxed" style={{ color: "#0096C7" }}>
            Antes de empezar,
            <br />
            me gustaría conocerte
            <br />
            un poco.
          </h1>
        </div>

        {/* Mento character with 3D floating animation */}
        <div className="flex items-center justify-center animate-float" style={{ perspective: "1000px" }}>
          <svg width="183" height="154" viewBox="0 0 183 154" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M120.473 117.402C120.473 123.733 120.473 138.504 120.473 146.945C122.557 147.226 127.726 148.464 131.727 151.165" stroke="#F36E86" strokeWidth="5.62717" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M75.4556 117.402C75.4556 121.201 75.4556 125.912 75.4556 132.174C75.4556 136.346 75.4556 141.207 75.4556 146.945C73.3714 147.226 68.2028 148.464 64.2012 151.165" stroke="#F36E86" strokeWidth="5.62717" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22.2533 132.993C25.7215 136 33.9064 140.726 38.9006 135.571C43.8949 130.415 46.2532 125.403 46.8082 123.541" stroke="#F36E86" strokeWidth="5.62717" strokeLinecap="round"/>
            <path d="M149.12 117.626C153.456 121.278 163.687 127.016 169.93 120.756C176.172 114.496 179.12 108.409 179.814 106.148" stroke="#F36E86" strokeWidth="5.62717" strokeLinecap="round"/>
            <path d="M147.296 115.397C138.588 122.092 122.734 121.534 115.896 120.418C99.5132 125.67 85.912 121.585 79.9624 118.292C79.92 118.271 79.8775 118.247 79.8349 118.221C79.389 117.971 78.988 117.725 78.6339 117.489C56.1931 129.875 42.2094 120.418 38.0227 114.142C10.8927 111.464 6.9014 91.547 8.29697 81.9233C-5.43548 59.161 9.83211 44.544 19.1825 40.0808C22.5318 16.6491 42.9072 12.4648 52.6762 13.3016C64.3991 -3.77011 85.7111 3.96958 96.5965 8.99067C126.741 -3.72943 144.086 11.2092 147.296 21.2514C172.416 24.9336 174.51 43.7071 172.416 52.6335C185.814 65.6883 177.999 85.9679 172.416 94.4759C170.407 111.548 154.832 115.537 147.296 115.397Z" fill="#FF8FA3"/>
            <path d="M172.416 94.4759C170.407 111.548 154.832 115.537 147.296 115.397C138.588 122.092 122.734 121.534 115.896 120.418C99.5132 125.67 85.912 121.585 79.9624 118.292M172.416 94.4759C177.999 85.9679 185.814 65.6883 172.416 52.6335M172.416 94.4759C172.403 92.3416 171.874 87.1523 169.864 83.4702M172.416 52.6335C174.51 43.7071 172.416 24.9336 147.296 21.2514C144.086 11.2092 126.741 -3.72943 96.5965 8.99067M172.416 52.6335C171.147 51.1965 168.022 48.2389 165.677 47.9041M96.5965 8.99067C85.7111 3.96958 64.3991 -3.77011 52.6762 13.3016C42.9072 12.4648 22.5318 16.6491 19.1825 40.0808M96.5965 8.99067C98.1182 10.9856 102.625 15.9972 101.621 21.2517M19.1825 40.0808C9.83211 44.544 -5.43547 59.161 8.29697 81.9233C6.9014 91.547 10.8927 111.464 38.0227 114.142C42.2094 120.418 56.1931 129.875 78.6339 117.489C79.0214 117.747 79.4652 118.017 79.9624 118.292M19.1825 40.0808C20.8571 39.2017 25.7975 37.4435 32.1613 37.4435M68.1671 19.578C72.0747 16.928 81.5646 13.5526 88.2634 21.2517M19.1825 80.2496C15.6935 72.7179 13.4048 57.3199 32.1613 55.9809M32.1613 90.7102C31.8822 94.476 33.0824 102.677 40.1161 105.355M76.0816 111.086C76.715 113.159 78.378 117.502 79.9624 118.292M123.392 16.9407C126.601 17.2747 133.272 19.8926 134.277 27.693M161.072 88.4913C161.77 91.5175 161.156 98.3484 153.117 101.462" stroke="#F36E86" strokeWidth="5.62717" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M95.918 64.2002H107.172" stroke="black" strokeWidth="5.62717" strokeLinecap="round"/>
            <path d="M71.8746 40.4126C84.1112 40.4126 94.1275 50.5509 94.1275 63.1772C94.1274 75.8035 84.1111 85.9419 71.8746 85.9419C59.638 85.9419 49.6217 75.8035 49.6216 63.1772C49.6216 50.551 59.638 40.4126 71.8746 40.4126Z" stroke="black" strokeWidth="5.62717"/>
            <path d="M131.131 40.4126C143.423 40.4129 153.469 50.5602 153.469 63.1772C153.469 75.7943 143.423 85.9416 131.131 85.9419C118.838 85.9419 108.792 75.7944 108.792 63.1772C108.792 50.56 118.838 40.4126 131.131 40.4126Z" stroke="black" strokeWidth="5.62717"/>
            <ellipse cx="75.2234" cy="66.7908" rx="5.06743" ry="7.16295" transform="rotate(-2.4504 75.2234 66.7908)" fill="black"/>
            <ellipse cx="128.957" cy="66.2806" rx="5.06743" ry="7.16295" transform="rotate(-2.4504 128.957 66.2806)" fill="black"/>
            <path d="M91.8795 88.7549C91.5297 90.8438 92.7189 95.1887 100.274 95.8572C107.828 96.5256 110.067 91.4008 110.242 88.7549" stroke="black" strokeWidth="5.11561" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Continue button */}
        <div className="w-full flex justify-center">
          <Link href="/onboarding/name" className="block w-4/5">
            <Button
              size="lg"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base h-14 rounded-xl"
            >
              CONTINUAR
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
