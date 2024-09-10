import AdminLoginForm from "@/components/Admin/Admin Login Form/page";
import Image from "next/image";

const Page = () => {
  return (
    <div className="relative w-full h-[720px] bg-black"> {/* Explicit height added */}
      <div className="relative w-full h-full"> {/* Container for the Image */}
        <Image
          src="/empty-auditorium-awaiting-big-performance-ahead-generated-by-ai.jpg"
          alt="Home Banner"
          layout="fill" // Makes the image fill the container
          objectFit="cover" // Ensures the image covers the container, maintaining aspect ratio
          quality={75} // Optimize image quality
          style={{ opacity: 0.5 }} // Custom styles
          priority // Prioritize this image for loading
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default Page;
