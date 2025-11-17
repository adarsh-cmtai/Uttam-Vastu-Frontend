import { commonContent } from './common';
import { contactContent } from './contact';
import { siteVisitsContent } from './siteVisits';
import { joinUsContent } from './joinUs';
import { liveSessionsContent } from './liveSessions';
import { servicesContent } from './services';
import { aboutContent } from './about';
import { testimonialsContent } from './testimonials';
import { homeContent } from './home';

export const translations = {
  en: {
    ...commonContent.en,
    ...contactContent.en,
    ...siteVisitsContent.en,
    ...joinUsContent.en,
    ...liveSessionsContent.en,
    ...servicesContent.en,
    ...aboutContent.en,
    ...testimonialsContent.en,
    ...homeContent.en,
  },
  hi: {
    ...commonContent.hi,
    ...contactContent.hi,
    ...siteVisitsContent.hi,
    ...joinUsContent.hi,
    ...liveSessionsContent.hi,
    ...servicesContent.hi,
    ...aboutContent.hi,
    ...testimonialsContent.hi,
    ...homeContent.hi,
  },
};