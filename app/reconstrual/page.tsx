"use client"

import { BackButton } from "@/components/back-button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ReconstrualPage() {
  const router = useRouter()
  const [gamePlayPath, setGamePlayPath] = useState<string | null>(null)

  useEffect(() => {
    // Intentar obtener la ruta de la página de juego desde sessionStorage
    const savedPath = sessionStorage.getItem("reconstrual_return_path")
    if (savedPath) {
      setGamePlayPath(savedPath)
      return
    }

    // Si no hay ruta guardada, intentar obtenerla del referrer
    if (typeof window !== "undefined" && document.referrer) {
      try {
        const referrerUrl = new URL(document.referrer)
        const referrerPath = referrerUrl.pathname
        
        // Si el referrer es una página de juego, usarla
        if (referrerPath.includes("/game/play/")) {
          setGamePlayPath(referrerPath)
          sessionStorage.setItem("reconstrual_return_path", referrerPath)
        }
      } catch (e) {
        // Si hay error al parsear el referrer, ignorar
      }
    }
  }, [])

  const handleBack = () => {
    if (gamePlayPath) {
      // Navegar directamente a la página de juego
      router.push(gamePlayPath)
    } else {
      // Fallback: intentar volver atrás
      router.back()
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-white relative">
      <div className="relative w-full max-w-md flex flex-col items-center pt-8 px-4">
        {/* Back Button */}
        <div className="absolute top-10 left-10">
          <BackButton onClick={handleBack} />
        </div>

        {/* Brain Character with Question Mark */}
        <div className="relative mt-8 mb-4">
          <svg width="78" height="74" viewBox="0 0 78 74" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24">
            <path d="M38.4664 61.3984C38.4664 63.4197 38.4664 68.1361 38.4664 70.8312C39.1319 70.921 40.7822 71.3163 42.0599 72.1787" stroke="#F36E86" strokeWidth="1.79672" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M24.0924 61.3984C24.0924 62.6114 24.0924 64.1156 24.0924 66.1148C24.0924 67.447 24.0924 68.999 24.0924 70.8312C23.427 70.921 21.7766 71.3163 20.499 72.1787" stroke="#F36E86" strokeWidth="1.79672" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M46.3738 63.5214C47.8584 61.1277 54.167 64.5208 55.503 62.3771C56.839 60.2333 55.4777 56.4755 55.503 55.8446" stroke="#F36E86" strokeWidth="1.79672" strokeLinecap="round"/>
            <path d="M14.6044 64.8286C13.1197 62.4349 6.81112 65.828 5.47513 63.6842C4.13915 61.5404 5.5005 57.7826 5.47512 57.1517" stroke="#F36E86" strokeWidth="1.79672" strokeLinecap="round"/>
            <path d="M47.0306 60.7579C44.2501 62.8955 39.1881 62.7174 37.0047 62.3611C31.7739 64.0379 27.4311 62.7336 25.5314 61.6823C25.5179 61.6755 25.5043 61.6679 25.4907 61.6596C25.3483 61.5796 25.2203 61.5012 25.1072 61.4259C17.942 65.3805 13.4771 62.3611 12.1404 60.3571C3.47794 59.5021 2.20353 53.1427 2.64913 50.0699C-1.73555 42.8021 3.13929 38.135 6.12479 36.7099C7.19423 29.2283 13.6999 27.8923 16.8191 28.1595C20.5622 22.7086 27.3669 25.1798 30.8426 26.783C40.4675 22.7216 46.0058 27.4914 47.0306 30.6978C55.0514 31.8735 55.7198 37.8678 55.0514 40.7179C59.3291 44.8862 56.8338 51.3614 55.0514 54.0779C54.4097 59.5288 49.4369 60.8024 47.0306 60.7579Z" fill="#FF8FA3"/>
            <path d="M55.0514 54.0779C54.4097 59.5288 49.4369 60.8024 47.0306 60.7579C44.2501 62.8955 39.1881 62.7174 37.0047 62.3611C31.7739 64.0379 27.4311 62.7336 25.5314 61.6823M55.0514 54.0779C56.8338 51.3614 59.3291 44.8862 55.0514 40.7179M55.0514 54.0779C55.0471 53.3964 54.8781 51.7395 54.2365 50.5639M55.0514 40.7179C55.7198 37.8678 55.0514 31.8735 47.0306 30.6978C46.0058 27.4914 40.4675 22.7216 30.8426 26.783M55.0514 40.7179C54.6461 40.2591 53.6483 39.3147 52.8997 39.2078M30.8426 26.783C27.3669 25.1798 20.5622 22.7086 16.8191 28.1595C13.6999 27.8923 7.19423 29.2283 6.12479 36.7099M30.8426 26.783C31.3285 27.42 32.7676 29.0202 32.4467 30.6979M6.12479 36.7099C3.13929 38.135 -1.73555 42.8021 2.64913 50.0699C2.20353 53.1427 3.47794 59.5021 12.1404 60.3571C13.4771 62.3611 17.942 65.3805 25.1072 61.4259C25.231 61.5084 25.3727 61.5944 25.5314 61.6823M6.12479 36.7099C6.65951 36.4292 8.23692 35.8678 10.2688 35.8678M21.7653 30.1635C23.0129 29.3174 26.043 28.2396 28.1819 30.6979M6.12479 49.5355C5.0108 47.1307 4.28001 42.2142 10.2688 41.7867M10.2688 52.8755C10.1797 54.0779 10.5629 56.6965 12.8088 57.5515M24.2923 59.3815C24.4946 60.0432 25.0255 61.4299 25.5314 61.6823M39.3981 29.3214C40.4229 29.4281 42.5529 30.264 42.8737 32.7546M51.4292 52.1671C51.652 53.1333 51.4559 55.3144 48.8893 56.3087" stroke="#F36E86" strokeWidth="1.79672" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M30.6259 44.4111H34.2193" stroke="black" strokeWidth="1.79672" strokeLinecap="round"/>
            <path d="M22.9495 36.8159C26.8564 36.8161 30.054 40.0531 30.054 44.0845C30.0539 48.1158 26.8563 51.3528 22.9495 51.353C19.0424 51.353 15.844 48.1159 15.844 44.0845C15.844 40.053 19.0424 36.8159 22.9495 36.8159Z" stroke="black" strokeWidth="1.79672"/>
            <path d="M41.869 36.8159C45.7939 36.816 49.0018 40.0559 49.0018 44.0845C49.0018 48.113 45.7939 51.353 41.869 51.353C37.9441 51.353 34.7363 48.113 34.7362 44.0845C34.7362 40.0559 37.9441 36.8159 41.869 36.8159Z" stroke="black" strokeWidth="1.79672"/>
            <ellipse cx="24.0183" cy="45.2388" rx="1.618" ry="2.28708" transform="rotate(-2.4504 24.0183 45.2388)" fill="black"/>
            <ellipse cx="41.1754" cy="45.0757" rx="1.618" ry="2.28708" transform="rotate(-2.4504 41.1754 45.0757)" fill="black"/>
            <path d="M29.3368 52.2515C29.2251 52.9184 29.6048 54.3058 32.017 54.5192C34.4292 54.7326 35.1439 53.0963 35.1997 52.2515" stroke="black" strokeWidth="1.63338" strokeLinecap="round"/>
            <path d="M67.9301 11.4678C70.1955 11.4678 72.0057 12.0606 73.3607 13.2462C74.7368 14.4318 75.4249 16.1044 75.4249 18.2639C75.4249 20.254 74.7686 21.8101 73.4559 22.9322C72.1645 24.0331 70.4496 24.5942 68.3112 24.6153L68.1524 26.9971H63.3888L63.2301 21.0903H65.1355C66.7657 21.0903 68.0042 20.8891 68.8511 20.4869C69.7191 20.0846 70.1532 19.3542 70.1532 18.2956C70.1532 17.5546 69.952 16.9724 69.5498 16.549C69.1475 16.1255 68.5865 15.9138 67.8666 15.9138C67.1045 15.9138 66.5117 16.1361 66.0882 16.5807C65.6648 17.0042 65.4531 17.5864 65.4531 18.3274H60.3401C60.2978 17.0359 60.5624 15.8715 61.1341 14.8341C61.7269 13.7967 62.5949 12.9816 63.7382 12.3887C64.9026 11.7748 66.2999 11.4678 67.9301 11.4678ZM65.8342 35.2541C64.8814 35.2541 64.0981 34.9788 63.4841 34.4284C62.8913 33.8567 62.5949 33.1581 62.5949 32.3324C62.5949 31.4855 62.8913 30.7763 63.4841 30.2046C64.0981 29.633 64.8814 29.3472 65.8342 29.3472C66.7657 29.3472 67.5279 29.633 68.1207 30.2046C68.7347 30.7763 69.0417 31.4855 69.0417 32.3324C69.0417 33.1581 68.7347 33.8567 68.1207 34.4284C67.5279 34.9788 66.7657 35.2541 65.8342 35.2541Z" fill="#FF8FA3"/>
          </svg>
        </div>

        {/* Pink Info Box */}
        <div className="relative w-full max-w-[290px] flex flex-col items-center rounded-2xl p-6" style={{ backgroundColor: "#FFC7D1", opacity: 0.82 }}>
          <div className="flex flex-col items-center justify-start" style={{ fontFamily: "var(--font-poppins)" }}>
            <h2 className="text-2xl font-bold text-center mb-4" style={{ color: "#F36E86" }}>
              ¿Sabías que...?
            </h2>
            <p className="text-center leading-relaxed px-4" style={{ color: "#F36E86", fontSize: "17px" }}>
              Este nivel usa <strong style={{ color: "#F36E86" }}>"Reconstrual"</strong>
              <br />
              <br />
              una estrategia para regular tus emociones <strong style={{ color: "#F36E86" }}>cambiando el enfoque</strong> de una situación: en vez de quedarte atrapado en un detalle que te estresa, <strong style={{ color: "#F36E86" }}>ampliás la mirada</strong> y la reinterpretás desde un contexto más general o más neutral.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
