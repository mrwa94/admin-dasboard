import { useEffect, useState } from "react";

import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

import Image from "next/image";

import { Button } from "./button";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (vale: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const onUpload = async (result: any) => {
    try {
      const uploadedUrl = result.info.secure_url;
      if (isValidUrl(uploadedUrl)) {
        onChange(uploadedUrl);
      } else {
        console.error("Invalid URL returned from Cloudinary:", uploadedUrl);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };



  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-center gap-4 mb-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute  top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                
                <Trash className="h-4 w-4 " />
              </Button>
            </div>
            {isValidUrl(url) ? (
              <Image fill className="object-cover " alt="image" src={url} />
            ) : (
              <p>Invalid URL</p>
            )}
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="nj0ibrvr" onUpload={onUpload}>
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="mr-2 w-4 h-4" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
export default ImageUpload;
