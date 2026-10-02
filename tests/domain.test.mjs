import { test } from "node:test";
import assert from "node:assert/strict";
import { checkCompatibility } from "../src/domain.mjs";
test("formats must match and product kinds must be correct", () => {
  assert.equal(
    checkCompatibility(
      { type: "camera", format: "135" },
      { type: "film", format: "120" },
    ).ok,
    false,
  );
  assert.equal(
    checkCompatibility(
      { type: "camera", format: "120" },
      { type: "film", format: "120" },
    ).ok,
    true,
  );
  assert.equal(checkCompatibility(null, {}).ok, false);
});
