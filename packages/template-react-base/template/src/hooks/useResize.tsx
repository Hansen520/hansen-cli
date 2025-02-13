import { useEffect, useState } from 'react';
import { onResize, screenWidth, screenHeight } from '@/lib/utils';
const useResize = () => {
  const [win, setWin] = useState(onResize())
  useEffect(() => {
    const fn = () => {
      setWin(onResize)
    }
    window.addEventListener('resize', fn, false)
    return () => {
      window.removeEventListener('resize', fn, false)
    }
  }, [])
  return {
    win,
    screenWidth,
    screenHeight,
  }
}
export default useResize