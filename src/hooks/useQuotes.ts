import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchQuotes, createQuote, deleteQuote, type Quote } from '../api/quoteApi';

export const useQuotes = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<Quote[], Error>({
    queryKey: ['quotes'],
    queryFn: fetchQuotes,
  });

  const createMutation = useMutation({
    mutationFn: createQuote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    },
    onError: (err) => {
      console.error("Mutation failed", err);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteQuote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    },
  });

  return {
    data,
    isLoading,
    error,
    createQuote: createMutation.mutate,
    deleteQuote: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
