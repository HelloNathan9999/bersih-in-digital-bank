import { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function ScanQR() {
  const [open, setOpen] = useState(false);
  const scannerRef = useRef<any>(null);

  useEffect(() => {
    if (open && !scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );
      scannerRef.current.render(
        async (decodedText: string) => {
          // Sanitize QR content to prevent XSS
          const sanitizedText = decodedText.replace(/[<>"'&]/g, '');
          
          // Validate QR code with server-side function
          try {
            const { supabase } = await import('@/integrations/supabase/client');
            const { data, error } = await supabase.rpc('validate_qr_code', {
              qr_code_unique: sanitizedText
            });

            if (error || !data || data.length === 0) {
              console.error('Invalid QR code:', sanitizedText);
              return;
            }

            const qrData = data[0];
            if (qrData.is_valid) {
              console.log('Valid QR code detected:', qrData);
              // Process valid QR code here
            } else {
              console.warn('QR code already used or invalid');
            }
          } catch (error) {
            console.error('QR validation error:', error);
          }
        },
        (error: any) => {
          // console.warn("Scan Error:", error);
        }
      );
    }
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
        scannerRef.current = null;
      }
    };
  }, [open]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Scan QR Code</h1>
      {!open ? (
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setOpen(true)}
        >
          Buka Camera
        </button>
      ) : (
        <div
          id="reader"
          style={{ minHeight: 300, minWidth: 300, background: "#222" }}
          className="w-full max-w-md mx-auto"
        />
      )}
    </div>
  );
}
