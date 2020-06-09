interface IListable<T> {
  add(item: T): void;
  get(index: number): T | null;
  getById(id: number): T | null;
  toArray(): T[];
  clear(): void;
  size(): number;
  removeById(index: number): void;
  remove(index: number): void;
}

