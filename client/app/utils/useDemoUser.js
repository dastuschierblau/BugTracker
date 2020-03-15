export default function useDemoUser(role) {
  let credentials = {
    email: '',
    password: '123456'
  };

  if (role === 'manager') {
    credentials.email = 'johndoe@gmail.com';
  } else if (role === 'developer') {
    credentials.email = 'jenny@gmail.com';
  }

  return credentials;
}
