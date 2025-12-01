/* eslint-disable react-hooks/exhaustive-deps */
import { uploadFile } from '@/components/fields/FileUploader/fileUpload';
import UploadIcon from '@/components/icons/UploadIcon';
import Typography from '@/components/ui/Typography';
import { cn, getImageUrl } from '@/lib/utils';
import { IFileResponse } from '@/types/file';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useCallback, useRef, useState } from 'react';

const ACCEPT_IMAGE_TYPES = 'image/svg+xml,image/png,image/jpeg,image/jpg';

export interface FileUploaderProps {
  value?: IFileResponse | null;
  onChange?: (fieldId: IFileResponse | null) => void;
  accept?: string;
  maxSize?: number; // in bytes
  disabled?: boolean;
  className?: string;
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  height?: number;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  value,
  onChange,
  accept,
  maxSize = 2 * 1024 * 1024, // 2MB default
  disabled = false,
  className,
  label,
  required = false,
  error,
  helperText,
  height = 240,
}) => {
  const t = useTranslations();
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [tempFile, setTempFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptTypes = accept ? accept : ACCEPT_IMAGE_TYPES;

  const validateFile = useCallback(
    (file: File): string | null => {
      // Check file type
      if (!acceptTypes?.includes(file.type) && !acceptTypes?.includes('*')) {
        return t('Qabul qilinmaydigan fayl turi') + ': ' + acceptTypes;
      }

      // Check file size
      if (file.size > maxSize) {
        return t('Fayl juda katta', {
          maxSize: Math.round(maxSize / 1024 / 1024),
        });
      }

      return null;
    },
    [acceptTypes, maxSize]
  );

  const handleFileSelect = useCallback(
    async (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        setUploadError(validationError);
        return;
      }

      setUploadError(null);
      setTempFile(file);

      try {
        const data = await uploadFile(file);
        onChange?.(data);
        setTempFile(null);
      } catch {
        setUploadError(t('Fayl yuklashda xatolik'));
      }
    },
    [validateFile, onChange]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (!disabled) {
        setIsDragOver(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragOver(false);

      if (disabled) return;

      const files = event.dataTransfer.files;
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [disabled, handleFileSelect]
  );

  const getImageSrc = useCallback(() => {
    if (
      value &&
      (value.type === 'pdf' ||
        value.type === 'application/pdf' ||
        value.type === 'application/msword' ||
        value.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    ) {
      return '/images/pdf.png';
    }
    if (tempFile) {
      return URL.createObjectURL(tempFile);
    }
    if (value) {
      return getImageUrl(value);
    }
    return '';
  }, [tempFile, value]);

  const getImageAlt = useCallback(() => {
    if (tempFile) {
      return tempFile.name || 'Selected image';
    }
    if (value) {
      return value.title;
    }
    return 'Image';
  }, [tempFile, value]);

  const currentFile = value || tempFile;
  const isFileSelected = Boolean(currentFile);

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label
          className={cn(
            'block mb-2 font-medium text-base leading-6 text-bunker-800',
            error && 'text-primary-500'
          )}
        >
          {label}
          {required && <span className="text-primary-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={cn(
          'relative border-2 cursor-pointer border-dashed border-mid-gray-1 bg-white rounded-lg p-3 transition-all duration-200',
          'flex flex-col items-center justify-center gap-3',
          isDragOver && !disabled && 'border-blue-400 bg-blue-50',
          disabled && 'opacity-50 cursor-not-allowed',
          error && 'border-red-300 bg-primary-50',
          className
        )}
        style={{ minHeight: `${height}px`, maxHeight: `${height}px` }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {isFileSelected ? (
          <Image
            src={getImageSrc()}
            alt={getImageAlt()}
            width={500}
            height={500}
            className="w-auto h-full rounded-lg overflow-hidden object-contain"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 w-full">
            <UploadIcon className="text-text-1" />
            <Typography variant="caption-rg-14" className="text-text-3">
              {t('Загрузить фото')}
            </Typography>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={acceptTypes}
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
        />

        {(uploadError || error) && (
          <p className="text-sm text-primary-500 text-center mt-2">{uploadError || error}</p>
        )}
      </div>

      {helperText && !error && !uploadError && (
        <p className="mt-2 text-sm text-bunker-600">{helperText}</p>
      )}
    </div>
  );
};

export default FileUploader;
