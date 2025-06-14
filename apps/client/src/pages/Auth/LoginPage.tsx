import { Eye, EyeOff, Target, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Spinner from '@/components/general/spinner';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStores';
import { type AxioError } from '@/types/stores.d';

import styles from '../landing/LandingPage.module.css';

type LoginFormData = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { authLogin } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/overview';

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { register, handleSubmit } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await authLogin(data);
      if (response.user.defaultCurrencyId) {
        navigate(from);
      } else {
        navigate('/user-details');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage =
          (error as AxioError).response?.data?.message ||
          error.message ||
          'An unexpected error occurred.';
        setError(errorMessage);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${styles.landingRoot}`}>
      <div className="starry-bg min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 md:p-10">
          <div className="flex items-center space-x-3 mb-8 md:mb-12">
            <div className="flex items-center justify-center">
              <Link to="/">
                <ChevronLeft className="w-8 h-8 text-black" />
              </Link>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-lg flex items-center justify-center ml-2">
              <Target className="w-8 h-8 text-white" />
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
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit)(e);
              }}
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
                  transition-all duration-200 placeholder:text-gray-400 
                  text-black"
                  placeholder="Enter your username"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:gap-2">
                <label htmlFor="password" className="text-sm text-gray-600">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    {...register('password')}
                    className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md
                    focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                    transition-all duration-200 placeholder:text-gray-400 text-black"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 md:py-3 mt-2 md:mt-4
                bg-indigo-600 hover:bg-indigo-700 
                text-white font-medium rounded-md
                transition-colors duration-200 shadow-sm
                disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading && <Spinner></Spinner>}
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>

              <div className="text-center mt-4 md:mt-6">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="text-indigo-600 hover:text-black-700 font-medium"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
