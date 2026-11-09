export async function loginApi(username, password) {
  // Demo kimlik doğrulaması
  if (username === '240408908@ogrenci.biruni.edu.tr' && password === 'demo123456') {
    return {
      id: 1,
      username: 'Melisa Akbal',
      email: '240408908@ogrenci.biruni.edu.tr',
    };
  }

  // DummyJSON API fallback (varsayılan API çağrısı)
  try {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid username or password');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error('Invalid username or password');
  }
}
