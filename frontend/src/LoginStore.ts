export let user = 'asdf';

export const setUser = (newUser: string) => {
  user = newUser;
  console.log('set user', user);
}