async function encryptAnswer(
  answer: string,
  passphrase: string
): Promise<{ encrypted: string; iv: string }> {
  const algo = {
    name: "AES-GCM",
    length: 256,
  };

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(passphrase),
    algo,
    false,
    ["encrypt", "decrypt"]
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encryptedData = await crypto.subtle.encrypt(
    { ...algo, iv },
    keyMaterial,
    new TextEncoder().encode(answer)
  );

  return {
    encrypted: Array.from(new Uint8Array(encryptedData))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""),
    iv: Array.from(iv)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""),
  };
}
