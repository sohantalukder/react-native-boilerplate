/**
 * @description This is a configuration for the pagination of the flash list.
 * @param END_REACHED_THRESHOLD - The threshold for the end of the list.
 * @param ESTIMATED_ITEM_SIZE - The estimated size of the item.
 */
export const PAGINATION_CONFIG = {
  /**
   * @description The threshold for the end of the list.
   */
  END_REACHED_THRESHOLD: 0.2,
  /**
   * @description The estimated size of the item.
   */
  ESTIMATED_ITEM_SIZE: 200,
  /**
   * @description The page size.
   */
  PAGE_SIZE: 20,
  /**
   * @description The debounce time.
   */
  END_REACHED_DEBOUNCE_MS: 500,
} as const;
