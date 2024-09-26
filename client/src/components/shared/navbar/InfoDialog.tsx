import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


export function DialogInfoApp() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="fixed z-10 mx-auto ml-2 mt-2 flex rounded-sm border-blue-200/80 bg-slate-800/80 text-xl font-semibold text-blue-200/80 hover:border-blue-100/90 hover:text-blue-100/90 sm:px-4 md:text-2xl" variant="outline">INFORMATIONS</Button>
      </DialogTrigger>
      <DialogContent className="h-8/12 scrollbar-none inset-y-[1%] mx-auto mb-0 mt-6 w-full max-w-xl translate-y-[-2%] bg-slate-800/80 px-8 pb-6 pt-0 max-md:w-11/12">
        <DialogFooter className="my-0 pb-0 ">
          <div className="mb-2 mt-10 items-center space-x-2">
            <div className="grid flex-1 gap-2 leading-5 text-blue-50 blur-none">
              <DialogTitle className="text-green-500">
                <h2>An application for managing an apartment complex.</h2>
              </DialogTitle>
              <h4>● Allows you to register users as tenants or technicians.</h4>
              <h4>● Activate accounts using emails sent.</h4>
              <h4>
                ● Ability to rate individual people and report failures and
                complaints.
              </h4>
              <h4>
                ● In the case of technicians, there is an option to rate
                individual person.
              </h4>
              <h4>
                ● In the case of tenants, there is an option to report
                complaints about their behavior.
              </h4>
              <h4>
                ● In addition, opinions and posts can be posted on a dedicated
                blog.
              </h4>

              <DialogTitle className="mt-4 text-green-500">
                <h2>
                  Below are the tools and technologies used in this project.
                </h2>
              </DialogTitle>
              <h4>● React with Next.js as the user interface library.</h4>
              <h4>● TypeScript as the frontend code</h4>
              <h4>● CDN as the shared user interface</h4>
              <h4>● Tailwind CSS used to style interface components.</h4>
              <h4>
                ● Redux and Redux Toolkit with RTK query used to manage state.
              </h4>
              <h4>● Zod for schema validation using static inference.</h4>
              <h4>● Justify used for text messages.</h4>
              <h4>● Django with Django restframework used as backend.</h4>
              <h4>● MailPit used for testing email sending in development.</h4>
              <h4>● Mailersend used for email sending in production.</h4>
              <h4>● Nginx used for reverse proxy and load balancer.</h4>
              <h4>
                ● Portainer used as container management software in production.{" "}
              </h4>

              <a
                href="https://portainer.kreative-apartments.pro/"
                target="_blank"
              >
                https://portainer.kreative-apartments.pro/
              </a>
              <h4>
                ● Celery used with Redis for asynchronous tasks including
                sending emails.
              </h4>
              <h4>
                ● Flower used for monitoring and administering Celery clusters.
              </h4>
              <h5>https://flower.kreative-apartments.pro/</h5>
              <h4>● Redis used as message broker and results backend. </h4>
              <h4>● drf-yasg used for creating API documentation</h4>
              <h5> https://kreative-apartments.pro/redoc/</h5>
              <h4>● Cloudinary used as image upload service.</h4>
              <h4>● DigitalOcean servers used in production.</h4>
              <h4>● Docker used to create containers.</h4>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}