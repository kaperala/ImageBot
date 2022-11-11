export default abstract class BaseEvent {
  protected once: boolean;
  protected eventName: any;

  constructor(once: boolean) {
    this.once = once;
  }

  public getEventName() {
    return this.eventName;
  }
}
