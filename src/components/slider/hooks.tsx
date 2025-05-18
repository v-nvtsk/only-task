import { useState, useEffect, useRef, useCallback } from "react";

export function useFadeIn(watch: unknown) {
  const [isChanging, setIsChanging] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setIsChanging(true);
    
    timerRef.current = window.setTimeout(() => {
      setIsChanging(false);
    }, 1000);

    return () => {
      clearTimeout(timerRef.current!);
    };
  }, [watch]);

  return { isChanging };
}


export function useProgress(){
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const progressHandler = useCallback((_: unknown, progress: number) => {
    setIsBeginning(progress <= 0);
    setIsEnd(progress >= 1);
  }, []);

  return { isBeginning, setIsBeginning, isEnd, setIsEnd, progressHandler };
}