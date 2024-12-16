import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { TTestimonialConfig } from '../testimonial-configs-table/schemas';
import { Calendar, CalendarClock, Hash, Shapes } from 'lucide-react';
import { formatDate, getDiference } from '@/utils/date-utils';
import { UpdateTestimonialConfigDialog } from './update-testimonial-config-dialog';

export type TTestimonialConfigProps = {
  testimonial_config: TTestimonialConfig;
};

export async function TestimonialConfigTab({
  testimonial_config
}: TTestimonialConfigProps) {
  console.log(testimonial_config);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-3">
          <CardTitle>Testimonial Config</CardTitle>
          <CardDescription>
            Manage your landing page&apos;s testimonial config
          </CardDescription>
        </div>
        <UpdateTestimonialConfigDialog
          expiration_limit={testimonial_config.expiration_limit}
          message_char_limit={testimonial_config.message_char_limit}
          title_char_limit={testimonial_config.title_char_limit}
          format={testimonial_config.format}
          id={testimonial_config.id}
          name={testimonial_config.name}
        />
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="min-h-[138px] flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Title Char Limit
            </CardTitle>
            <Hash className="text-[#949494] w-5" />
          </CardHeader>
          <CardContent className="flex flex-row items-end justify-between">
            <div className="text-2xl font-bold">
              {testimonial_config.title_char_limit}
            </div>
          </CardContent>
        </Card>
        <Card className="min-h-[138px] flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Message Char Limit
            </CardTitle>
            <Hash className="text-[#949494] w-5" />
          </CardHeader>
          <CardContent className="flex flex-row items-end justify-between">
            <div className="text-2xl font-bold">
              {testimonial_config.message_char_limit}
            </div>
          </CardContent>
        </Card>
        <Card className="min-h-[138px] flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Expiration Limit (in days)
            </CardTitle>
            <CalendarClock className="text-[#949494] w-5" />
          </CardHeader>
          <CardContent className="flex flex-row items-end justify-between">
            <div className="text-2xl font-bold">
              {testimonial_config.expiration_limit}
            </div>
          </CardContent>
        </Card>
        <Card className="min-h-[138px] flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Format</CardTitle>
            <Shapes className="text-[#949494] w-5" />
          </CardHeader>
          <CardContent className="flex flex-row items-end justify-between">
            <div className="text-2xl font-bold">
              {testimonial_config.format.charAt(0) +
                testimonial_config.format.slice(1).toLowerCase()}
            </div>
          </CardContent>
        </Card>
        <Card className="min-h-[138px] flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Created at</CardTitle>
            <Calendar className="text-[#949494] w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatDate(testimonial_config.created_at)}
            </div>
            <div className="flex gap-2">
              <p className="text-xs text-muted-foreground flex flex-col">
                {getDiference(testimonial_config.created_at).differenceInDays}{' '}
                Day(s) and{' '}
                {getDiference(testimonial_config.created_at).differenceInHours}{' '}
                Hour(s)
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="min-h-[138px] flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Updated at</CardTitle>
            <Calendar className="text-[#949494] w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatDate(testimonial_config.updated_at)}
            </div>
            <div className="flex gap-2">
              <p className="text-xs text-muted-foreground flex flex-col">
                {getDiference(testimonial_config.updated_at).differenceInDays}{' '}
                Day(s) and{' '}
                {getDiference(testimonial_config.updated_at).differenceInHours}{' '}
                Hour(s)
              </p>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
