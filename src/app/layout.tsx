import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sooner } from '@/components/ui/sonner';
import './globals.css';

export const metadata = {
  title: 'Testimonial Automation',
  description:
    'Testimonial Automation is a platform that helps you collect and display testimonials from your customers.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">
        <Toaster />
        <Sooner />
        {children}
      </body>
    </html>
  );
}
