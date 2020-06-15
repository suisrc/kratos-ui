import React from 'react';

export type FormatNumberType = {
  text: string;
  unit: number;
};

export const DefaultFNT: FormatNumberType[] = [
  { text: '亿', unit: 100000000 },
  { text: '百万', unit: 1000000 },
  { text: '万', unit: 10000 },
];

export function formatNumber(
  val: number,
  units: FormatNumberType[] = DefaultFNT,
) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';
  let type = units.find(item => val >= item.unit);

  let result: React.ReactNode = val;
  if (!type) {
    return result;
  }
  return (
    <span>
      {Math.floor(val / 10000)}
      <span
        style={{
          position: 'relative',
          top: -2,
          fontSize: 14,
          fontStyle: 'normal',
          marginLeft: 2,
        }}
      >
        {type.text}
      </span>
    </span>
  );
}
