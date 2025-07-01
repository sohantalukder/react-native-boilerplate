const isEmpty = (value: unknown, omitArray: boolean = false): boolean => {
  // Handle null, undefined
  if (value == null) return true;

  // Handle strings more efficiently
  if (typeof value === 'string') return value.trim() === '';

  // Handle arrays with early return for omitArray
  if (Array.isArray(value)) return omitArray ? false : value.length === 0;

  // Handle objects
  if (typeof value === 'object') return Object.keys(value).length === 0;

  // All other types are considered non-empty
  return false;
};

export default isEmpty;
