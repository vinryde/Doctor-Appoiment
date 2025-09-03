import { ScrollXCarousel,
  ScrollXCarouselContainer,
  ScrollXCarouselProgress,
  ScrollXCarouselWrap } from "@/components/scroll-x-carousel";
import {CardHoverReveal,
  CardHoverRevealContent,
  CardHoverRevealMain,} from '@/components/ui/reveal-on-hover'
import { Badge } from '@/components/ui/badge'
import ayurveda from '@/assets/ayurveda.jpg';
import diet from '@/assets/diet.jpg';
import herbal from '@/assets/herbal.jpg';
import detox from '@/assets/detox.jpg';
import mind from '@/assets/mind.jpg';
import women from '@/assets/women.png';
import care from '@/assets/care.jpg';
import oldage from '@/assets/oldage.png';
const SLIDES = [
  {
    id: 'slide-6',
    title: 'Ayurvedic Wellness Consultation',
    description:
      'Personalized online consultations with Dr. Kajal to assess your health, analyze your dosha, and create a tailored healing plan.',
    services: ['branding', 'design'],
    type: 'Agency',
    imageUrl:
      ayurveda,
  },
  {
    id: 'slide-2',
    title: 'Diet & Lifestyle Guidance',
    description:
      'Receive customized nutrition and lifestyle recommendations aligned with your unique body constitution (Prakriti) and current imbalances',
    services: ['branding', 'design', 'development'],
    type: 'blockchain',
    imageUrl:
      diet,
  },
  {
    id: 'slide-3',
    title: 'Herbal Remedies & Formulations',
    description:
      'Natural, plant-based solutions crafted from classical Ayurvedic wisdom to restore balance and promote long-term wellness.',
    services: ['branding', 'design', 'payment getaway', 'development'],
    type: 'ecommerce',
    imageUrl:
      herbal,
  },
  {
    id: 'slide-1',
    title: 'Detox & Rejuvenation (Rasayana)',
    description:
      'Gentle cleansing and rejuvenating practices to eliminate toxins, boost energy, and strengthen immunity.',
    services: ['branding', 'design', 'development'],
    type: 'SaaS',
    imageUrl:
      detox,
  },
  {
    id: 'slide-4',
    title: 'Mind-Body Balance Practices',
    description:
      'Integrating yoga, breathwork, meditation, mindfulness, and sleep hygiene to support emotional and mental well-being.',
    services: ['branding', 'design', 'development'],
    type: 'SaaS',
    imageUrl:
      mind,
  },
   {
    id: 'slide-5',
    title: 'Women’s Health Support',
    description:
      'Holistic care for menstrual health, fertility, prenatal & postnatal care, and menopause management.',
    services: ['branding', 'design', 'development'],
    type: 'SaaS',
    imageUrl:
      women,
  },
   {
    id: 'slide-7',
    title: 'Specialized Care for Chronic Conditions',
    description:
      'Ayurvedic support for digestive disorders, thyroid imbalance, arthritis, respiratory issues, allergies, neurological concerns, and more.',
    services: ['branding', 'design', 'development'],
    type: 'SaaS',
    imageUrl:
      care,
  },
   {
    id: 'slide-8',
    title: 'Geriatric Wellness',
    description:
      'Gentle Ayurvedic therapies and lifestyle practices designed to improve vitality, mobility, and quality of life for seniors.',
    services: ['branding', 'design', 'development'],
    type: 'SaaS',
    imageUrl:
      oldage,
  },
];
const Noise = () => {
  return (
    (<div
      className="absolute inset-0 w-full h-full scale-[1.2] transform opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
      style={{
        backgroundImage: "url(/noise.webp)",
        backgroundSize: "30%",
      }}></div>)
  );
};
export default function ServicesOne() {
  return (
    
    <ScrollXCarousel className="h-[350vh] ">
      
       <div className="flex mx-auto px-4 z-20 ">
                  <div className="text-center mb-16 md:mx-auto sm:ml-6">
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4 pt-8">
                      Ayurveechi Services
                    </h2>
                    <p className=" text-lg md:max-w-3xl sm:max-w-sm mx-auto text-gray-700">
                      Ayurveechi offers personalized Ayurvedic care to restore balance and vitality. From expert consultations to lifestyle guidance, herbal remedies, and rejuvenation therapies, our services are designed to support your unique health journey with nature’s wisdom.
                    </p>
                  </div>
                  </div>
       
      <ScrollXCarouselContainer className="h-dvh place-content-center flex flex-col gap-8 py-12 ">
                <div className=" " />
          <div className="" />

        <ScrollXCarouselWrap className="flex-4/5 flex space-x-8 [&>*:first-child]:ml-8">
          {SLIDES.map((slide) => (
            <CardHoverReveal
              key={slide.id}
              className="min-w-[80vw] md:min-w-[38vw] shadow-xl border xl:min-w-[30vw] rounded-xl"
            >
              <CardHoverRevealMain>
                <img
                  alt={slide.title}
                  src={slide.imageUrl.src}
                  className="size-full aspect-square object-cover"
                />
              </CardHoverRevealMain>
              <CardHoverRevealContent className="space-y-4 rounded-2xl bg-[rgba(0,0,0,.5)] backdrop-blur-3xl p-4">
               
                

                <div className="space-y-2 mt-2">
                  <h3 className="text-white capitalize font-medium">
                    {slide.title}
                  </h3>
                  <p className="text-white/80 text-sm">{slide.description}</p>
                </div>
              </CardHoverRevealContent>
            </CardHoverReveal>
          ))}
        </ScrollXCarouselWrap>
        <ScrollXCarouselProgress
          className="bg-secondary mx-8 h-1 rounded-full overflow-hidden"
          progressStyle="size-full bg-indigo-500/70 rounded-full"
        />
      </ScrollXCarouselContainer>
    </ScrollXCarousel>
  )
}
