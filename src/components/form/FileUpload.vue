<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

export interface UploadedFile {
  file: File
  id: string
  progress: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
}

const props = withDefaults(
  defineProps<{
    /** Accepted file types (e.g., 'image/*,.pdf') */
    accept?: string
    /** Allow multiple files */
    multiple?: boolean
    /** Maximum file size in bytes */
    maxSize?: number
    /** Maximum number of files */
    maxFiles?: number
    /** Disable the upload */
    disabled?: boolean
    /** Custom label text */
    label?: string
    /** Custom description text */
    description?: string
  }>(),
  {
    multiple: false,
    disabled: false,
    label: 'Drop files here or click to upload',
    description: '',
  },
)

const emit = defineEmits<{
  'files-selected': [files: File[]]
  'file-removed': [file: File]
  'error': [message: string]
}>()

const isDragging = ref(false)
const files = ref<UploadedFile[]>([])
const inputRef = ref<HTMLInputElement>()

const formatSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

const validateFile = (file: File): string | null => {
  if (props.maxSize && file.size > props.maxSize) {
    return `File too large. Max size: ${formatSize(props.maxSize)}`
  }
  if (props.accept) {
    const acceptedTypes = props.accept.split(',').map((t) => t.trim())
    const fileType = file.type
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase()

    const isAccepted = acceptedTypes.some((type) => {
      if (type.startsWith('.')) {
        return fileExt === type.toLowerCase()
      }
      if (type.endsWith('/*')) {
        return fileType.startsWith(type.replace('/*', '/'))
      }
      return fileType === type
    })

    if (!isAccepted) {
      return `File type not accepted`
    }
  }
  return null
}

const addFiles = (newFiles: FileList | File[]) => {
  const fileArray = Array.from(newFiles)
  const validFiles: File[] = []

  for (const file of fileArray) {
    if (props.maxFiles && files.value.length + validFiles.length >= props.maxFiles) {
      emit('error', `Maximum ${props.maxFiles} files allowed`)
      break
    }

    const error = validateFile(file)
    if (error) {
      emit('error', `${file.name}: ${error}`)
      continue
    }

    validFiles.push(file)
    files.value.push({
      file,
      id: Math.random().toString(36).substring(2),
      progress: 0,
      status: 'pending',
    })
  }

  if (validFiles.length > 0) {
    emit('files-selected', validFiles)
  }
}

const removeFile = (id: string) => {
  const index = files.value.findIndex((f) => f.id === id)
  if (index > -1) {
    const removed = files.value.splice(index, 1)[0]
    emit('file-removed', removed.file)
  }
}

const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  if (props.disabled || !e.dataTransfer?.files) return
  addFiles(e.dataTransfer.files)
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  if (!props.disabled) {
    isDragging.value = true
  }
}

const handleDragLeave = () => {
  isDragging.value = false
}

const handleClick = () => {
  if (!props.disabled) {
    inputRef.value?.click()
  }
}

const handleInputChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    addFiles(target.files)
    target.value = ''
  }
}

const dropzoneClasses = computed(() => {
  const base =
    'relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors'
  if (props.disabled) {
    return `${base} border-gray-200 bg-gray-50 cursor-not-allowed dark:border-gray-700 dark:bg-gray-800`
  }
  if (isDragging.value) {
    return `${base} border-primary-500 bg-primary-50 dark:bg-primary-900/20`
  }
  return `${base} border-gray-300 hover:border-primary-400 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-primary-500 dark:hover:bg-gray-800`
})

const getFileIcon = (file: File): string => {
  if (file.type.startsWith('image/')) return 'heroicons:photo'
  if (file.type.startsWith('video/')) return 'heroicons:video-camera'
  if (file.type.startsWith('audio/')) return 'heroicons:musical-note'
  if (file.type.includes('pdf')) return 'heroicons:document-text'
  if (file.type.includes('zip') || file.type.includes('rar')) return 'heroicons:archive-box'
  return 'heroicons:document'
}
</script>

<template>
  <div class="space-y-4">
    <!-- Dropzone -->
    <div
      :class="dropzoneClasses"
      @drop.prevent="handleDrop"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @click="handleClick"
    >
      <input
        ref="inputRef"
        type="file"
        class="hidden"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        @change="handleInputChange"
      />

      <div class="space-y-2">
        <Icon
          icon="heroicons:cloud-arrow-up"
          class="w-12 h-12 mx-auto text-gray-400"
          :class="{ 'text-primary-500': isDragging }"
        />
        <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {{ label }}
        </p>
        <p v-if="description" class="text-xs text-gray-500 dark:text-gray-400">
          {{ description }}
        </p>
        <p v-if="maxSize" class="text-xs text-gray-500 dark:text-gray-400">
          Max size: {{ formatSize(maxSize) }}
        </p>
      </div>
    </div>

    <!-- File list -->
    <ul v-if="files.length > 0" class="space-y-2">
      <li
        v-for="uploadedFile in files"
        :key="uploadedFile.id"
        class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
      >
        <Icon :icon="getFileIcon(uploadedFile.file)" class="w-8 h-8 text-gray-400" />

        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
            {{ uploadedFile.file.name }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ formatSize(uploadedFile.file.size) }}
          </p>
        </div>

        <button
          type="button"
          class="p-1 text-gray-400 hover:text-red-500 rounded"
          @click.stop="removeFile(uploadedFile.id)"
        >
          <Icon icon="heroicons:x-mark" class="w-5 h-5" />
        </button>
      </li>
    </ul>
  </div>
</template>
