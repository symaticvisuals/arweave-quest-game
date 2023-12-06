"use client";
import React, { useState } from "react";
import QRCode from "qrcode.react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const QRCodeGenerator: React.FC = () => {
  const [urls, setUrls] = useState<string[]>([""]);

  const addUrl = (): void => {
    setUrls([...urls, ""]);
  };

  const updateUrl = (value: string, index: number): void => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const downloadAllQRs = async (): Promise<void> => {
    const zip = new JSZip();
    urls.forEach((url, index) => {
      if (url) {
        const canvas: HTMLCanvasElement = document.getElementById(
          `qrCodeEl-${index}`
        ) as HTMLCanvasElement;
        const imgData = canvas.toDataURL("image/png");
        zip.file(`qr-code-${index}.png`, imgData.split("base64,")[1], {
          base64: true,
        });
      }
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "qr-codes.zip");
  };

  return (
    <div>
      {urls.map((url, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => updateUrl(e.target.value, index)}
          />
          {url && (
            <QRCode
              id={`qrCodeEl-${index}`}
              value={url}
              size={150}
              level={"H"}
              includeMargin={true}
            />
          )}
        </div>
      ))}
      <button onClick={addUrl}>Add URL</button>
      <button onClick={downloadAllQRs}>Download ZIP</button>
    </div>
  );
};

export default QRCodeGenerator;
