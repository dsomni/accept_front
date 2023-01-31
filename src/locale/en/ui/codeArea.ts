export const codeArea = {
  selectFiles: 'Select files',
  selectFile: 'Select file',
  dragFiles: 'Drag files here',
  dragFile: 'Drag file here',
  filesRestrictions: [
    'It is HIGHLY recommended for the single test not to exceed 100 000 symbols and to have size not greater than 200 Kb',
    'Also, the total size of all tests should not exceed 2 Mb',
    'Otherwise, the website can stuck',
  ],
  notification: {
    uploading: { title: 'Uploading file...', description: '' },
    reject: {
      title: 'File rejected',
      description: 'File extension is not allowed',
    },
    error: { title: 'Error during file uploading', description: '' },
    success: {
      title: 'File has been uploaded successfully',
      description: '',
    },
  },
};
