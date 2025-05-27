import { Target, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import styles from '../landing/LandingPage.module.css';

import { Button } from '@/components/ui/button';
import { type UserDetailsForm } from '@/lib/schema';
import { useAuthStore } from '@/stores/authStores';
import { type AxioError } from '@/types/stores.d';

const UserDetailsPage = () => {
  const [error, setError] = useState<string | null>(null);
  const { isLoading, saveUserDetails } = useAuthStore();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<UserDetailsForm>();

  const onSubmit = async (data: UserDetailsForm) => {
    try {
      setError(null);
      const response = await saveUserDetails(data);
      console.log('######RESPONSE########################', response);
      if (response !== null) {
        navigate('/Home');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage =
          (error as AxioError).response?.data?.message ||
          error.message ||
          'An unexpected error occurred.';
        setError(errorMessage);
      }
      throw error;
    }
  };

  return (
    <div className={`min-h-screen ${styles.landingRoot}`}>
      <div className="starry-bg min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 md:p-10">
          <div className="flex items-center space-x-3 mb-8 md:mb-12">
            <div className="flex items-center justify-center">
              <a href="/">
                <ChevronLeft className="w-8 h-8 text-black" />
              </a>
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
              User Details
            </h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <div className="flex flex-col gap-1.5 md:gap-2">
                <label htmlFor="username" className="text-sm text-gray-600">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register('firstName')}
                  className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md
                  focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  transition-all duration-200 placeholder:text-gray-400 
                  text-black"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="flex flex-col gap-1.5 md:gap-2">
                <label htmlFor="username" className="text-sm text-gray-600">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register('lastName')}
                  className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md
                  focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  transition-all duration-200 placeholder:text-gray-400 
                  text-black"
                  placeholder="Enter your last name"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:gap-2">
                <label
                  htmlFor="default_currency"
                  className="text-sm text-gray-600"
                >
                  Currency
                </label>
                <select
                  id="default_currency"
                  {...register('default_currency')}
                  className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md
                  focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  transition-all duration-200 placeholder:text-gray-400 
                  text-black"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="INR">INR</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5 md:gap-2">
                <label
                  htmlFor="default_currency"
                  className="text-sm text-gray-600"
                >
                  Monthly Budget
                </label>
                <input
                  type="number"
                  id="monthly_budget"
                  {...register('monthly_budget')}
                  className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md
                  focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  transition-all duration-200 placeholder:text-gray-400 
                  text-black"
                  placeholder="Enter your monthly budget"
                />
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
                {isLoading ? 'Saving...' : 'Save Details'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
