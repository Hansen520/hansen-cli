/*
 * @Date: 2024-01-18 10:01:33
 * @Description: 滚动加载组件
 */
import { useEffect, useState } from 'react';

interface Props {
  data: any[],
  children: any
}

const ScrollLoading = ({ data = [], children }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // setPage(prevPage => prevPage + 1);
    }
  };
  return (
    <div>
      {
      children
      }
      {isLoading && <div>Loading...</div>}
    </div>
  );
}

export default ScrollLoading;
