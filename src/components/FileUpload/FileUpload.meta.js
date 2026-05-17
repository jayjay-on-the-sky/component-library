export default {
  name: 'FileUpload',
  category: 'Forms',
  description: 'Drag-and-drop or click-to-upload file input with file list preview.',
  variants: [
    { label: 'Default', props: { label: 'Drop files here or click to upload', sublabel: 'PNG, JPG, PDF up to 10MB' } },
    { label: 'Multiple', props: { multiple: true, label: 'Upload multiple files', accept: 'image/*' } },
    { label: 'Small max size', props: { maxSize: 1024 * 1024, label: 'Upload a small file', sublabel: 'Max 1MB' } },
  ],
}
