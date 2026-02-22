import { Info } from 'lucide-react';

const TIPPING_RULES = [
  {
    service: 'Restaurants',
    tip: '10–15%',
    note: 'Check if a service charge ("propina") is already included. If it is, no extra tip needed. If not, 10–15% is standard.',
  },
  {
    service: 'Bars',
    tip: '$1–2 per drink',
    note: 'Tip per drink at the bar. Beach bars with table service, same as restaurants.',
  },
  {
    service: 'Dive Masters',
    tip: '$5–10 per dive',
    note: 'Per person per dive. More for exceptional service or multi-day packages.',
  },
  {
    service: 'Tour Guides',
    tip: '$5–10 per person',
    note: 'For half-day or full-day tours. More for private or specialized tours.',
  },
  {
    service: 'Taxi Drivers',
    tip: 'Not expected',
    note: 'Rounding up is appreciated but not customary. Negotiate the fare before getting in.',
  },
  {
    service: 'Hotel Staff',
    tip: '$1–2 per day',
    note: 'For housekeeping. Leave cash on the pillow or nightstand with a note.',
  },
];

export function TippingGuide() {
  return (
    <div>
      <h3 className="text-base font-display font-semibold text-charcoal mb-3">
        Tipping on Roat&aacute;n
      </h3>
      <div className="bg-seafoam rounded-card p-4">
        <div className="flex items-start gap-2 mb-3">
          <Info size={18} className="flex-shrink-0 text-primary mt-0.5" />
          <p className="text-sm text-driftwood font-body leading-relaxed">
            Tipping is appreciated but not as standardized as in the US. Cash tips in small USD bills are preferred. Lempira is fine too.
          </p>
        </div>
        <div className="space-y-3">
          {TIPPING_RULES.map((rule) => (
            <div key={rule.service} className="bg-white rounded-button p-3">
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <span className="font-body font-medium text-charcoal text-sm">
                  {rule.service}
                </span>
                <span className="font-body font-semibold text-primary text-sm whitespace-nowrap">
                  {rule.tip}
                </span>
              </div>
              <p className="text-xs text-driftwood font-body leading-relaxed">
                {rule.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
