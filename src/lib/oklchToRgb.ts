function parseOklch(oklch: string): { l: number; c: number; h: number } {
  const match = oklch.match(/oklch\(([^)]+)\)/);
  if (!match) throw new Error('Invalid OKLCH format');
  const [l, c, h] = match[1].split(/\s+/).map(parseFloat);
  return { l, c, h };
}

function oklabToRgb(l: number, a: number, b: number): { r: number; g: number; b: number } {
  // OKLAB to LMS
  let l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  let m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  let s_ = l - 0.0894841775 * a - 1.2914855480 * b;

  l_ = l_ ** 3;
  m_ = m_ ** 3;
  s_ = s_ ** 3;

  // LMS to XYZ
  const x = 1.2270138511 * l_ - 0.5577999807 * m_ + 0.2812561489 * s_;
  const y = -0.0405801784 * l_ + 1.1122568696 * m_ - 0.0716766787 * s_;
  const z = -0.0763812845 * l_ - 0.4214819784 * m_ + 1.5861632204 * s_;

  // XYZ to RGB
  let r = 3.2409699419 * x - 1.5373831776 * y - 0.4986107603 * z;
  let g = -0.9692436363 * x + 1.8759675015 * y + 0.0415550574 * z;
  let b_ = 0.0556300797 * x - 0.2039769589 * y + 1.0569715142 * z;

  // Gamma correction
  const gamma = (v: number) => v > 0.0031308 ? 1.055 * Math.pow(v, 1 / 2.4) - 0.055 : 12.92 * v;

  r = gamma(r);
  g = gamma(g);
  b_ = gamma(b_);

  return {
    r: Math.max(0, Math.min(1, r)),
    g: Math.max(0, Math.min(1, g)),
    b: Math.max(0, Math.min(1, b_)),
  };
}

export function oklchToRgb(oklch: string): { r: number; g: number; b: number } {
  const { l, c, h } = parseOklch(oklch);
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  return oklabToRgb(l, a, b);
}