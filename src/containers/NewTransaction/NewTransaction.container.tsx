import { useCallback, type FC } from 'react';
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
import { createTransaction } from '@/lib/app';
import { cn } from '@/lib/utils';
import { useAccountsStore } from '@/store';

const newTransactionFormSchema = z.object({
  transactionName: z.string().min(3, {
    message: 'Transaction name must be at least 3 characters.',
  }),
  transactionDate: z
    .date({ message: 'Please provide a date of transaction' })
    .max(new Date(), {
      message: 'Cannot create an transaction with a future date.',
    }),
  transactionAmount: z
    .number()
    .min(0.01, { message: 'Amount must be greater than 0' }),
  transactionFromAccount: z.number({
    message: 'Please provide a valid from account',
  }),
  transactionToAccount: z.number({
    message: 'Please provide a valid to account',
  }),
  transactionDescription: z.string().optional(),
});

type NewTransactionFormType = z.infer<typeof newTransactionFormSchema>;

export const NewTransactionContainer: FC = () => {
  // Hooks
  const form = useForm<NewTransactionFormType>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      transactionName: '',
      transactionDate: undefined,
      transactionAmount: undefined,
      transactionDescription: '',
      transactionFromAccount: undefined,
      transactionToAccount: undefined,
    },
  });
  const { accounts, isLoading: isAccountsLoading } = useAccountsStore();
  const notify = useNotify();

  // Callbacks
  const onSubmit = useCallback(
    async (data: NewTransactionFormType) => {
      // Check if the from account & to account are the same
      if (data.transactionFromAccount === data.transactionToAccount) {
        notify({
          title: 'From Account & To Account should not be the same',
          type: 'error',
        });
        return;
      }

      // Create the Transaction Record
      const { success } = await createTransaction({
        name: data.transactionName,
        amount: data.transactionAmount,
        from_account: data.transactionFromAccount,
        to_account: data.transactionToAccount,
      });

      if (success) {
        // Show a success notification
        notify({
          title: 'Transaction created successfully',
          type: 'success',
        });

        // Reset the form
        form.reset();
      } else {
        notify({
          title: 'Cannot create Transaction',
          type: 'error',
        });
      }
    },
    [form, notify],
  );

  return (
    <div className="my-12">
      <h1 className="mb-8 text-2xl font-bold">New Transaction</h1>

      <Form {...form}>
        <form
          className="flex flex-col gap-12"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="transactionName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Cash withdrawl..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transactionAmount"
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
                        min={0}
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
                name="transactionDate"
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
                name="transactionFromAccount"
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
                                : 'Select an account'}
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
                                    form.setValue(
                                      'transactionFromAccount',
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

              <FormField
                control={form.control}
                name="transactionToAccount"
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
                                : 'Select an account'}
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
                                    form.setValue(
                                      'transactionToAccount',
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
              name="transactionDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Cash feels good..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="cursor-pointer">
            Add Transaction
          </Button>
        </form>
      </Form>
    </div>
  );
};
