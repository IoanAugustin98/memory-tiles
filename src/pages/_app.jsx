import { generateTilesArray } from '@/components/game'
import './../styles/index.css'

generateTilesArray();

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
