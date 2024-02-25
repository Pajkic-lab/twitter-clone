import { QueryClient } from '@tanstack/react-query';

/**
 * queryClient is initiated here because it is shared across app, do to that fact it can not be sitting in App dir.
 */
export const queryClient = new QueryClient();
