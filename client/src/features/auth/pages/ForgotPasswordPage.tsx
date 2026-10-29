import { useLocation, useNavigate } from "react-router-dom";
import AuthPageLayout from "../components/AuthPageLayout";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialEmail =
    typeof location.state === "object" &&
    location.state !== null &&
    "email" in location.state &&
    typeof location.state.email === "string"
      ? location.state.email
      : "";

  return (
    <AuthPageLayout title='Reset password'>
      <ForgotPasswordForm
        initialEmail={initialEmail}
        onBackToLogin={(email) => navigate("/auth/login", { state: { email } })}
      />
    </AuthPageLayout>
  );
}
