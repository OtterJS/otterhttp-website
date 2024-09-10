type StorageType = "local" | "session"

const dummyStorage: globalThis.Storage = {
  length: 0,
  clear: () => undefined,
  getItem: (key: string) => null,
  key: (index: number) => null,
  removeItem: (key: string) => undefined,
  setItem: (key: string, value: string) => undefined,
}

const useStorage = (type: StorageType = "session"): globalThis.Storage => {
  if (typeof window === "undefined") return dummyStorage
  return window[`${type}Storage`]
};

export default useStorage;
