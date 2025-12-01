import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

// Generic Type:
// - `TData` — serverdan qaytadigan ma'lumot turi
// - `TVariables` — so‘rovga yuboriladigan ma'lumot turi
// - `TError` — xato formati (standart `Error` qilib qo‘yilgan)
export const useCustomMutation = <TData = unknown, TVariables = unknown, TError = Error>(
  options: UseMutationOptions<TData, TError, TVariables>
): UseMutationResult<TData, TError, TVariables> => {
  return useMutation<TData, TError, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const response = await fetch(options?.mutationKey?.[0] as string, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(variables),
      });

      if (!response.ok) {
        const errorText = await response.text(); // `text/plain` formatida xato olish
        throw new Error(errorText);
      }

      return response.json() as Promise<TData>;
    },
    ...options, // Barcha qo‘shimcha `useMutation` opsiyalarini qo‘llash
  });
};
