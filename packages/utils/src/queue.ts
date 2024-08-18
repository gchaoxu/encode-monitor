import { voidFun } from 'encode-monitor-shared';
import { _global } from './global';

/**
 * 创建好埋点发送方式，确定上报时机，主要的目的是不阻塞页面的执行
 * 时机：微任务执行的时机， Promise.then
 * */
export class Queue {
  private micro: Promise<void>;
  private stack: any[] = [];
  private isFlushing = false;
  constructor() {
    if (!('Promise' in _global)) return;
    this.micro = Promise.resolve();
  }
  addFn(fn: voidFun): void {
    if (typeof fn !== 'function') return;
    if (!('Promise' in _global)) {
      fn();
      return;
    }
    this.stack.push(fn);
    if (!this.isFlushing) {
      this.isFlushing = true;
      this.micro.then(() => this.flushStack());
    }
  }
  clear() {
    this.stack = [];
  }
  getStack() {
    return this.stack;
  }
  flushStack(): void {
    const temp = this.stack.slice(0);
    this.stack.length = 0;
    this.isFlushing = false;
    for (let i = 0; i < temp.length; i++) {
      temp[i]();
    }
  }
}
