export const formatPrice = (cents: number) => `${(cents / 100).toFixed(2).toString().replace('.', ',')} €`
