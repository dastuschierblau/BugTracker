export default function useDemoUser(role) {
  let credentials = {
    email: '',
    password: '123456'
  };

  if (role === 'manager') {
    credentials.email = 'brett.slack@yahoo.com';
  } else if (role === 'developer') {
    credentials.email = 'jenny@gmail.com';
  }

  return credentials;
}
