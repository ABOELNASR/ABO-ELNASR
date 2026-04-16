export const LOAVES_PER_PERSON = 5;
export const PRICE_PER_LOAF = 0.20;

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const calculateMonthlyValue = (individualsCount: number, year: number, month: number): number => {
  const days = getDaysInMonth(year, month);
  return individualsCount * LOAVES_PER_PERSON * days * PRICE_PER_LOAF;
};

export const formatMonthlyValue = (value: number): string => {
  return value.toFixed(2) + ' ج.م';
};