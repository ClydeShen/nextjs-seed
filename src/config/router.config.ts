export interface Route {
  label: string;
  pathname: RegExp;
  path: string;
}
export const routes: readonly Route[] = Object.freeze([
  {
    label: 'Home',
    pathname: RegExp(/^\/$/),
    path: '/',
  },
  {
    label: 'List form',
    pathname: RegExp(/^(\/(list-form)(\/.*)?|\/)?$/),
    path: '/list-form',
  },
  {
    label: 'Tab form',
    pathname: RegExp(/^(\/(products)(\/.*)?|\/)?$/),
    path: '/tab-form',
  },
]);
