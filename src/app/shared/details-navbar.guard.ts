import { CanActivateFn } from '@angular/router';
import { checkDetailsNavbarUrl } from './utility';

export const DetailsNavbarGuard: CanActivateFn = (route, state) => {
  const stateCheck = checkDetailsNavbarUrl(state.url)
  console.log('secondaryMenuGuard: cat-details route activated', stateCheck);
  return stateCheck;
};
