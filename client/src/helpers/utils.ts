export const formatDate = (date: Date, options = { dateStyle: 'medium', timeStyle: 'short' }): string => {
  return new Intl.DateTimeFormat('en-US', options as Intl.DateTimeFormatOptions).format(date);
};

export const capitalize = (str: string | undefined): string => (str ? str.charAt(0).toUpperCase() + str.slice(1) : '');
