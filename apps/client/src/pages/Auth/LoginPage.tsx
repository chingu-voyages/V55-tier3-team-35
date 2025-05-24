import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import piggybank from '../../assets/piggybank.jpg';
import { loginSchema, type LoginSchema } from '../../lib/schema';

import { Button } from '@/components/ui/button';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex bg-[#0F0F0F] overflow-x-hidden">
      <div className="w-full md:w-1/3 min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-6 md:p-10">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8 md:mb-12">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl md:text-4xl">🚀</span>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-black">
                FinTrack
              </h1>
              <p className="text-xs md:text-sm text-gray-600">
                Your Personal Financial Tracker
              </p>
            </div>
          </div>

          <div className="space-y-6 md:space-y-10">
            <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-black text-center">
              Login
            </h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <div className="flex flex-col gap-1.5 md:gap-2">
                <label htmlFor="username" className="text-sm text-gray-600">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  {...register('username')}
                  className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md
                    focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                    transition-all duration-200"
                  placeholder="Enter your username"
                />
                {errors.username && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5 md:gap-2">
                <label htmlFor="password" className="text-sm text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register('password')}
                  className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md
                    focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                    transition-all duration-200"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-xs text-gray-600"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="/forgot-password"
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full py-2.5 md:py-3 mt-2 md:mt-4
                  bg-indigo-600 hover:bg-indigo-700 
                  text-white font-medium rounded-md
                  transition-colors duration-200 shadow-sm"
              >
                Login
              </Button>

              <div className="text-center mt-4 md:mt-6">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <a
                    href="/register"
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="md:block hidden w-2/3 h-screen bg-white">
        <img
          className="w-full h-screen object-cover"
          src={piggybank}
          alt="Financial tracking illustration"
          loading="eager"
        />
      </div>
    </div>
  );
};

export default LoginPage;
