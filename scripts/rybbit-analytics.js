/*
 * rybbit-analytics.js - Deepvue Workflows docs (docs.deepvue.link).
 *
 * Adapted from the sibling docs site (docs.deepvue.ai). This site gets its OWN
 * Rybbit site ID rather than reusing the sibling's: sharing one ID would merge
 * two products into a single analytics property and make per-product traffic
 * unrecoverable after the fact.
 *
 * TO ENABLE: create a Rybbit site for docs.deepvue.link, then paste its site ID
 * below. Until then this script deliberately does nothing, so the docs can ship
 * without silently sending traffic to the wrong property.
 */
(function () {
  var RYBBIT_SITE_ID = 'REPLACE_WITH_DOCS_DEEPVUE_LINK_SITE_ID';

  // No-op until a real site ID is filled in. Sending events under the
  // placeholder would either 404 at ingestion or, worse, land somewhere
  // unintended.
  if (!RYBBIT_SITE_ID || RYBBIT_SITE_ID.indexOf('REPLACE_WITH') === 0) return;

  var script = document.createElement('script');
  script.src = 'https://app.rybbit.io/api/script.js';
  script.defer = true;
  // NB: do NOT set script.crossOrigin = 'anonymous'. Rybbit's script CDN
  // (app.rybbit.io/api/script.js) does not return an Access-Control-Allow-Origin
  // header, so crossOrigin made the fetch fail CORS in every browser - Rybbit never
  // initialized (window.rybbit stayed undefined). Rybbit's standard snippet sets no
  // crossOrigin; a classic cross-origin <script> loads and executes without it.
  script.setAttribute('data-site-id', RYBBIT_SITE_ID);
  document.head.appendChild(script);
})();
