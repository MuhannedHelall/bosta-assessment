"use client";

export default function Loader({ size = 40 }: { size?: number }) {
  return (
    <div className="h-[88vh] flex justify-center items-center py-16">
      <div
        className="border-4 border-gray-200 border-t-black rounded-full animate-spin"
        style={{
          width: size,
          height: size,
        }}
      />
    </div>
  );
}
