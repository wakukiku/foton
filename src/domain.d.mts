import type { Product } from "./core";
export function checkCompatibility(
  camera: Product,
  film: Product,
): { ok: boolean; message: string };
