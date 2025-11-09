function long(date: Date | string): string {
  const d = new Date(date);

  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const date = {
  long,
};

export default date;
