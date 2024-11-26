'use server';

type TCompleteTestimonial = {
  testimonial_id: string;
  formData: FormData;
};

export async function completeTestimonial({
  testimonial_id,
  formData
}: TCompleteTestimonial) {
  try {
    const api_url = process.env.API_URL;

    const response = await fetch(
      `${api_url}/testimonial/complete/${testimonial_id}`,
      {
        method: 'POST',
        body: formData
      }
    );

    const testimonial = await response.json();

    return testimonial;
  } catch (error) {
    console.error({
      date: new Date().toISOString(),
      error
    });
  }
}
