import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import piggybank from '../../assets/piggybank.jpg';
import { registerSchema, type RegisterSchema } from '../../lib/schema';

import { Button } from '@/components/ui/button';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterSchema) => {
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
              <h1 className="text-lg md:text-xl font-bold">FinTrack</h1>
              <p className="text-xs md:text-sm text-gray-600">
                Your Personal Financial Tracker
              </p>
            </div>
          </div>

          <div className="space-y-6 md:space-y-10">
            <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-black text-center">
              Create an Account
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
                  placeholder="Create a password"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:gap-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm text-gray-600"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register('confirmPassword')}
                  className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md
                    focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                    transition-all duration-200"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full py-2.5 md:py-3 mt-2 md:mt-4
                  bg-indigo-600 hover:bg-indigo-700 
                  text-white font-medium rounded-md
                  transition-colors duration-200"
              >
                Register
              </Button>

              {/* Add login link */}
              <div className="text-center mt-4 md:mt-6">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <a
                    href="/login"
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Sign in
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

export default RegisterPage;
