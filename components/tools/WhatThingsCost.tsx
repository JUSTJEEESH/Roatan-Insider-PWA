const COST_ITEMS = [
  { item: 'Street baleada', usd: '$1–2', hnl: 'L 25–50' },
  { item: 'Restaurant meal (casual)', usd: '$8–15', hnl: 'L 200–375' },
  { item: 'Restaurant meal (fine dining)', usd: '$25–50', hnl: 'L 620–1,240' },
  { item: 'Local beer (bar)', usd: '$2–4', hnl: 'L 50–100' },
  { item: 'Cocktail (beach bar)', usd: '$5–10', hnl: 'L 125–250' },
  { item: 'Tuk-tuk (short ride)', usd: '$2–3/person', hnl: 'L 50–75' },
  { item: 'Taxi (West Bay to West End)', usd: '$8–10/vehicle', hnl: 'L 200–250' },
  { item: 'Two-tank dive', usd: '$65–85', hnl: 'L 1,615–2,110' },
  { item: 'Snorkel tour (half day)', usd: '$35–55', hnl: 'L 870–1,370' },
  { item: 'Souvenir t-shirt', usd: '$10–15', hnl: 'L 250–375' },
  { item: 'Bottled water (store)', usd: '$0.50–1', hnl: 'L 12–25' },
  { item: 'Sunscreen (store)', usd: '$8–12', hnl: 'L 200–300' },
];

export function WhatThingsCost() {
  return (
    <div>
      <h3 className="text-base font-display font-semibold text-charcoal mb-3">
        What Things Cost
      </h3>
      <div className="bg-white rounded-card overflow-hidden border border-gray-100">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="bg-seafoam">
              <th className="text-left px-3 py-2 text-charcoal font-medium">Item</th>
              <th className="text-right px-3 py-2 text-charcoal font-medium">USD</th>
              <th className="text-right px-3 py-2 text-charcoal font-medium">HNL</th>
            </tr>
          </thead>
          <tbody>
            {COST_ITEMS.map((row, i) => (
              <tr
                key={row.item}
                className={i % 2 === 0 ? 'bg-white' : 'bg-sand/50'}
              >
                <td className="px-3 py-2 text-driftwood">{row.item}</td>
                <td className="px-3 py-2 text-charcoal text-right whitespace-nowrap">
                  {row.usd}
                </td>
                <td className="px-3 py-2 text-driftwood-light text-right whitespace-nowrap">
                  {row.hnl}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-driftwood-light font-body mt-2">
        Prices are approximate and may vary by location and season. USD is widely accepted.
      </p>
    </div>
  );
}
