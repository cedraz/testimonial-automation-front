import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';

interface ISubscriptionContextState {
  adminId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  setAdminId: Dispatch<SetStateAction<string>>;
  setStripeCustomerId: Dispatch<SetStateAction<string>>;
  setStripeSubscriptionId: Dispatch<SetStateAction<string>>;
}

export const SubscriptionContext = createContext<ISubscriptionContextState>(
  {} as ISubscriptionContextState
);

export function SubscriptionProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [adminId, setAdminId] = useState<string>('');
  const [stripeCustomerId, setStripeCustomerId] = useState<string>('');
  const [stripeSubscriptionId, setStripeSubscriptionId] = useState<string>('');

  return (
    <SubscriptionContext.Provider
      value={{
        adminId,
        stripeCustomerId,
        stripeSubscriptionId,
        setAdminId,
        setStripeCustomerId,
        setStripeSubscriptionId
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export const useSubscription = () => useContext(SubscriptionContext);
