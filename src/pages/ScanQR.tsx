import { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function ScanQR() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      /* verbose= */ false
    );

    scanner.render(
      (decodedText) => {
        console.log("QR Detected:", decodedText);
        alert("QR: " + decodedText);
        // scanner.clear(); // uncomment kalau mau stop setelah scan
      },
      (error) => {
        console.warn("Scan Error:", error);
      }
    );

    return () => {
      scanner.clear().catch((err) => console.error('Clear error:', err));
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Scan QR Code</h1>
      <div id="reader" className="w-full max-w-md mx-auto" />
    </div>
  );
}
