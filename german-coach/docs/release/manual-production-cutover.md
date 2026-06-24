# Manual Production Cutover

## Purpose

This runbook describes the final manual cutover after all German Coach hardening PRs are merged.

## Before cutover

Run:

```bash
cd english-coach
npm run lint
npm run build
```

Then run the app locally:

```bash
npm run dev
```

## Required checks

1. English Coach opens.
2. English Live works.
3. German Coach opens.
4. German Live works for A1, A2, and B1.
5. Ordered Path renders.
6. A1, A2, and B1 mocks render.
7. Writing review works.
8. Practice correction works.
9. Local state persists after refresh.
10. Production deployment works over HTTPS.

## Release label

After all checks pass, label the app:

```text
German Coach v1.0
```

Until then, label it:

```text
German Coach release candidate
```
