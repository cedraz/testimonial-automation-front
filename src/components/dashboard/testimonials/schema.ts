export enum TestimonialStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export type TTestimonial = {
  id: string;
  status: TestimonialStatus;
  customer_name: string;
  title: string;
  message: string;
  stars: number;
  created_at: Date;
  updated_at: Date;
  landing_page_id: string;
  image: string;
};
