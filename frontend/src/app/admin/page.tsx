import AdminLoginForm from "@/components/Admin/Admin Login Form/page";
import Image from "next/image";

const Page = () => {
  return (
    <div className="relative w-full h-[720px] bg-black"> 
      <div className="relative w-full h-full"> 
        <Image
          src="/empty-auditorium-awaiting-big-performance-ahead-generated-by-ai.jpg"
          alt="Home Banner"
          layout="fill" 
          objectFit="cover" 
          quality={75} 
          style={{ opacity: 0.5 }} 
          priority 
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default Page;
