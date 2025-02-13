import { decrement, increment } from "@/store/home";
import useStore from '@/hooks/useStore';

function Home() {
  const [{ counter }, dispatch] = useStore();
  return (
    <div>
      <button aria-label="Increment value" onClick={() => dispatch(increment())}>
        Increment
      </button>
      <span>{counter.value}</span>
      <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
        Decrement
      </button>
    </div>
  );
}

export default Home;
