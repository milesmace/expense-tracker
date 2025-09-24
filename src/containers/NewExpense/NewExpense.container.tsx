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
import { createExpense } from '@/lib/app';
import { cn } from '@/lib/utils';
import { useAccountsStore, useCategoryStore } from '@/store';

const newExpenseFormSchema = z.object({
  expenseName: z.string().min(3, {
    message: 'Expense name must be at least 3 characters.',
  }),
  expenseDate: z
    .date({ message: 'Please provide a date of expense' })
    .max(new Date(), {
      message: 'Cannot create an expense with a future date.',
    }),
  expenseAmount: z
    .number()
    .min(0.01, { message: 'Amount must be greater than 0' }),
  expenseCategory: z.number({ message: 'Please provide a valid category' }),
  expenseFromAccount: z.number({
    message: 'Please provide a valid from account',
  }),
  expenseDescription: z.string().optional(),
});

type NewExpenseFormType = z.infer<typeof newExpenseFormSchema>;

export const NewExpenseContainer: FC = () => {
  const form = useForm<NewExpenseFormType>({
    resolver: zodResolver(newExpenseFormSchema),
    defaultValues: {
      expenseName: '',
      expenseDate: undefined,
      expenseAmount: undefined,
      expenseDescription: '',
      expenseCategory: undefined,
      expenseFromAccount: undefined,
    },
  });
  const { accounts, isLoading: isAccountsLoading } = useAccountsStore();
  const { categories, isLoading: isCategoriesLoading } = useCategoryStore();

  const onSubmit = async (data: NewExpenseFormType) => {
    await createExpense({
      name: data.expenseName,
      amount: data.expenseAmount,
      category: data.expenseCategory,
      from_account: data.expenseFromAccount,
    });
  };

  return (
    <div className="my-12">
      <h1 className="mb-8 text-2xl font-bold">New Expense</h1>

      <Form {...form}>
        <form
          className="flex flex-col gap-12"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="expenseName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Daily Commute..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expenseAmount"
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
                name="expenseDate"
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
                name="expenseCategory"
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
                              {Object.entries(categories)
                                .filter(
                                  ([_, category]) =>
                                    category.type === 'expense',
                                )
                                .map(([_, category]) => (
                                  <CommandItem
                                    key={category.id}
                                    value={String(category.id)}
                                    className="cursor-pointer"
                                    onSelect={() =>
                                      form.setValue(
                                        'expenseCategory',
                                        category.id,
                                      )
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
                name="expenseFromAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Account</FormLabel>
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
                                  value={String(account.id)}
                                  className="cursor-pointer"
                                  onSelect={() =>
                                    form.setValue(
                                      'expenseFromAccount',
                                      account.id,
                                    )
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
              name="expenseDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Their service was very luxury..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="cursor-pointer">
            Add Expense
          </Button>
        </form>
      </Form>
    </div>
  );
};
