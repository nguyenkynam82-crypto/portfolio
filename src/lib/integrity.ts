/*
 * integrity.ts — client delivery build (kn. / Nguyễn Kỳ Nam).
 *
 * The original product (by DonQuaan) shipped a host-lock that only rendered on
 * an authorised domain. For this delivered copy — which the client owns and will
 * host on their own domain — that lock is intentionally disabled so the site
 * mounts on any host.
 */
export function enforceOwnership(): boolean {
  return true;
}
