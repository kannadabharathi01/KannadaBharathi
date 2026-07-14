"use client";

import React, { useEffect, useRef, useState } from "react";

interface CounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  hasComma?: boolean;
}

const kannadaDigits = ["೦", "೧", "೨", "೩", "೪", "೫", "೬", "೭", "೮", "೯"];

function toKannadaDigits(num: number, hasComma: boolean): string {
  const formattedString = hasComma
    ? num.toLocaleString("en-IN")
    : num.toString();
  return formattedString
    .split("")
    .map((char) => {
      const digit = parseInt(char, 10);
      return isNaN(digit) ? char : kannadaDigits[digit];
    })
    .join("");
}

export default function Counter({ target, duration = 2000, suffix = "", hasComma = false }: CounterProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = elementRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          if (currentRef) {
            observer.unobserve(currentRef);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = target;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Quadratic ease-out easing formula
      const easedProgress = progress * (2 - progress);
      const currentCount = Math.floor(easedProgress * (end - start) + start);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, target, duration]);

  return (
    <span ref={elementRef}>
      {toKannadaDigits(count, hasComma)}
      {suffix}
    </span>
  );
}
