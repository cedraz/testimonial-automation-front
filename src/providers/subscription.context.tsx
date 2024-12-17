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
  const [adminId, setAdminId] = useState<string>(
    '8e3529cd-b496-4811-880c-7735c3585d43'
  );
  const [stripeCustomerId, setStripeCustomerId] =
    useState<string>('cus_RPHSA0iK6CUrmG');
  const [stripeSubscriptionId, setStripeSubscriptionId] = useState<string>(
    'sub_1QWpf3GVcUD1lSnnJHlMbdhK'
  );

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
