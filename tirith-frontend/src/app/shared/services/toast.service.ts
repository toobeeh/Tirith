import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface toastRequest {
  message: {
    title: string;
    content?: string;
  };
  durationMs?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private messages: toastRequest["message"][] = [];
  private state = false;
  private stateEvents: Subject<boolean> = new Subject();

  /**
   * An observable which emits changes to the visibility state
   */
  public get changes() {
    return this.stateEvents.asObservable();
  }

  /**
   * The currently active messages
   */
  public get currentMessages(): Readonly<ToastService["messages"]> {
    return this.messages;
  }

  constructor() { }

  /**
   * Set the state and emit an event if it changed
   * @param state the new opened state
   */
  private setState(state: boolean) {
    if (!this.state == state) {
      this.state = state;
      this.stateEvents.next(state);
    }
  }

  /**
   * Show a new toast message
   * @param request the message properties
   */
  public show(request: toastRequest) {
    const dur = request.durationMs ?? 2000;
    this.messages.push(request.message);

    this.setState(true);
    setTimeout(() => {
      this.messages = this.messages.filter(m => m != request.message);
      this.setState(this.messages.length > 0);
    }, dur);
  }

}
