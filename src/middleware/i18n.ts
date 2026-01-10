import { createMiddleware } from "@tanstack/react-start";
import { paraglideMiddleware } from "@/paraglide/server";

// Bu middleware "request" seviyesinde çalışır (SSR requestleri dahil)
export const i18nRequestMiddleware = createMiddleware().server(
  async ({ request, next, context }) => {
    const cleanRequest = new Request(request.url, {
      method: request.method,
      headers: new Headers(request.headers),
    });

    return paraglideMiddleware(cleanRequest, async ({ locale }) => {
      // ÖNEMLİ: next'e request pass edemezsin (senin aldığın TS hatası bu yüzden).
      // Start tarafında request'i "next({ request })" ile override etme yok.
      // Burada amaç: paraglideMiddleware scope'u içinde SSR devam etsin.

      // İstersen locale'ı Start context'e de koy:
      const safeContext = (context ?? {}) as Record<string, unknown>;
      return next({ context: { ...safeContext, locale } });
    });
  },
);
