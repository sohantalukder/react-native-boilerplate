import { z } from 'zod';

export const enum SupportedLanguages {
  EN_EN = 'en-EN',
  BN_BN = 'bn-BN',
}

export const languageSchema = z.enum([
  SupportedLanguages.EN_EN,
  SupportedLanguages.BN_BN,
]);

export type Language = z.infer<typeof languageSchema>;
