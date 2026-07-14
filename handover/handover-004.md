# Handover 004

## What Was Done

- Verified Wrangler is installed and authenticated to Cloudflare under `yaron.been@gmail.com`.
- Found existing Cloudflare Pages project: `top10aigirlfriends`.
- Deployed the current `/home/yaron/top10aigirlfriends.com/dist/` build to Cloudflare Pages.
- Verified deployment returns HTTP 200 at `https://master.top10aigirlfriends.pages.dev/`.

## Current State

- GitHub Pages is configured but waiting on DNS.
- Cloudflare Pages is also deployed and is likely the better production path because Namecheap only allows nameserver changes.
- The domain `top10aigirlfriends.com` still needs to be added to Cloudflare DNS and connected to the Pages project.

## Open Issues

- Change Namecheap nameservers to the Cloudflare nameservers shown when adding `top10aigirlfriends.com` in Cloudflare.
- Add/connect custom domain `top10aigirlfriends.com` to Cloudflare Pages project `top10aigirlfriends`.
- Confirm root and `www` both resolve after propagation.

## Next Steps

1. In Cloudflare dashboard, add site `top10aigirlfriends.com` on the Free plan.
2. Copy the two Cloudflare nameservers shown.
3. In Namecheap, set Custom DNS nameservers to those two Cloudflare nameservers.
4. In Cloudflare Pages project `top10aigirlfriends`, add custom domains:
   - `top10aigirlfriends.com`
   - `www.top10aigirlfriends.com`
5. Verify HTTPS and redirects after propagation.
