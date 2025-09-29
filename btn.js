import {
  animate,
  press,
} from 'https://cdn.jsdelivr.net/npm/motion@12.23.12/+esm';

press('.btn', element => {
  animate(element, { x: 7   , y: 7 }, { type: 'ease-in', stiffness: 0 });

  return () => animate(element, { x: 0, y: 0 }, { type: 'ease-in', stiffness: 0 });
});
