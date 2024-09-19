async function main() {
  if (!navigator.gpu) {
    throw Error("WebGPU does not appear to be enabled");
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    throw Error("Couldn't request WebGPU adapter.");
  }

  const device = await adapter.requestDevice();

  
}

main()
