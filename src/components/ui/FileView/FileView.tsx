import { cn } from '@/lib/utils';
import { IFile } from '@/types/other';
import Image from 'next/image';
import { useRef } from 'react';

interface FileViewProps {
  file: IFile | null;
  download?: boolean;
}

const FileView = ({ file, download = false }: FileViewProps) => {
  const isImage = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(file?.type || '');
  const downloadRef = useRef<HTMLAnchorElement>(null);
  if (!file) return <div className="w-full h-full bg-gray-100 rounded-md"></div>;

  return (
    <div
      onClick={() => {
        if (download) {
          downloadRef.current?.click();
        }
      }}
      className={cn(
        'flex flex-col items-center justify-between rounded-lg bg-white p-3 w-fit h-fit',
        download && 'cursor-pointer'
      )}
    >
      <div className="w-16 h-16 flex items-center justify-center">
        {isImage ? (
          <Image
            src={file.src}
            alt={file.title}
            className="w-10 h-10 object-cover rounded-sm mb-2"
            width={64}
            height={64}
          />
        ) : (
          <Image
            className="w-10 h-10 object-cover rounded-sm mb-2"
            src={'/images/pdf.png'}
            alt={file.title}
            width={40}
            height={40}
          />
        )}
      </div>

      <p className="text-xs w-18 font-light truncate text-center">{file.title}</p>

      {download && (
        <a
          rel="noreferrer"
          href={file.src}
          target="_blank"
          download
          className="hidden"
          ref={downloadRef}
        ></a>
      )}
    </div>
  );
};

export default FileView;
