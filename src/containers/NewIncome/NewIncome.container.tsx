import { type FC } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar1, ChevronsUpDownIcon } from 'lucide-react';
import { z } from 'zod';

import {
  Button,
  Calendar,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@/components/ui';
import { useNotify } from '@/hooks';
import { createIncome, getIncomeCategories } from '@/lib/app';
import { cn } from '@/lib/utils';
import { useAccountsStore, useCategoryStore } from '@/store';

const newIncomeFormSchema = z.object({
  incomeName: z.string().min(3, {
    message: 'Expense name must be at least 3 characters.',
  }),
  incomeDate: z
    .date({ message: 'Please provide a date of expense' })
    .max(new Date(), {
      message: 'Cannot create an expense with a future date.',
    }),
  incomeAmount: z
    .number()
    .min(0.01, { message: 'Amount must be greater than 0' }),
  incomeCategory: z.number({ message: 'Please provide a valid category' }),
  incomeToAccount: z.number({
    message: 'Please provide a valid to account',
  }),
  incomeDescription: z.string().optional(),
});

type NewIncomeFormType = z.infer<typeof newIncomeFormSchema>;

export const NewIncomeContainer: FC = () => {
  const form = useForm<NewIncomeFormType>({
    resolver: zodResolver(newIncomeFormSchema),
    defaultValues: {
      incomeName: '',
      incomeDate: undefined,
      incomeAmount: undefined,
      incomeDescription: '',
      incomeCategory: undefined,
      incomeToAccount: undefined,
    },
  });
  const { accounts, isLoading: isAccountsLoading } = useAccountsStore();
  const { categories, isLoading: isCategoriesLoading } = useCategoryStore();
  const notify = useNotify();

  const onSubmit = async (data: NewIncomeFormType) => {
    // Create the Income Record
    const { success } = await createIncome({
      name: data.incomeName,
      amount: data.incomeAmount,
      category: data.incomeCategory,
      to_account: data.incomeToAccount,
    });

    if (success) {
      // Show a success notification
      notify({
        title: 'Income Created Successfully',
        type: 'success',
      });

      // Reset the form
      form.reset();
    } else {
      notify({
        title: 'Cannot create Income',
        type: 'error',
      });
    }
  };

  return (
    <div className="my-12">
      <h1 className="mb-8 text-2xl font-bold">New Income</h1>

      <Form {...form}>
        <form
          className="flex flex-col gap-12"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="incomeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Company Salary..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="incomeAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-sm">
                        $
                      </span>
                      <Input
                        type="number"
                        placeholder="0.00"
                        step="0.01"
                        className="pl-6"
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value === '' ? undefined : parseFloat(value),
                          );
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="incomeDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="flex w-max min-w-50 cursor-pointer justify-between"
                          >
                            <span
                              className={cn(
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value
                                ? format(field.value, 'PPP')
                                : 'Pick a date'}
                            </span>

                            <Calendar1 />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="incomeCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex w-max min-w-60 justify-between gap-2"
                        >
                          <span
                            className={cn(
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {isCategoriesLoading
                              ? 'Loading categories...'
                              : field.value
                                ? (categories[field.value]?.name ??
                                  'Unknown category')
                                : 'Select a category'}
                          </span>
                          <ChevronsUpDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-max p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search categories..."
                            disabled={isCategoriesLoading}
                          />
                          <CommandList>
                            <CommandEmpty>No category found.</CommandEmpty>
                            <CommandGroup>
                              {Object.entries(
                                getIncomeCategories(Object.values(categories)),
                              ).map(([_, category]) => (
                                <CommandItem
                                  key={category.id}
                                  value={category.name.toLowerCase()}
                                  className="cursor-pointer"
                                  onSelect={() =>
                                    form.setValue('incomeCategory', category.id)
                                  }
                                >
                                  {category.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="incomeToAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To Account</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex w-max min-w-60 justify-between gap-2"
                        >
                          <span
                            className={cn(
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {isAccountsLoading
                              ? 'Loading accounts...'
                              : field.value
                                ? (accounts[field.value]?.name ??
                                  'Unknown account')
                                : 'Select a account'}
                          </span>
                          <ChevronsUpDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-max p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search accounts..."
                            disabled={isAccountsLoading}
                          />
                          <CommandList>
                            <CommandEmpty>No account found.</CommandEmpty>
                            <CommandGroup>
                              {Object.entries(accounts).map(([_, account]) => (
                                <CommandItem
                                  key={account.id}
                                  value={account.name.toLowerCase()}
                                  className="cursor-pointer"
                                  onSelect={() =>
                                    form.setValue('incomeToAccount', account.id)
                                  }
                                >
                                  {account.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="incomeDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Month start feels good with money..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="cursor-pointer">
            Add Income
          </Button>
        </form>
      </Form>
    </div>
  );
};
