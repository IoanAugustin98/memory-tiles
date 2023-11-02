import { GameProvider } from '@/context'
import './../styles/index.css'

export default function App({ Component, pageProps }) {
  return (
    <GameProvider>
      <Component {...pageProps} />
    </GameProvider>
  );
}
