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
    pathname: RegExp(/^(\/(tab-form)(\/.*)?|\/)?$/),
    path: '/tab-form',
  },
  {
    label: 'Product form',
    pathname: RegExp(/^(\/(product-form)(\/.*)?|\/)?$/),
    path: '/product-form',
  },
  {
    label: 'View request',
    pathname: RegExp(/^(\/(view)(\/.*)?|\/)?$/),
    path: '/view',
  },
]);
