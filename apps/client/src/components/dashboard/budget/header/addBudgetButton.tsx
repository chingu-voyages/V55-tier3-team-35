// import { PlusCircle } from 'lucide-react';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';

// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// // eslint-disable-next-line import/order
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

// import {
//   THEME_OPTIONS,
//   CATEGORY_OPTIONS,
//   FORM_VALIDATION,
// } from '@/constants/budgetOptions';
// import { useBudgetStore } from '@/stores/budgetStore';
// import type { BudgetFormData } from '@/types/budget.types';

// const AddBudgetButton: React.FC = () => {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const { addBudget, isLoading, clearError } = useBudgetStore();

//   const form = useForm<BudgetFormData>({
//     defaultValues: {
//       category: '',
//       maximum: '',
//       theme: '',
//     },
//   });

//   const onSubmit = async (data: BudgetFormData) => {
//     try {
//       await addBudget(data);
//       setIsDialogOpen(false);
//       form.reset();
//     } catch (error) {
//       console.error('Failed to add budget:', error);
//     }
//   };

//   const handleDialogChange = (open: boolean) => {
//     setIsDialogOpen(open);
//     if (open) {
//       clearError();
//       form.reset();
//     }
//   };

//   return (
//     <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
//       <DialogTrigger asChild>
//         <Button className="bg-Gray-900 hover:bg-Gray-900/90 text-white rounded-lg p-[16px] flex items-center gap-2">
//           <PlusCircle className="w-4 h-4" />
//           Add New Budget
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-md bg-white">
//         <DialogHeader>
//           <DialogTitle className="text-xl font-bold text-Gray-900 mb-2">
//             Add New Budget
//           </DialogTitle>
//           <DialogDescription className="text-sm text-Gray-500 mb-2">
//             Create a new budget to track your spending in a specific category.
//           </DialogDescription>
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               control={form.control}
//               name="category"
//               rules={FORM_VALIDATION.category}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-sm font-medium text-Gray-500">
//                     Budget Category
//                   </FormLabel>
//                   <FormControl>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <SelectTrigger className="w-full border border-Gray-500 rounded-lg">
//                         <SelectValue placeholder="e.g. Entertainment" />
//                       </SelectTrigger>
//                       <SelectContent className="bg-white border border-Gray-500">
//                         {CATEGORY_OPTIONS.map((category) => (
//                           <SelectItem
//                             key={category.value}
//                             value={category.value}
//                           >
//                             {category.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="maximum"
//               rules={FORM_VALIDATION.maximum}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-sm font-medium text-Gray-500">
//                     Maximum Spend
//                   </FormLabel>
//                   <FormControl>
//                     <div className="relative">
//                       <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-Gray-500">
//                         $
//                       </span>
//                       <input
//                         {...field}
//                         type="number"
//                         step="0.01"
//                         min="0.01"
//                         placeholder="e.g. 2000"
//                         className="w-full pl-8 pr-4 py-2 border border-Gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-Green"
//                       />
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="theme"
//               rules={FORM_VALIDATION.theme}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-sm font-medium text-Gray-500">
//                     Theme
//                   </FormLabel>
//                   <FormControl>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <SelectTrigger className="w-full border border-Gray-500 rounded-lg">
//                         <SelectValue placeholder="Pick a theme" />
//                       </SelectTrigger>
//                       <SelectContent className="bg-white border border-Gray-500">
//                         {THEME_OPTIONS.map((theme) => (
//                           <SelectItem key={theme.value} value={theme.value}>
//                             <div className="flex items-center gap-2">
//                               <div
//                                 className={`w-4 h-4 rounded-full ${theme.colorClass}`}
//                               />
//                               {theme.label}
//                             </div>
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-Gray-900 hover:bg-Gray-900/90 text-white rounded-lg py-3 disabled:opacity-50 cursor-pointer"
//             >
//               {isLoading ? 'Adding Budget...' : 'Add Budget'}
//             </Button>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AddBudgetButton;

import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

import { BudgetDialog } from '../budgetDialog';

import { Button } from '@/components/ui/button';

const AddBudgetButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <BudgetDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button
          className="bg-Gray-900 hover:bg-Gray-900/90 text-white rounded-lg py-3 px-4 flex gap-2"
          onClick={() => setOpen(true)}
        >
          <PlusCircle className="w-4 h-4" />
          Add New Budget
        </Button>
      }
    />
  );
};

export default AddBudgetButton;
