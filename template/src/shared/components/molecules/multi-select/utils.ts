import { KeyOrValue, MultiSelectItem } from './types';

export const arraysEqual = (a: KeyOrValue[], b: KeyOrValue[]): boolean => {
  if (a.length !== b.length) return false;
  const sa = [...a].sort();
  const sb = [...b].sort();
  for (let i = 0; i < sa.length; i++) if (sa[i] !== sb[i]) return false;
  return true;
};

export const validateMultiSelectItem = (item: MultiSelectItem): boolean => {
  const hasKey = typeof item.key === 'string' || typeof item.key === 'number';
  const hasValue = typeof item.value === 'string' || typeof item.value === 'number';
  return hasKey || hasValue;
};

export const getStoredValue = (item: MultiSelectItem, save: 'key' | 'value'): KeyOrValue =>
  (save === 'key' ? item.key : item.value) ?? '';

export const getDisplayValue = (item?: MultiSelectItem, fallback?: KeyOrValue): KeyOrValue =>
  item?.value ?? item?.key ?? fallback ?? '';
