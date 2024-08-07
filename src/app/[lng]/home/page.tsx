import { getDictionary } from "@/infrastructure/localization";
import { Locale } from "@/infrastructure/i18n.config";

interface IProps {
  params: { lng: Locale };
}

export default async function Home({ params: { lng } }: IProps) {
  const dict = await getDictionary(lng);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p>
          {dict.localeSwitcher.currentLocale}: {lng}
        </p>
        <p>
          {dict.localeSwitcher.description}: {dict.homePage.header}
        </p>
      </div>
    </main>
  );
}
