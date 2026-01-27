import { Film, Mail } from "lucide-react";

export const FooterSection = () => {
  return (
    <div className="w-screen h-[380px] bg-indigo-700 mt-20 flex items-center">
      <div className="w-full max-w-6xl mx-auto h-[200px] flex justify-between items-start">
        <div>
          <div className="text-white flex items-center gap-2 font-semibold">
            <Film className="w-6 h-6" />
            Movie Z
          </div>
          <p className="text-white text-sm mt-2">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>

        <div className="text-white space-y-2">
          <p className="font-semibold">Contact Information</p>

          <div className="flex items-center gap-2">
            <Mail />
            <h1>Email:</h1>
            <p>support@movieZ.com</p>
          </div>

          <div>
            <p>Follow us:</p>
            <p>Facebook · Instagram · Twitter · Youtube</p>
          </div>
        </div>
      </div>
    </div>
  );
};
