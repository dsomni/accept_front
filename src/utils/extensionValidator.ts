import { ILanguage } from '@custom-types/data/atomic';

export const extensionValidator = (
  fileName: string,
  languages: ILanguage[]
): string | undefined => {
  const fileExtensionIndex = fileName.lastIndexOf('.');
  if (fileExtensionIndex == -1) return undefined;
  const fileExtension = fileName.slice(fileExtensionIndex + 1);

  return languages
    .find((lang) => lang.extensions.includes(fileExtension))
    ?.spec.toString();
};
