import { useCounterStore } from '@/stores/useCounterStore';

export default function Home() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
