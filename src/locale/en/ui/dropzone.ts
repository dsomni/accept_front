export const dropzone = {
  errors: {
    'file-invalid-type': {
      title: 'Invalid file type',
      message: (name: string) =>
        `The type of file ${name} is incorrect`,
    },
    'file-too-large': {
      title: 'File is too large',
      message: (name: string) =>
        `The size of file ${name} is too big`,
    },
    'file-too-small': {
      title: 'File is too small',
      message: (name: string) =>
        `The size of file ${name} is too small`,
    },
    'too-many-files': {
      title: 'Too many files',
      message: (_: string) => `Too many files`,
    },
  },
};
