import { TestimonialsList } from '@/components/dashboard/testimonials/testimonials-list';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default async function LandingPageData({
  params
}: {
  params: Promise<{ landing_page_id: string }>;
}) {
  const { landing_page_id } = await params;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Testimonials</CardTitle>
        <CardDescription>view all your testimonials data</CardDescription>
      </CardHeader>
      <CardContent>
        <TestimonialsList landing_page_id={landing_page_id} />
      </CardContent>
    </Card>
  );
}
