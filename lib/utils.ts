import { PRICE_RANGE_LABELS, EXCHANGE_RATE_USD_TO_HNL } from './constants';
import type { BusinessHours, DayHours } from './types';

export function formatPriceRange(range: number): string {
  return PRICE_RANGE_LABELS[range] ?? '$';
}

export function convertUsdToHnl(usd: number): number {
  return Math.round(usd * EXCHANGE_RATE_USD_TO_HNL * 100) / 100;
}

export function convertHnlToUsd(hnl: number): number {
  return Math.round((hnl / EXCHANGE_RATE_USD_TO_HNL) * 100) / 100;
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function isOpenNow(hours: BusinessHours): boolean {
  const now = new Date();
  const days: (keyof BusinessHours)[] = [
    'sunday', 'monday', 'tuesday', 'wednesday',
    'thursday', 'friday', 'saturday',
  ];
  const today = days[now.getDay()];
  const todayHours: DayHours | null = hours[today];

  if (!todayHours) return false;

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const [openH, openM] = todayHours.open.split(':').map(Number);
  const [closeH, closeM] = todayHours.close.split(':').map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function formatPhone(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}

export function getDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}
