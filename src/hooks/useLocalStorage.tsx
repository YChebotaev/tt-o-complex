import { useState } from "react";

export const useLocalStorage = <T = string,>(
  itemKey: string,
  initialValue: T,
  {
    parse = (s) => s as T,
    stringify = (v) => String(v),
  }: {
    parse?(s: string): T;
    stringify?(v: T): string;
  } = {},
) => {
  const [value, rawSetValue] = useState(() => {
    if (typeof localStorage === "undefined") {
      return initialValue;
    } else {
      const raw = localStorage.getItem(itemKey);

      if (raw == null) return initialValue;

      return parse(raw);
    }
  });

  return [
    value,
    (vf: T | ((prev: T) => T)) => {
      if (typeof vf === "function") {
        rawSetValue((prev) => {
          if (typeof localStorage === "undefined") {
            return (vf as Function)(prev);
          } else {
            const next = (vf as Function)(prev);

            localStorage.setItem(itemKey, stringify(next));

            return next;
          }
        });
      } else {
        if (typeof localStorage === "undefined") {
          return rawSetValue(vf);
        } else {
          localStorage.setItem(itemKey, stringify(vf));

          return rawSetValue(vf);
        }
      }
    },
  ] as [T, (vf: T | ((prev: T) => T)) => void];
};
