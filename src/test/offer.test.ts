import { describe, expect, it } from 'vitest';
import { checkoutDestination, offer, offerPrice } from '@/lib/offer';

describe('Confirmed commercial conditions', () => {
  it('does not invent a price', () => { expect(offer.price).toBeNull(); expect(offerPrice()).toBe('Preço a definir'); });
  it('does not invent access duration', () => { expect(offer.accessDuration).toBeNull(); });
  it('does not invent a profile limit', () => { expect(offer.profileLimit).toBeNull(); });
  it('does not invent released paid features', () => { expect(offer.includedFeatures).toEqual([]); });
  it('does not invent renewal or cancellation terms', () => { expect(offer.renewal).toBeNull(); expect(offer.cancellation).toBeNull(); });
  it('directs visitors to the offer when payment is not configured', () => { expect(checkoutDestination()).toBe('#oferta'); });
  it('uses the configured secure payment address', () => { expect(checkoutDestination({ ...offer, paymentUrl: 'https://checkout.example.com/guia' })).toBe('https://checkout.example.com/guia'); });
  it('rejects unsafe payment addresses', () => { expect(checkoutDestination({ ...offer, paymentUrl: 'javascript:alert(1)' })).toBe('#oferta'); });
});