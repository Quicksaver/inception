'use client';

import clsx from 'clsx';
import { PhoneNumberUtil } from 'google-libphonenumber';
import {
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  type CountryData,
  type CountryIso2,
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone';

import Combobox from 'components/Combobox';
import { FormContext, type FormContextEvent } from 'components/Form';
import FormInput from 'components/Form/Input';
import FormLabel from 'components/Form/Label';

import './Phone.scss';

interface FormPhoneProps {
  className?: string;
  defaultCountry?: CountryIso2;
  errors?: null | string[];
  label?: string;
  name?: string;
  onChange?: (phone: string) => void;
  placeholder?: string;
  required?: boolean;
  value?: string;
}

const countries = [
  [ 'Select', '' as CountryIso2, '', '', 0, [] ] as CountryData,
  ...defaultCountries,
];

// Initialize phone number utility
const phoneUtil = PhoneNumberUtil.getInstance();

// Phone validation utility function
const isPhoneValid = (phone: string): boolean => {
  if (!phone || phone.trim() === '') {
    return false;
  }

  try {
    const parsedNumber = phoneUtil.parseAndKeepRawInput(phone);
    return phoneUtil.isValidNumber(parsedNumber);
  }
  catch {
    return false;
  }
};

export default function FormPhone({
  className = '',
  defaultCountry = '',
  errors = null,
  label = '',
  name = '',
  onChange = undefined,
  placeholder = '...',
  required = false,
  value = '',
  ...props
}: FormPhoneProps) {
  const [ hasInput, setHasInput ] = useState(!!value);

  const {
    country,
    handlePhoneValueChange,
    inputRef,
    inputValue,
    phone,
    setCountry,
  } = usePhoneInput({
    countries,
    defaultCountry,
    onChange: data => {
      // Handle showing an empty input in the beginning, until the user types something
      if (data.inputValue !== '+ ') {
        setHasInput(true);
      }
      onChange?.(data.phone);
    },
    value,
  });

  const formContext = useContext(FormContext);

  const handleCountrySelect = useCallback((countryIso2: string) => {
    setCountry(countryIso2);
  }, [ setCountry ]);

  const countryOptions = useMemo(() => (
    defaultCountries.map(c => {
      const parsedCountry = parseCountry(c);
      return {
        icon: <FlagImage iso2={ parsedCountry.iso2 } />,
        label: `${parsedCountry.name} +${parsedCountry.dialCode}`,
        value: parsedCountry.iso2,
      };
    })
  ), []);

  const customFilter = useCallback((optionValue: string, search: string) => {
    if (!search) {
      return 1;
    }

    const option = countryOptions.find(opt => opt.label === optionValue);
    if (!option) {
      return 0;
    }

    const foundCountry = defaultCountries.find(c => parseCountry(c).iso2 === option.value);
    if (!foundCountry) {
      return 0;
    }

    const parsedCountry = parseCountry(foundCountry);
    const searchLower = search.toLowerCase();

    return (
      parsedCountry.name.toLowerCase().includes(searchLower)
      || parsedCountry.dialCode.includes(search)
    )
      ? 1
      : 0;
  }, [ countryOptions ]);

  return (
    <FormLabel
      className={ clsx('form-phone', className, {
        'form-phone--errored': errors?.length,
      }) }
      errors={ errors }
      htmlFor={ name }
      label={ label }
    >
      <div className="form-phone__container">
        <Combobox
          className="form-phone__country-selector"
          customFilter={ customFilter }
          emptyMessage="No country found."
          enableSearch
          onChange={ handleCountrySelect }
          options={ countryOptions }
          placeholder={ `${country.name} +${country.dialCode}` }
          searchPlaceholder="Search country..."
          showOnlyIconInSelected
          value={ country.iso2 }
        />

        <FormInput
          id={ name }
          name={ name }
          onChange={ handlePhoneValueChange }
          placeholder={ placeholder }
          ref={ element => {
            inputRef.current = element as HTMLInputElement | null;

            if (element && formContext.events) {
              const { events } = formContext;
              const onSubmit = (event: FormContextEvent) => {
                const phoneNumber = hasInput ? (phone || '') : '';

                if (required && phoneNumber.trim()) {
                  element.setCustomValidity('Phone number is required');
                  event.preventDefault();
                }
                else if (phoneNumber && !isPhoneValid(phoneNumber)) {
                  element.setCustomValidity('Please enter a valid phone number');
                  event.preventDefault();
                }
                else {
                  element.setCustomValidity('');
                }
                element.reportValidity();
              };

              const onInput = () => {
                element.setCustomValidity('');
                element.reportValidity();
              };

              events.on('submit', onSubmit);
              element.addEventListener('input', onInput);

              return () => {
                events.off('submit', onSubmit);
                element.removeEventListener('input', onInput);
                inputRef.current = null;
              };
            }

            return () => {
              inputRef.current = null;
            };
          } }
          required={ required }
          type="tel"
          value={ hasInput ? inputValue : '' }
          { ...props }
        />
      </div>
    </FormLabel>
  );
}
