import React, { useState, ChangeEvent } from "react";
import { IoTrashOutline } from "react-icons/io5";

interface ImageUploaderProps {
  imageList: any;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ imageList }) => {
  const [images, setImages] = useState<File[]>([]);
  console.log(images);
  console.log(imageList);
  

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newImages = e.target.files;
    if (newImages) {
      setImages([...Array.from(newImages)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="xl:col-span-3 lg:col-span-4 md:col-span-3 col-span-2">
      <div className="relative w-full h-28 bg-white rounded-2xl border-dashed border-mianColor border-2">
        <input
          className="opacity-0 absolute right-0 top-0 w-full h-full cursor-pointer"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <span className="absolute right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2">تصویر مورد نظر را انتخاب کنید</span>
      </div>
      <div className="flex flex-col gap-4 mt-8">
        {images.length && (
          <div className="flex flex-col gap-4">
            {images.map((image, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} className="rounded-lg object-cover h-16 w-16" />
                  <div className="flex flex-col items-start">
                    <div>Name: {image.name}</div>
                    <div>Size: {formatBytes(image.size)}</div>
                  </div>
                </div>
                <button onClick={() => handleRemoveImage(index)}>
                  <IoTrashOutline className="text-red-500 text-lg" />
                </button>
              </div>
            ))}
          </div>
        )}

        {imageList?.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={`${process.env.NEXT_PUBLIC_API_URL}/${item.url}`} alt={`Image ${index + 1}`} className="rounded-lg object-cover h-16 w-16" />
              <div className="flex flex-col items-start">
                {/* <div>Name: {item.name}</div>
               <div>Size: {formatBytes(item.size)}</div> */}
              </div>
            </div>
            <button onClick={() => handleRemoveImage(index)}>
              <IoTrashOutline className="text-red-500 text-lg" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
