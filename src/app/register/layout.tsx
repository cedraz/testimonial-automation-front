import Providers from './subscription-provider';

export default async function RegisterLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <Providers>{children}</Providers>;
}
