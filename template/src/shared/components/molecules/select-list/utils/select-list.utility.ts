import { SelectItem } from '../types/select-list.type';

/**
 * Validates if an item is a valid SelectItem
 * @param item - The item to validate
 * @returns True if the item is valid
 */
const validateSelectItem = (item: unknown): item is SelectItem => {
  return (
    typeof item === 'object' &&
    item !== null &&
    (typeof (item as SelectItem).key === 'string' ||
      typeof (item as SelectItem).key === 'number' ||
      (item as SelectItem).key === undefined) &&
    (typeof (item as SelectItem).value === 'string' ||
      typeof (item as SelectItem).value === 'number' ||
      (item as SelectItem).value === undefined)
  );
};

export { validateSelectItem };
