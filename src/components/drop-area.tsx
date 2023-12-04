"use client";
import { Button, Image, ScrollShadow } from "@nextui-org/react";
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import CollectionAttributes from "./collection-attributes";

interface FileWithPreview extends File {
  preview: string;
}

const ImageUploadComponent: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  // Preview component
  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div className="">
        <Image isZoomed width={240} alt={file.name} src={file.preview} />
      </div>
    </div>
  ));

  // Cleanup previews
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <div className="p-6 cursor-pointer">
      {files.length === 0 ? (
        <div
          {...getRootProps()}
          className="h-[50vh] w-full flex justify-center items-center  dark:bg-zinc-900 rounded-lg light:bg-zinc-200"
        >
          <input {...getInputProps()} />
          <p>Drag {"'n'"} drop some images here, or click to select images</p>
        </div>
      ) : (
        <div className="">
          <ScrollShadow
            hideScrollBar
            offset={100}
            orientation="horizontal"
            className="max-w-[400px] max-h-[300px]"
          >
            <aside className="flex w-full">{thumbs}</aside>
          </ScrollShadow>
          <Button
            color="danger"
            className="mt-4"
            onClick={() => {
              setFiles([]);
            }}
          >
            Cancel
          </Button>
          <CollectionAttributes />
        </div>
      )}
    </div>
  );
};

export default ImageUploadComponent;
