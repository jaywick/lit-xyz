redirect({})

// // todo: handle routes like netlify does
// https://docs.netlify.com/routing/redirects/redirect-options/
// # Redirect with a 301
// /home         /              301

// # Redirect with a 302
// /my-redirect  /              302

// # Show a custom 404 for this path
// /ecommerce    /store-closed  404

// # Rewrite a path
// /pass-through /index.html    200
// /en/* /en/404.html 404
// /de/* /de/404.html 404
// /news/*  /blog/:splat
// # This will redirect /jobs/customer-ninja-rockstar
// /jobs/customer-ninja-rockstar  /careers/support-engineer

// # This will redirect all paths under /jobs except the path above
// /jobs/*                        /careers/:splat

// # This will never trigger, because the rule above will trigger first
// /jobs/outdated-job-link        /careers/position-filled
// /news/:month/:date/:year/:slug  /blog/:year/:month/:date/:slug

// # These rules are effectively the same:
// # either rule alone would trigger on both paths
// /blog/title-with-a-typo    /blog/typo-free-title
// /blog/title-with-a-typo/   /blog/typo-free-title

// # This rule will cause an infinite redirect
// # because the paths are effectively the same
// /blog/remove-my-slashes/   /blog/remove-my-slashes  301!

function redirect({}) {}
