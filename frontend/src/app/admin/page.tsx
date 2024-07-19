import AdminLoginForm from "@/components/Admin/Admin Login Form/page"

const Page = () => {
  return (
    <div className="relative w-full h-screen">
      <img src="heavy-paint-strokes-grunge-textures.jpg" alt="Home Banner" className="w-full h-screen object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
        <AdminLoginForm />
      </div>
    </div>
  );
}

export default Page;


