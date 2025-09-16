export type INode<T> = {
  item: T;
  next: INode<T> | null;
  prev: INode<T> | null;
}

class Node<T> implements INode<T> {
  constructor(
    public item: T,
    public next: INode<T> | null = null,
    public prev: INode<T> | null = null
  ) {}
}

export class LinkedList<T> {
  private head: INode<T> | null = null;
  private tail: INode<T> | null = null;
  private _current: INode<T> | null = null;
  private _length: number = 0;


  get currentIndex(): number {
    if (this.length === 0) return -1;
    
    const currentItem = this.current;
    if (currentItem === null) return -1;

    const array = this.toArray();
    return array.findIndex(item => item === currentItem);
  }
  get length(): number {
    return this._length;
  }

  get current(): T | null {
    return (this._current || { item : null }).item;
  }


  toArray(): T[] {
    const array: T[] = [];
    if (!this.head) return array;

    let current: INode<T> | null = this.head;
    let count = 0;

    while (count < this._length) {
      if (current) {
        array.push(current.item);
        current = current.next;
        count++;
      }
    }

    return array;
  }

  add(item: T): this {
    const node = new Node(item);

    if (!this.head) {
      this.head = node;
      this.tail = node;
      node.next = node;
      node.prev = node;
    } else {
      node.prev = this.tail;
      node.next = this.head;
      
      if (this.tail) {
        this.tail.next = node;
      }
      
      if (this.head) {
        this.head.prev = node;
      }
      
      this.tail = node;
    }

    if (!this._current) {
      this._current = node;
    }

    this._length++;
    return this;
  }

  setCurrent(value: T): this {
    if (!this._length) {
      throw new Error('List is empty');
    }

    const foundNode = this.findNode(value);
    if (!foundNode) {
      throw new Error(`Value ${value} not found in the list`);
    }

    this._current = foundNode;
    return this;
  }

  private findNode(value: T): INode<T> | null {
    if (!this.head) return null;

    let current: INode<T> | null = this.head;
    let count = 0;

    while (count < this._length && current) {
      if (current.item === value) {
        return current;
      }
      current = current.next;
      count++;
    }

    return null;
  }

  removeCurrent(): this {
    if (!this.current) {
      return this;
    }

    if (this._length === 1) {
      this.head = null;
      this.tail = null;
      this._current = null;
    } else {
      const prevNode = this._current!.prev;
      const nextNode = this._current!.next;

      if (prevNode && nextNode) {
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
      }

      if (this._current === this.head) {
        this.head = nextNode;
      }

      if (this._current === this.tail) {
        this.tail = prevNode;
      }

      this._current = nextNode;
    }

    this._length--;
    return this;
  }

  next(): this {
    if (this._current && this._current.next) this._current = this._current.next;
    return this;
  }

  prev(): this {
    if (this._current && this._current.prev) this._current = this._current.prev;
    return this;
  }

  find(predicate: (item: T) => boolean): T | null {
    if (!this.head) return null;

    let current: INode<T> | null = this.head;
    let count = 0;

    while (count < this._length && current) {
      if (predicate(current.item)) {
        return current.item;
      }
      current = current.next;
      count++;
    }

    return null;
  }

  *[Symbol.iterator](): Iterator<T> {
    if (!this.head) return;

    let current: INode<T> | null = this.head;
    let count = 0;

    while (count < this._length && current) {
      yield current.item;
      current = current.next;
      count++;
    }
  }
}