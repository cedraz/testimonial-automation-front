export type TTestimonialConfig = {
  id: string;
  format: TestimonialFormat;
  title_char_limit: number;
  message_char_limit: number;
  expiration_limit: number;
  created_at: string;
  updated_at: string;
  admin_id: string;
};

export enum TestimonialFormat {
  SLIDER = 'SLIDER',
  GRID = 'GRID'
}
