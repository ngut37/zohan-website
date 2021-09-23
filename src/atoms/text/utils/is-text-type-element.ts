import { elementsTypes, ElementType } from '../text';

export const isTextTypeElement = (type: string): type is ElementType => {
  return Object.keys(elementsTypes).includes(type);
};
