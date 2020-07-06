import { provide, inject } from '@vue/composition-api';

const RouterSymbol = Symbol('router');

export function provideRouter(router) {
  provide(RouterSymbol, router);
}

export default function useRouter() {
  const router = inject(RouterSymbol);
  if (!router) {
    throw new Error('no router provided');
  }

  return router;
}
