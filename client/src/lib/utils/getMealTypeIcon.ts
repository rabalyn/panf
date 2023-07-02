export const getMealTypeIcon = (type: string) => {
  switch (type) {
    case 'pizza':
      return 'p'
    case 'salad':
      return 's'
    default:
      return type
  }
}
