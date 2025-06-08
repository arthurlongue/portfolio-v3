import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { TechStack } from "@/components/TechStack";
import { useTranslations } from 'next-intl';
import { locales } from '@/i18n-config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Home() {
  const t = useTranslations('Home');

  return (
    <Container>
      <span className="text-4xl">👋</span>
      <Heading className="font-black">{t('greeting')}</Heading>
      <Paragraph className="max-w-xl mt-4">
        {t.rich('intro1', {
          highlight: (chunks) => <Highlight>{chunks}</Highlight>
        })}
      </Paragraph>
      <Paragraph className="max-w-xl mt-4">
        {t.rich('intro2', {
          highlight: (chunks) => <Highlight>{chunks}</Highlight>
        })}
      </Paragraph>
      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
      >
        {t('workingOn')}
      </Heading>
      <Products />
      <TechStack />
    </Container>
  );
}
