"use client";

import { CldUploadWidget } from "next-cloudinary";

type CloudinaryUploadButtonProps = {
  onUploaded: (secureUrl: string) => void;
  className?: string;
  label?: string;
};

export default function CloudinaryUploadButton({
  onUploaded,
  className,
  label = "Upload to Cloudinary",
}: CloudinaryUploadButtonProps) {
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={(result: any) => {
        const secureUrl = result?.info?.secure_url;
        if (secureUrl) {
          onUploaded(secureUrl);
        }
      }}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open()}
          className={
            className ||
            "w-full rounded-2xl border-2 border-dashed border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
          }
        >
          {label}
        </button>
      )}
    </CldUploadWidget>
  );
}
