import React, { useState } from 'react';
import { Upload, File, Trash2, Loader2 } from 'lucide-react';
import { processFile, generateTrainingSummary } from '../../lib/fileProcessing';
import toast from 'react-hot-toast';

interface FileUploadZoneProps {
  onProcessComplete: (summary: string) => void;
}

export default function FileUploadZone({ onProcessComplete }: FileUploadZoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    await processFiles(droppedFiles);
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      await processFiles(selectedFiles);
    }
  };

  const processFiles = async (newFiles: File[]) => {
    setIsProcessing(true);
    try {
      setFiles(prev => [...prev, ...newFiles]);
      
      for (const file of newFiles) {
        const content = await processFile(file);
        const summary = await generateTrainingSummary(content);
        onProcessComplete(summary);
        toast.success(`Successfully processed ${file.name}`);
      }
    } catch (error: any) {
      toast.error(error.message || 'Error processing file');
    } finally {
      setIsProcessing(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-green-500/50 transition-colors"
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-400 mb-2">
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" size={20} />
              Processing files...
            </span>
          ) : (
            "Drag and drop your files here, or"
          )}
        </p>
        <label className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
          <input
            type="file"
            multiple
            onChange={handleFileInput}
            className="hidden"
            accept=".pdf,.xlsx,.xls,.txt"
          />
          Browse Files
        </label>
        <p className="text-gray-500 text-sm mt-2">
          Supported formats: PDF, Excel, Text files
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <File className="text-gray-400" size={20} />
                <span className="text-sm">{file.name}</span>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="p-1 text-gray-400 hover:text-red-500 hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}