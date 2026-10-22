// Confirm all commercial conditions before enabling a checkout link.
export type CommercialOffer = {
  price: number | null;
  currency: string | null;
  period: string | null;
  accessDuration: string | null;
  includedFeatures: string[];
  profileLimit: number | null;
  paymentUrl: string | null;
  renewal: string | null;
  cancellation: string | null;
};

export const offer: CommercialOffer = {
  price: null,
  currency: null,
  period: null,
  accessDuration: null,
  includedFeatures: [],
  profileLimit: null,
  paymentUrl: null,
  renewal: null,
  cancellation: null,
};

export function checkoutDestination(config: CommercialOffer = offer) {
  if (!config.paymentUrl) return '#oferta';
  try {
    const url = new URL(config.paymentUrl);
    return url.protocol === 'https:' ? url.href : '#oferta';
  } catch { return '#oferta'; }
}

export function offerPrice(config: CommercialOffer = offer) {
  if (config.price === null || !config.currency) return 'Preço a definir';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: config.currency }).format(config.price);
}