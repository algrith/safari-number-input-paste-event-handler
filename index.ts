import { FormatNumberInputValue, ResolveMultipleDecimals } from './types';

/**
 * Determines if the current browser is Safari.
 *
 * @returns A boolean indicating whether the browser is Safari.
 */
const browserIsSafari: () => boolean = () => /^((?!chrome|android|crios).)*safari/i.test(navigator.userAgent);


/**
 * Handles the paste event for number inputs in Safari, ensuring proper formatting.
 *
 * @param event - The ClipboardEvent triggered by the paste action.
 * @param changeHandler - A callback function to handle the change event.
 */
export const formatNumberInputValue: FormatNumberInputValue = (event, changeHandler) => {
  const eventTarget = event.target as HTMLInputElement;
  const isSafariBrowser = browserIsSafari();

  // Only apply workaround on Safari and number inputs.
  if (eventTarget?.type !== 'number' || !isSafariBrowser) return;

  const pastedValue = resolveMultipleDecimals(event?.clipboardData?.getData?.('text') || '');
  const currentValue = eventTarget.value;

  // Prevent default paste handling.
  event.preventDefault();

  // Temporarily convert to text input to access selectionStart/End.
  const input = eventTarget;
  input.type = 'text';

  const pastedValueHasDecimalPoint = pastedValue.toString().includes('.');
  const currentValueHasDecimalPoint = currentValue.includes('.');
  const start = input.selectionStart ?? currentValue.length;
  const end = input.selectionEnd ?? currentValue.length;

  const selectionHasDecimal = currentValue.slice(start, end).includes('.');
  const decimalIsDropped = currentValueHasDecimalPoint && !selectionHasDecimal && pastedValueHasDecimalPoint;
  const cursorOffset = decimalIsDropped ? 1 : 0;

  const newValue = currentValue.slice(0, start) + pastedValue + currentValue.slice(end);
  
  // Set the new value if it's numeric, or fallback.
  input.value = !isNaN(Number(pastedValue)) ? resolveMultipleDecimals(newValue).toString() : currentValue;

  const newCursorPosition = start + pastedValue.toString().length - cursorOffset;
  input.setSelectionRange(newCursorPosition, newCursorPosition);

  // Revert input type back to number.
  input.type = 'number';

  // Manually fire change handler to update state.
  changeHandler(event);
};


/**
 * Resolves multiple decimal points in a given numeric string or number.
 * If the input contains more than one decimal point, it combines all parts
 * after the first decimal point into a single valid decimal number.
 *
 * @param value - The input value to process, which can be a string or a number.
 *                Defaults to an empty string if not provided.
 * @returns The numeric value after resolving multiple decimal points.
 *
 * @example
 * ```typescript
 * resolveMultipleDecimals("123.45.67"); // Returns 123.4567
 * resolveMultipleDecimals(123.45);     // Returns 123.45
 * resolveMultipleDecimals("123");      // Returns 123
 * resolveMultipleDecimals("");         // Returns 0
 * ```
 */
const resolveMultipleDecimals: ResolveMultipleDecimals = (value = '') => {
  const parts = value.toString().trim().split('.');
  if (parts.length <= 1) return Number(value);
  const decimalPart = parts.slice(1).join('');
  const integerPart = parts[0];

  return Number(`${integerPart}.${decimalPart}`);
};