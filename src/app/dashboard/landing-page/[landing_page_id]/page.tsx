import { TestimonialConfigTab } from '@/components/dashboard/testimonial-config-tab/testimonial-config-tab';
import { TestimonialsTable } from '@/components/dashboard/testimonials-table/testimonials-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getLandingPage } from './actions';

export default async function LandingPageData({
  params
}: {
  params: Promise<{ landing_page_id: string }>;
}) {
  const { landing_page_id } = await params;

  const landing_page = await getLandingPage({ landing_page_id });

  return (
    <Tabs defaultValue="testimonials" className="h-full flex flex-col">
      <div className="flex items-center overflow-auto">
        <TabsList>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="testimonial-configs">
            Testimonial Configs
          </TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="testimonials" className="h-full">
        <TestimonialsTable landing_page_id={landing_page_id} />
      </TabsContent>
      <TabsContent value="testimonial-configs" className="h-full">
        <TestimonialConfigTab
          testimonial_config={landing_page.testimonial_config}
        />
      </TabsContent>
      <TabsContent value="metrics" className="h-full">
        <div>metrics</div>
      </TabsContent>
    </Tabs>
  );
}
