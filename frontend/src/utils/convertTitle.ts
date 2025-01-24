export function convertToTitleCase(input: string): string {
  const words = input.split("_");

  const titleCaseWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  const result = titleCaseWords.join(" ");

  return result;
}
