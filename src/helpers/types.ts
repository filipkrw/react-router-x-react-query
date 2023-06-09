export type LoaderData<T extends (...args: any) => any> = Awaited<
  ReturnType<ReturnType<T>>
>;
