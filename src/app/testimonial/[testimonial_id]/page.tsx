import { TestimonialForm } from '@/components/testimonial/TestimonialForm';
import { redirect } from 'next/navigation';

export default async function Testimonial({
  params
}: {
  params: Promise<{ testimonial_id: string }>;
}) {
  const { testimonial_id } = await params;

  if (!testimonial_id) {
    redirect('/404');
  }

  return (
    <section className="min-h-screen w-full flex justify-center items-center">
      <TestimonialForm testimonial_id={testimonial_id} />
    </section>
  );
}
