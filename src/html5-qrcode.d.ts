declare module "html5-qrcode" {
  export class Html5Qrcode {
    constructor(elementId: string);

    start(
      cameraId: string,
      config: { fps: number; qrbox: { width: number; height: number } },
      onSuccess: (decodedText: string, result: any) => void,
      onError: (errorMessage: string) => void
    ): Promise<void>;

    stop(): Promise<void>;
    clear(): Promise<void>;

    static getCameras(): Promise<Array<{ id: string; label: string }>>;
  }

  export class Html5QrcodeScanner {
    constructor(
      elementId: string,
      config: { fps: number; qrbox: { width: number; height: number } },
      verbose: boolean
    );
    render(
      onSuccess: (decodedText: string, result: any) => void,
      onError: (errorMessage: string) => void
    ): void;
    clear(): Promise<void>;
  }

  export function Html5QrcodeSupported(): boolean;
}
