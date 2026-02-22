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
      <p className="text-sm uppercase tracking-widest text-gray-400 font-medium mb-4">
        What Things Cost
      </p>
      <div className="bg-white rounded-card overflow-hidden border border-gray-100">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wide">Item</th>
              <th className="text-right px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wide">USD</th>
              <th className="text-right px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wide">HNL</th>
            </tr>
          </thead>
          <tbody>
            {COST_ITEMS.map((row, i) => (
              <tr
                key={row.item}
                className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
              >
                <td className="px-4 py-3 text-gray-600">{row.item}</td>
                <td className="px-4 py-3 text-gray-900 text-right whitespace-nowrap">
                  {row.usd}
                </td>
                <td className="px-4 py-3 text-gray-400 text-right whitespace-nowrap">
                  {row.hnl}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 font-body mt-3">
        Prices are approximate and may vary by location and season. USD is widely accepted.
      </p>
    </div>
  );
}
