import { atom } from "recoil";

export const basketState = atom({
  key: "basketState",
  default: [],
});

export const basketCost = atom({
  key: "basketCost",
  default: 0,
});

export const basketDiscountCost = atom({
  key: "basketDiscountCost",
  default: 0,
});
