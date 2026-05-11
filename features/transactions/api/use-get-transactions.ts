import { useQuery } from '@tanstack/react-query';


import { convertAmountFromMiliunits } from '@/lib/utils';

export const useGetTransactions = () => {

  // const from = params.get('from') || '';
  // const to = params.get('to') || '';
  // const accountId = params.get('accountId') || '';
  // console.log('use get transactions', { from, to, accountId });
  const query = useQuery({
    // queryKey: ['transactions', { from, to, accountId }],
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await fetch('/api/transactions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // queryFn: async () => {
      // const response = await client.api.transactions.$get();
      // {
      //   query: {
      //     from,
      //     to,
      //     accountId
      //   }
      // });

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const { data } = await response.json();
      // console.log('use get transactions data', data);
      return data.map((transaction: any) => ({
        ...transaction,
        amount: convertAmountFromMiliunits(transaction.amount)
      }));
    }
  });

  return query;
};
