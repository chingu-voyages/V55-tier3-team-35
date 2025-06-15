import {
  Plus,
  Search,
  Filter,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';

import TransactionPageSkeleton from '@/components/skeleton/transactionSkeleton';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import TransactionFormModal from '@/components/ui/transactions/TransactionFormModal';
import type { Transaction } from '@/schemas/transactionFormSchema';
import { useAuthStore } from '@/stores/authStores';
import { useCategoryStore } from '@/stores/categoryStore';
import { useTransactionStore } from '@/stores/transactionStore';

import { Input } from '@/components/ui/input';

type SortField = 'name' | 'amount' | 'transaction_date';
type SortOrder = 'asc' | 'desc';

interface FilterState {
  searchTerm: string;
  transactionType: 'all' | '1' | '2'; // all, income, expense
  categoryId: 'all' | string;
  dateRange: 'all' | '7days' | '30days' | '90days';
}

const TransactionPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<
    Transaction | undefined
  >();

  // Filtering state
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    transactionType: 'all',
    categoryId: 'all',
    dateRange: 'all',
  });

  // Sorting state
  const [sortField, setSortField] = useState<SortField>('transaction_date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { fetchCategories, isLoadingCategories, categories } =
    useCategoryStore();
  const { transactions, isLoadingTransactions, fetchTransactions } =
    useTransactionStore();

  useEffect(() => {
    fetchCategories();
    fetchTransactions();
  }, [fetchCategories, fetchTransactions]);

  // Filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Apply search filter
    if (filters.searchTerm) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.name
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
          transaction.notes
            ?.toLowerCase()
            .includes(filters.searchTerm.toLowerCase()),
      );
    }

    // Apply transaction type filter
    if (filters.transactionType !== 'all') {
      filtered = filtered.filter(
        (transaction) =>
          transaction.transaction_type_id.toString() ===
          filters.transactionType,
      );
    }

    // Apply category filter
    if (filters.categoryId !== 'all') {
      filtered = filtered.filter(
        (transaction) =>
          transaction.category_id.toString() === filters.categoryId,
      );
    }

    // Apply date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const daysAgo = {
        '7days': 7,
        '30days': 30,
        '90days': 90,
      }[filters.dateRange];

      if (daysAgo) {
        const cutoffDate = new Date(
          now.getTime() - daysAgo * 24 * 60 * 60 * 1000,
        );
        filtered = filtered.filter(
          (transaction) => new Date(transaction.transaction_date) >= cutoffDate,
        );
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue;
      let bValue;

      switch (sortField) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'amount':
          aValue = parseFloat(a.amount);
          bValue = parseFloat(b.amount);
          break;
        case 'transaction_date':
          aValue = new Date(a.transaction_date);
          bValue = new Date(b.transaction_date);
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [transactions, filters, sortField, sortOrder]);

  // Pagination calculations
  const totalPages = Math.ceil(
    filteredAndSortedTransactions.length / itemsPerPage,
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredAndSortedTransactions.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      transactionType: 'all',
      categoryId: 'all',
      dateRange: 'all',
    });
  };

  const handleOpenCreateModal = () => {
    setIsModalOpen(true);
    setEditingTransaction(undefined);
  };

  const handleOpenEditModal = (transaction: Transaction) => {
    setIsModalOpen(true);
    setEditingTransaction(transaction);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(undefined);
  };

  const handleTransactionSuccess = () => {
    fetchTransactions();
  };

  const { isLoading, isAuthenticated } = useAuthStore();
  const loading = isLoadingCategories || isLoadingTransactions || isLoading;

  if (loading) {
    return <TransactionPageSkeleton />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? (
      <ChevronUp className="w-4 h-4 inline ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 inline ml-1" />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
            <Button
              onClick={handleOpenCreateModal}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 
                text-white font-medium rounded-md transition-colors duration-200
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              Add Transaction
            </Button>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="ml-auto"
              >
                Clear Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search transactions..."
                  value={filters.searchTerm}
                  onChange={(e) =>
                    handleFilterChange('searchTerm', e.target.value)
                  }
                  className="pl-10"
                />
              </div>

              {/* Transaction Type */}
              <Select
                value={filters.transactionType}
                onValueChange={(value) =>
                  handleFilterChange('transactionType', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Transaction Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="1">Income</SelectItem>
                  <SelectItem value="2">Expense</SelectItem>
                </SelectContent>
              </Select>

              {/* Category */}
              <Select
                value={filters.categoryId}
                onValueChange={(value) =>
                  handleFilterChange('categoryId', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Date Range */}
              <Select
                value={filters.dateRange}
                onValueChange={(value) =>
                  handleFilterChange('dateRange', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Transaction List */}
        <div className="bg-white rounded-lg shadow">
          {filteredAndSortedTransactions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg mb-2">No transactions found</p>
              <p className="text-sm">
                Try adjusting your filters or add a new transaction
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('name')}
                      >
                        Name <SortIcon field="name" />
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('amount')}
                      >
                        Amount <SortIcon field="amount" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('transaction_date')}
                      >
                        Date <SortIcon field="transaction_date" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${parseFloat(transaction.amount).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              transaction.transaction_type_id === 1
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {transaction.transaction_type_id === 1
                              ? 'Income'
                              : 'Expense'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(
                            transaction.transaction_date,
                          ).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleOpenEditModal(transaction)}
                            className="text-indigo-600 hover:text-indigo-900 transition-colors"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">
                        Items per page:
                      </span>
                      <Select
                        value={itemsPerPage.toString()}
                        onValueChange={(value) =>
                          setItemsPerPage(Number(value))
                        }
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="25">25</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">
                        Page {currentPage} of {totalPages}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage(Math.max(1, currentPage - 1))
                          }
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage(
                              Math.min(totalPages, currentPage + 1),
                            )
                          }
                          disabled={currentPage === totalPages}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        {/* Results Summary */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {paginatedTransactions.length} of{' '}
          {filteredAndSortedTransactions.length} transactions
        </div>

        {/* Transaction Form Modal */}
        <TransactionFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          existingTransaction={editingTransaction}
          onSuccess={handleTransactionSuccess}
        />
      </div>
    </div>
  );
};

export default TransactionPage;
