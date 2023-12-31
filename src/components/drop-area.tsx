"use client";

import { useImageUploader } from "@/hooks/use-image-uploader";
import { registerAsset } from "@/utils/asset-ownership";
import { Button, Image, Progress, cn } from "@nextui-org/react";
import { useApi } from "arweave-wallet-kit";
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Vina_Sans as FontSerif } from "next/font/google";

interface ImagePreviewProps {
  src: string;
  alt: string;
}

const fontSerif = FontSerif({
  subsets: ["latin"],
  weight: ["400"],
});

const ImagePreview: React.FC<ImagePreviewProps> = React.memo(({ src, alt }) => (
  <div>
    <Image src={src} alt={alt} width={500} height={500} />
  </div>
));

ImagePreview.displayName = "ImagePreview";

export interface FileWithPreview extends File {
  preview?: string;
}

const ImageUploadComponent: React.FC = () => {
  const { connected, connect, uploadImages, txIds, uploadStatus } =
    useImageUploader();
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPreview[]) => {
      if (!connected) {
        connect(); // Trigger wallet connection if not connected
      } else {
        uploadImages(acceptedFiles);
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      }
      return () => {
        acceptedFiles.forEach(
          (file) => file.preview && URL.revokeObjectURL(file.preview)
        );
      };
    },
    [uploadImages, connected, connect]
  );

  const { getRootProps, getInputProps } = useDropzone({
    //ts-ignore
    onDrop,
    multiple: true,
  });

  const api = useApi();
  return (
    <div className="p-6 cursor-pointer">
      {files.length === 0 && (
        <div
          {...getRootProps()}
          className="h-[50vh] flex justify-center items-center bg-zinc-900 rounded-lg"
        >
          <input {...getInputProps()} />
          <p>Drag {"n"} drop some images here, or click to select images</p>
        </div>
      )}

      {uploadStatus === "Uploading..." && (
        <Progress
          size="sm"
          isIndeterminate
          aria-label="Loading..."
          className="max-w-md"
        />
      )}

      <div className="grid grid-cols-3">
        {files.map((txId, i) => (
          <ImagePreview
            key={i}
            src={files[i].preview || files[i].name}
            alt={`Image ${txId}`}
          />
        ))}
      </div>
      <div className="flex gap-4 items-center mt-4">
        {files.length > 0 && (
          <Button
            color="secondary"
            onClick={async () => {
              const callerId = await api?.getActiveAddress();
              console.log(txIds);
              callerId &&
                registerAsset(txIds[0], callerId).then(
                  (res) => console.log(res),
                  (err) => console.log(err)
                );
            }}
          >
            Add to Contract
          </Button>
        )}

        {files.length > 0 && (
          <Button
            color="danger"
            onClick={() => {
              setFiles([]);
              txIds.splice(0, txIds.length);
            }}
            className=""
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImageUploadComponent;
