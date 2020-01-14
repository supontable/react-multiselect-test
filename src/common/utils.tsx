const match = (s: string, vals: string[]): string[] => {
  const p = Array.from(s).reduce((a, v, i) => `${a}[^${s.substr(i)}]*?${v}`, '');
  const re = RegExp(p, 'i');

  return vals.filter(v => v.match(re));
};

export { match }