class List<T extends { id: number }> implements IListable<T> {
  private list: T[] = [];
  public add(item: T): void {
    this.list.push(item);
  }
  public get(index: number): T | null {
    if (this.list[index] == undefined) {
      return null;
    } else {
      return this.list[index];
    }
  }
  public getById(id: number): T | null {
    const searchItem = this.list.find((item) => {
      return item.id === id;
    });
    if (searchItem == undefined) {
      return null;
    } else {
      return searchItem;
    }
  }

  public toArray(): T[] {
    return this.list;
  }
  public clear(): void {
    this.list = [];
  }
  public size(): number {
    return this.list.length;
  }
  public removeById(index: number): void {
    const item = this.getById(index);
    if (item !== null) this.list.splice(this.list.indexOf(item), 1);
  }
  public remove(index: number): void {
    if (index > 0) this.list.splice(index, 1);
  }
}

