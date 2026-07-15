/**
 * Analytics Scripts Component
 *
 * Injects GA4, Microsoft Clarity, and Google Search Console verification.
 * Environment variables control which analytics are enabled:
 *   - VITE_GA4_ID           → Google Analytics 4 Measurement ID (e.g. G-XXXXXXXXXX)
 *   - VITE_CLARITY_ID       → Microsoft Clarity Project ID
 *   - VITE_GSC_VERIFICATION → Google Search Console HTML tag verification code
 *   - VITE_BING_VERIFICATION → Bing Webmaster verification code
 */
export function AnalyticsScripts() {
  const ga4Id = import.meta.env.VITE_GA4_ID || "";
  const clarityId = import.meta.env.VITE_CLARITY_ID || "";

  return (
    <>
      {/* Google Analytics 4 */}
      {ga4Id && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga4Id}', {
                  page_path: window.location.pathname,
                  send_page_view: true
                });
              `,
            }}
          />
        </>
      )}

      {/* Microsoft Clarity */}
      {clarityId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `,
          }}
        />
      )}
    </>
  );
}

/**
 * Returns additional head meta entries for search engine verification.
 * Use these in the root route's head() function.
 */
export function getVerificationMeta() {
  const meta: Array<{ name: string; content: string }> = [];

  const gsc = import.meta.env.VITE_GSC_VERIFICATION;
  if (gsc) {
    meta.push({ name: "google-site-verification", content: gsc });
  }

  const bing = import.meta.env.VITE_BING_VERIFICATION;
  if (bing) {
    meta.push({ name: "msvalidate.01", content: bing });
  }

  return meta;
}
