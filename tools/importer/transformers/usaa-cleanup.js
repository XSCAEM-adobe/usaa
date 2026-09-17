/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: USAA site-wide cleanup.
 * Removes non-authorable site chrome (global header/nav, footer, skip link),
 * tracking/analytics iframes and pixels, and strips leftover elements/attributes.
 * All selectors verified against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Overlays / masks that could interfere with block parsing (verified: line 836).
    WebImporter.DOMUtils.remove(element, [
      '.globalPageHeader-navMask', // nav overlay mask
    ]);

    // Hidden scaffolding that leaks junk text into parsed blocks (esp. the
    // banking/checking billboard): server-name marker ("mobile domain:…"),
    // skeleton-loader placeholders ("false" / "noSkeletonLoader"), and the
    // hidden "Default Text" CTA (an inline display:none anchor). Scoped to these
    // specific markers rather than all [hidden]/[aria-hidden] nodes, which would
    // wrongly strip visible "see note" superscripts and screen-reader labels.
    WebImporter.DOMUtils.remove(element, [
      '.server-name',
      '.skeleton-loader',
      '.skeleton-loader-variation',
      'a[style*="display:none"]',
      'a[style*="display: none"]',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Non-authorable global chrome (verified in cleaned.html):
    //   skip link (line 3), global header (line 6), header element (line 7),
    //   footer (line 1945), footer nav (line 1948), footer content (line 2030).
    WebImporter.DOMUtils.remove(element, [
      'a.usaa-skipToContent', // "Skip to Content" link (home page markup)
      'a[href="#body-wrapper--main"]', // "Skip to Content" link (banking markup)
      '.usaa-globalHeader', // global site header wrapper
      'header', // header element (global nav)
      'footer', // page footer element
      '.usaa-globalFooterNav', // footer navigation
      '#usaa-footer-content', // footer disclosures/content
      '.pageFooter-notes', // footer legal notes
    ]);

    // Tracking / analytics / third-party embeds (verified: lines 2180-2192).
    WebImporter.DOMUtils.remove(element, [
      'iframe', // Optimizely, TTD, DoubleClick tracking frames
      '#ttdUniversalPixelTag',
      '#universal_pixel_lr62s7z',
      'img.ywa-10000', // Yahoo analytics pixel
      '.usaa-globalNav-helpContainer', // empty help container
      'link',
      'noscript',
      'script',
    ]);
  }
}
