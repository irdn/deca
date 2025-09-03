export type IranianPhoneValidationResult = {
  isValid: boolean;
  normalized?: string;
  error?: string;
};

const IRAN_MOBILE_REGEXES: RegExp[] = [
  /^09\d{9}$/,
  /^\+989\d{9}$/,
  /^00989\d{9}$/,
];

export function validateIranianMobile(
  input: string
): IranianPhoneValidationResult {
  const raw = (input || '').trim();

  if (!raw) {
    return { isValid: false, error: 'شماره موبایل الزامی است' };
  }

  const matchesAny = IRAN_MOBILE_REGEXES.some((re) => re.test(raw));
  if (!matchesAny) {
    return {
      isValid: false,
      error: 'شماره موبایل معتبر نیست',
    };
  }

  let normalized = raw;
  if (raw.startsWith('+98')) {
    normalized = '0' + raw.slice(3);
  } else if (raw.startsWith('0098')) {
    normalized = '0' + raw.slice(4);
  }

  return { isValid: true, normalized };
}

export function formatIranianMobileForDisplay(normalized: string): string {
  const compact = normalized.replace(/\D/g, '');
  if (compact.length !== 11) return normalized;
  return `${compact.slice(0, 4)} ${compact.slice(4, 7)} ${compact.slice(7)}`;
}
