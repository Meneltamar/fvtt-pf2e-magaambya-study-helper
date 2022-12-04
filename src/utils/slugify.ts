export function slugify(inputString: string): string {
  const outputString = inputString.toLowerCase().replace(/\s/g, "-");
  return outputString;
}
