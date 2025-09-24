import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff } from "lucide-react";

export function PasswordInput() {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      {/* Lock icon bên trái */}
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />

      {/* Input */}
      <Input
        id="password"
        type={show ? "text" : "password"}
        required
        className="pl-10 pr-10"
      />

      {/* Show/hide icon bên phải */}
      {show ? (
        <EyeOff
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
          size={20}
          onClick={() => setShow(false)}
        />
      ) : (
        <Eye
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
          size={20}
          onClick={() => setShow(true)}
        />
      )}
    </div>
  );
}
