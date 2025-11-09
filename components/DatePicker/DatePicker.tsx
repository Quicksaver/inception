'use client';

import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { useId, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import IconCalendarEvent from 'components/Icon/CalendarEvent';

import './DatePicker.scss';

interface DatePickerProps {
  className?: string;
  label?: string;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  value?: Date;
}

export default function DatePicker({
  className = '',
  label = undefined,
  onChange = undefined,
  placeholder = 'Select date',
  value = undefined,
}: DatePickerProps) {
  const [ open, setOpen ] = useState(false);
  const inputId = useId();

  const handleSelect = (date: Date | undefined) => {
    onChange?.(date);
    setOpen(false);
  };

  const displayValue = value ? format(value, 'dd/MM/yyyy', { locale: pt }) : placeholder;

  return (
    <div className={ clsx('date-picker', className) }>
      { !!label && (
        <label
          className="date-picker__label"
          htmlFor={ inputId }
        >
          { label }
        </label>
      ) }
      <Popover.Root
        onOpenChange={ setOpen }
        open={ open }
      >
        <Popover.Trigger asChild>
          <button
            className="date-picker__trigger"
            id={ inputId }
            type="button"
          >
            <div className="date-picker__icon">
              <IconCalendarEvent />
            </div>
            <span className="date-picker__value">
              { displayValue }
            </span>
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            align="start"
            className="date-picker__content"
            side="bottom"
            sideOffset={ 4 }
          >
            <DayPicker
              captionLayout="dropdown"
              className="date-picker__calendar"
              locale={ pt }
              mode="single"
              onSelect={ handleSelect }
              selected={ value }
              startMonth={ new Date('1900-01-01') }
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
