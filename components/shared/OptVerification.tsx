'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VerifyEmail } from "@/actions/auth.actions";
import { useToast } from "@/hooks/use-toast";
import { ROUTES } from "@/constants/routes";

export function OptVerification({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const { toast } = useToast();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOtpChange = (val: string) => {
    setValue(val.replace(/\D/g, ""));
  };

  const handleEmailVerification = async () => {
    setLoading(true);
    try {
      const { success, error } = await VerifyEmail({ token: value });
      if (error) {
        setError(error.message);
        alert(error.message)
        return;
      }
      if (success) {
        toast({ title: "Succès", description: "Email vérifié avec succès." });
        setOpen(false);
        setValue("");
        router.push(ROUTES.signin);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const slotClasses =
    "mx-1 sm:mx-2 rounded-lg border border-gray-300 w-12 sm:w-[60px] text-xl sm:text-2xl font-medium h-12 sm:h-[60px]";

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="bg-white px-4 z-[1000000000] sm:px-6 pt-4 pb-6 sm:max-w-[550px] w-[95%] ">
        <div className="flex justify-center mb-4">
          <img
            className="invert"
            src="https://www.marjanemall.ma/static/version1739434205/frontend/Marjane/default/fr_FR/images/marjane-logo.svg"
            alt="Marjane Logo"
            width={140}
          />
        </div>

        <DialogHeader className="text-center">
          <DialogTitle className="text-base sm:text-lg font-semibold text-gray-700">
            Renseignez le code reçu par email
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-center my-6">
          <InputOTP value={value} onChange={handleOtpChange} maxLength={6}>
            {[0, 2, 4].map((startIdx) => (
              <InputOTPGroup key={startIdx}>
                <InputOTPSlot className={slotClasses} index={startIdx} />
                <InputOTPSlot className={slotClasses} index={startIdx + 1} />
              </InputOTPGroup>
            ))}
          </InputOTP>
        </div>

        <button
          type="button"
          className="flex mx-auto items-center gap-2 group text-blue-600 hover:underline"
        >
          <p className="text-sm sm:text-base font-medium">Renvoyer le code</p>
          <RotateCw size={16} />
        </button>

        <DialogFooter className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex flex-col w-full gap-3">
            <Button
              onClick={handleEmailVerification}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              disabled={isLoading || value.length !== 6}
              type="button"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader className="animate-spin" size={16} /> Vérification...
                </span>
              ) : (
                "Valider"
              )}
            </Button>
            <Button
              variant="ghost"
              className="text-sm text-gray-700 hover:underline"
              type="button"
            >
              Changer l'adresse email
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
