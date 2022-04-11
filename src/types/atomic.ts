export type callback<T = any, V = any> = (_: T) => V;
export type pureCallback<T = any> = () => T;

export type setter<T = callback> = (_: T) => void;
