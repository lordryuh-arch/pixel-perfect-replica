<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Centralize commercial conditions in `src/lib/offer.ts`; leave unconfirmed values unset so the page and FAQ never invent terms.
- Keep educational module content in `src/lib/guide.ts` and product sections on the index route to preserve the existing single-page navigation.
- Group the index page's book, module, platform and commercial presentation in `src/components/OfferSections.tsx`, reading guide and offer data rather than duplicating them, to keep presentation separate from confirmed terms.
- Mapa Vivo is a frontend-only demonstration: temporary observations exist only in React state, never browser storage, and no paid access or payment processing is implemented.
