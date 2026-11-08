export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Ödev kuralına göre öğrenci e-postan kullanıcı adı, demo123456 şifre
      if (username === '240408908@ogrenci.biruni.edu.tr' && password === 'demo123456') {
        resolve({ username });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 500);
  });
}
