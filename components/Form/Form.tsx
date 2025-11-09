import EventEmitter from 'events';

import clsx from 'clsx';
import { createContext, useMemo } from 'react';

import './Form.scss';

type FormContextType = {
  events?: EventEmitter;
};

export type FormContextEvent = {
  defaultPrevented: boolean;
  preventDefault: () => void;
};

export const FormContext = createContext<FormContextType>({});

export default function Form({
  children,
  className = '',
  onSubmit = undefined,
  ...props
}: React.FormHTMLAttributes<HTMLFormElement>) {
  const contextValue = useMemo(() => ({ events: new EventEmitter() }), []);

  return (
    <FormContext.Provider value={ contextValue }>
      <form
        className={ clsx('form', className) }
        onSubmit={ event => {
          const mockEvent = {
            defaultPrevented: false,

            preventDefault() {
              mockEvent.defaultPrevented = true;
            },
          };

          contextValue.events.emit('submit', mockEvent);

          if (mockEvent.defaultPrevented) {
            event.preventDefault();
            return;
          }

          if (onSubmit) {
            onSubmit(event);
          }
        } }
        { ...props }
      >
        { children }
      </form>
    </FormContext.Provider>
  );
}
