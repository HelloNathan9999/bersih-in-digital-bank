
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface PinDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title: string;
  description: string;
}

const PinDialog: React.FC<PinDialogProps> = ({ 
  open, 
  onClose, 
  onSuccess, 
  title, 
  description 
}) => {
  const [pin, setPin] = useState('');

  const handleSubmit = () => {
    if (pin.length === 6) {
      // Simulate PIN verification
      toast({
        title: "PIN Berhasil",
        description: "Transaksi dapat dilanjutkan",
      });
      onSuccess();
      setPin('');
      onClose();
    } else {
      toast({
        title: "PIN Tidak Valid",
        description: "PIN harus 6 digit",
        variant: "destructive"
      });
    }
  };

  const handleClose = () => {
    setPin('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Masukkan PIN 6 Digit
            </label>
            <Input
              type="password"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              placeholder="******"
              className="text-center text-lg tracking-widest"
            />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Batal
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Konfirmasi
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PinDialog;
