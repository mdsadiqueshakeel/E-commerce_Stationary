import React from "react";

const ForgotPasswordHeader = () => {
  return (
    <div className="max-w-4xl mx-auto text-center mb-12">
      <h1 className="text-3xl md:text-4xl font-bold text-[#2f153c] mb-4">
        Forgot Your Password?
      </h1>
      <p className="text-[#2f153c]/80 text-lg max-w-2xl mx-auto">
        Don't worry! Enter your email and we'll send you a link to reset your password.
      </p>
    </div>
  );
};

export default ForgotPasswordHeader;