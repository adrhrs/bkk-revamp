import { useState, useRef } from 'react'

const ALLOWED_TYPES = {
  'text/csv': '.csv',
  'image/jpeg': '.jpg',
  'image/png': '.png',
}

const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1 MB

function LPTAssetsManager() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef(null)

  const validateFile = (file) => {
    if (!file) return 'Please select a file'
    
    if (!Object.keys(ALLOWED_TYPES).includes(file.type)) {
      return 'Invalid file type. Only CSV, JPG, and PNG files are allowed.'
    }
    
    if (file.size > MAX_FILE_SIZE) {
      return `File size exceeds 1 MB limit. Your file is ${(file.size / (1024 * 1024)).toFixed(2)} MB.`
    }
    
    return null
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    setError('')
    setUploadedUrl('')
    setCopied(false)
    
    if (file) {
      const validationError = validateFile(file)
      if (validationError) {
        setError(validationError)
        setSelectedFile(null)
        setPreview(null)
        return
      }
      
      setSelectedFile(file)
      
      // Generate preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result)
        }
        reader.readAsDataURL(file)
      } else {
        setPreview(null)
      }
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const file = e.dataTransfer.files?.[0]
    if (file) {
      // Create a synthetic event to reuse handleFileChange logic
      const syntheticEvent = {
        target: { files: [file] }
      }
      handleFileChange(syntheticEvent)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedFile) {
      setError('Please select a file to upload')
      return
    }
    
    const validationError = validateFile(selectedFile)
    if (validationError) {
      setError(validationError)
      return
    }
    
    setIsUploading(true)
    setError('')
    
    try {
      // Mock presigned URL upload
      // In real implementation:
      // 1. Request presigned URL from backend
      // 2. Upload file to presigned URL
      // 3. Return the public GCS URL
      
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate upload delay
      
      // Generate mock GCS public URL
      const timestamp = Date.now()
      const sanitizedFileName = selectedFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const mockGcsUrl = `https://storage.googleapis.com/lpt-assets-bucket/${timestamp}_${sanitizedFileName}`
      
      setUploadedUrl(mockGcsUrl)
      setSelectedFile(null)
      setPreview(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (err) {
      setError('Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(uploadedUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      setError('Failed to copy URL')
    }
  }

  const handleClear = () => {
    setSelectedFile(null)
    setPreview(null)
    setError('')
    setUploadedUrl('')
    setCopied(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-zinc-100">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-800 mb-2">LPT Assets Manager</h1>
          <p className="text-neutral-500 text-sm">Upload and manage your assets. Get public URLs for your files.</p>
        </div>

        {/* Upload Card */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="p-6">
            {/* File Requirements Info */}
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-amber-800 mb-1">Accepted File Types</p>
                  <p className="text-xs text-amber-700">
                    <span className="inline-flex items-center gap-1">
                      <span className="px-1.5 py-0.5 bg-amber-100 rounded font-mono">.csv</span>
                      <span className="px-1.5 py-0.5 bg-amber-100 rounded font-mono">.jpg</span>
                      <span className="px-1.5 py-0.5 bg-amber-100 rounded font-mono">.png</span>
                    </span>
                    <span className="mx-2">•</span>
                    <span>Max file size: <strong>1 MB</strong></span>
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                  selectedFile 
                    ? 'border-emerald-300 bg-emerald-50' 
                    : 'border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                {!selectedFile ? (
                  <>
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-neutral-700 font-medium mb-1">Drop your file here or click to browse</p>
                    <p className="text-neutral-400 text-sm">CSV, JPG, or PNG up to 1 MB</p>
                  </>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      {selectedFile.type.startsWith('image/') ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="text-left">
                      <p className="text-neutral-800 font-medium text-sm truncate max-w-[200px]">{selectedFile.name}</p>
                      <p className="text-neutral-500 text-xs">{formatFileSize(selectedFile.size)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleClear()
                      }}
                      className="ml-2 p-1.5 rounded-full hover:bg-neutral-200 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Image Preview */}
              {preview && (
                <div className="mt-4">
                  <p className="text-xs font-medium text-neutral-500 mb-2">Preview</p>
                  <div className="relative inline-block">
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="max-h-48 rounded-lg border border-neutral-200 shadow-sm"
                    />
                  </div>
                </div>
              )}

              {/* CSV Preview */}
              {selectedFile && selectedFile.type === 'text/csv' && (
                <div className="mt-4 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                  <div className="flex items-center gap-2 text-neutral-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">CSV File Selected</span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">CSV files cannot be previewed</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{error}</span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={!selectedFile || isUploading}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    !selectedFile || isUploading
                      ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                      : 'bg-neutral-800 text-white hover:bg-neutral-900 active:scale-[0.99]'
                  }`}
                >
                  {isUploading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Upload File</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Success Result */}
          {uploadedUrl && (
            <div className="border-t border-neutral-200 bg-emerald-50 p-6">
              <div className="flex items-center gap-2 text-emerald-700 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Upload Successful!</span>
              </div>
              
              <p className="text-xs text-emerald-600 mb-2">Your file is now available at:</p>
              
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white rounded-lg border border-emerald-200 px-3 py-2 overflow-hidden">
                  <p className="text-sm text-neutral-700 font-mono truncate">{uploadedUrl}</p>
                </div>
                <button
                  onClick={handleCopyUrl}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    copied 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  {copied ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              
              <p className="text-xs text-emerald-600 mt-3">
                Save this URL locally. You can use it in your configurations.
              </p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-neutral-400">
            Files are uploaded to Google Cloud Storage and will be publicly accessible.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LPTAssetsManager

