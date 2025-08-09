<<<<<<< HEAD
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
=======
// rubixstudio-tagger/index.ts

export function componentTagger() {
  return {
    name: 'rubixstudio-tagger',
    transform(code: string, id: string) {
      // Ini placeholder, belum ngapa-ngapain
      return code;
    }
>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
  };
}
