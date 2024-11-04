// next-i18next.config.ts
import path from "path";

const nextI18NextConfig = {
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "en",
    localePath: path.resolve("./public/locales"),
  },
};

export default nextI18NextConfig;
