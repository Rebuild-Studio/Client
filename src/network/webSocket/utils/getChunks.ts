export const getChunks = (messageBytes: Uint8Array, chunkSize: number) => {
  const numberOfChunks = Math.ceil(messageBytes.byteLength / chunkSize);
  const chunks: Uint8Array[] = [];

  for (let i = 0; i < numberOfChunks; i++) {
    const start = i * chunkSize;
    const end = start + chunkSize;
    const chunk = messageBytes.slice(start, end);
    chunks.push(chunk);
  }
  return chunks;
};
