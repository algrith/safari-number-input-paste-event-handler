import { ChangeEventHandler, PasteEventHandler, ResolveMultipleDecimals } from './types';

/**
 * Determines if the current browser is Safari.
 *
 * @returns A boolean indicating whether the browser is Safari.
 */
export const browserIsSafari: () => boolean = () => /^((?!chrome|android|crios).)*safari/i.test(navigator.userAgent);


/**
 * Handles the paste event for number inputs in Safari, ensuring proper formatting.
 *
 * @param event - The ClipboardEvent triggered by the paste action.
 * @param changeEventHandler - A callback function to handle the change event.
 */
export const pasteEventHandler: PasteEventHandler = (event, changeEventHandler) => {
  if (!(event.target instanceof HTMLInputElement)) return;
  const nativeEvent = (event as any)?.nativeEvent ?? event;
  if (!(nativeEvent instanceof ClipboardEvent)) return;

  // Only apply on number inputs in Safari.
  if (!isNumberInputInSafari(event.target)) return;
  
  const input = event.target;

  const clipboardText = event?.clipboardData?.getData?.('text') || '';
  const pastedValue = resolveMultipleDecimals(clipboardText);
  const currentValue = input.value;

  // Prevent default paste handling.
  event.preventDefault();
  
  // Temporarily convert to text input to access selectionStart/End.
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
  changeEventHandler(event);
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
export const resolveMultipleDecimals: ResolveMultipleDecimals = (value = '') => {
  const parts = value.toString().trim().split('.');
  if (parts.length <= 1) return Number(value);
  const decimalPart = parts.slice(1).join('');
  const integerPart = parts[0];

  return Number(`${integerPart}.${decimalPart}`);
};


/**
 * Checks if the given input element is a number input in Safari.
 *
 * @param eventTarget - The HTMLInputElement to check.
 * @returns A boolean indicating whether the input is a number input in Safari.
 */
export const isNumberInputInSafari = (eventTarget: HTMLInputElement) => {
  return eventTarget.type === 'number' && browserIsSafari();
};


/**
 * Handles the `keydown` event for number input fields in Safari, ensuring only valid input is allowed.
 *
 * This function prevents invalid characters from being entered into number input fields
 * and allows only specific keys, digits, and a single decimal point if not already present.
 * It is specifically designed to address Safari-specific behavior for number inputs.
 *
 * @param event - The `ChangeEvent` triggered by the `keydown` event.
 * 
 * Properties:
 * - `event.target` - The target element of the event, expected to be an `HTMLInputElement`.
 * - `event.key` - The key pressed during the `keydown` event.
 * - `event.ctrlKey` - Indicates whether the `Control` key was pressed during the event.
 * - `event.metaKey` - Indicates whether the `Meta` (Command) key was pressed during the event.
 * - `event.altKey` - Indicates whether the `Alt` key was pressed during the event.
 * - `event.nativeEvent` - The native event object, which should be a `KeyboardEvent`.
 *
 * Behavior:
 * - Allows navigation keys (`Backspace`, `Tab`, `ArrowLeft`, `ArrowRight`, `Delete`).
 * - Allows digits (`0-9`).
 * - Allows one decimal point (`.`) if not already present in the input value.
 * - Allows control/meta shortcuts (e.g., `Ctrl+C`, `Ctrl+V`).
 * - Blocks all other keys by calling `event.preventDefault()`.
 */
export const keyDownEventHandler: ChangeEventHandler = (event) => {
  if (!(event.target instanceof HTMLInputElement)) return;
  const nativeEvent = (event as any)?.nativeEvent ?? event;
  if (!(nativeEvent instanceof KeyboardEvent)) return;

  // Only apply on number inputs in Safari.
  if (!isNumberInputInSafari(event.target)) return;

  const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
  const key = event.key;

  // Allow control/meta shortcuts (e.g. Ctrl+C, Ctrl+V)
  if (event.ctrlKey || event.metaKey || event.altKey) return;

  // Allow navigation keys
  if (allowedKeys.includes(key)) return;

  // Allow digits
  if (/^\d$/.test(key)) return;

  // Allow one decimal point if not already present
  if (key === '.' && !event.target.value.includes('.')) return;

  // Block everything else
  event.preventDefault();
};