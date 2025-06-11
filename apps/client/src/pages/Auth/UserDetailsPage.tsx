import { zodResolver } from '@hookform/resolvers/zod';
import { Target, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { GET } from '@/api/api';
import { CURRENCY_ENDPOINTS } from '@/api/constants';
import { Button } from '@/components/ui/button';
import { userDetailsFormSchema, type UserDetailsForm } from '@/lib/schema';
import { useAuthStore } from '@/stores/authStores';
import { type AxioError, type Currency } from '@/types/stores.d';

import styles from '../landing/LandingPage.module.css';

const UserDetailsPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loadingCurrencies, setLoadingCurrencies] = useState(true);
  const { isLoading, saveUserDetails } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userDetailsFormSchema),
    defaultValues: {
      default_currency_id: '0',
    },
  });

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await GET(CURRENCY_ENDPOINTS.LIST);
        const currencyData = response.data || response;
        setCurrencies(currencyData);
      } catch (error) {
        console.error('Failed to fetch currencies:', error);
        setError('Failed to load currencies. Please refresh the page.');
      } finally {
        setLoadingCurrencies(false);
      }
    };

    fetchCurrencies();
  }, []);

  const onSubmit = async (data: UserDetailsForm) => {
    try {
      setError(null);
      const response = await saveUserDetails(data);
      if (response !== null) {
        navigate('/overview');
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
              <p className="text-sm md:text-sm text-gray-600">
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
                <label htmlFor="firstName" className="text-sm text-gray-600">
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
                {errors.firstName && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5 md:gap-2">
                <label htmlFor="lastName" className="text-sm text-gray-600">
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
                {errors.lastName && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.lastName.message}
                  </p>
                )}
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
                  {...register('default_currency_id')}
                  className="w-full p-2.5 md:p-3 border border-gray-300 rounded-md
                  focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  transition-all duration-200 placeholder:text-gray-400 
                  text-black"
                  disabled={loadingCurrencies}
                >
                  {loadingCurrencies ? (
                    <option value="">Loading currencies...</option>
                  ) : (
                    <>
                      <option value="">Select a currency</option>
                      {currencies.map((currency) => (
                        <option key={currency.id} value={currency.id}>
                          {currency.code} - {currency.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>

              {errors.default_currency_id && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.default_currency_id.message}
                </p>
              )}

              <Button
                type="submit"
                disabled={isLoading || loadingCurrencies}
                className="w-full py-2.5 md:py-3 mt-2 md:mt-4
                bg-indigo-600 hover:bg-indigo-700 
                text-white font-medium rounded-md
                transition-colors duration-200 shadow-sm
                disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : 'Save Details'}
              </Button>
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
