"use client";

export default function Radio() {
  return (
    <label>
      <input type="radio" onClick={() => console.log("clicked")} />
      テストボタン
    </label>
  );
}
