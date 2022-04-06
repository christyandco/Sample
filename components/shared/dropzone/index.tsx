import { DragEvent, FC } from 'react';

const DropZone: FC<{ onDrop: (files: FileList, e: any) => void }> = ({
  children,
  onDrop,
}) => {
  const dragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const dragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const dragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const fileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    onDrop(files, e);
  };

  return (
    <div
      className='w-full h-full flex justify-center items-center'
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={fileDrop}
    >
      {children}
    </div>
  );
};

export default DropZone;
