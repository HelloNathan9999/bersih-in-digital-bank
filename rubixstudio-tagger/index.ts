export function componentTagger() {
  return {
    name: "rubixstudio-tagger",
    transform(code: string, id: string) {
      // Contoh tagger: tambahkan komentar di awal file .tsx
      if (id.endsWith(".tsx")) {
        return {
          code: `// ✅ Tagged by rubixstudio\n${code}`,
          map: null,
        };
      }
    },
  };
}
