import { headers } from 'next/headers';
import Image from 'next/image';
import LoginForm from "@/components/forms/LoginForm";


const LoginPage = () => {
  const header = headers();
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <div className="w-[870px] h-full">
            <Image
              alt="Login Illustration"
              fill
              src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </aside>

        {/* Form Section */}
        <main className="flex items-center justify-center px-8 py-8 lg:col-span-7 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome Back
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Please log in to access your account.
            </p>
            <LoginForm ip={ip} />
          </div>
        </main>
      </div>
    </section>
  );
};

export default LoginPage;
