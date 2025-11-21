import type { SyntheticEvent } from 'react';

export default function createSyntheticEvent<T extends Element & EventTarget>(
  type: string,
  target: T,
  params = {},
): SyntheticEvent<T> {
  const event = new Event(type, params);

  let isDefaultPrevented = false;
  let isPropagationStopped = false;
  const preventDefault = () => {
    isDefaultPrevented = true;
  };
  const stopPropagation = () => {
    isPropagationStopped = true;
  };

  return {
    bubbles: event.bubbles,
    cancelable: event.cancelable,
    currentTarget: target,
    defaultPrevented: event.defaultPrevented,
    eventPhase: event.eventPhase,
    isDefaultPrevented: () => isDefaultPrevented,
    isPropagationStopped: () => isPropagationStopped,
    isTrusted: event.isTrusted,
    nativeEvent: event,
    persist: () => undefined,
    preventDefault,
    stopPropagation,
    target,
    timeStamp: event.timeStamp,
    type: event.type,
  };
}
