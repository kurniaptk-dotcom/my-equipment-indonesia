import { z } from 'zod';

export const seoSettingsSchema = z.object({
  siteName: z.string().trim().min(2).max(100),
  defaultTitle: z.string().trim().min(2).max(160),
  description: z.string().trim().min(20).max(320),
  socialImage: z.string().trim().max(1000).optional().default(''),
  socialImageAlt: z.string().trim().max(240).optional().default(''),
}).superRefine((settings, context) => {
  if (settings.socialImage && settings.socialImageAlt.length < 3) {
    context.addIssue({ code: 'custom', path: ['socialImageAlt'], message: 'Alt gambar sosial wajib menjelaskan gambar.' });
  }
});

export type SeoSettings = z.infer<typeof seoSettingsSchema>;

export function parseSeoSettings(input: unknown): SeoSettings {
  return seoSettingsSchema.parse(input);
}
