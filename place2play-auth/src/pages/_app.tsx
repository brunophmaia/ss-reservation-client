import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from '../context/theme-context';
import '../config/i18n/i18n';
import { DeviceProvider } from "@/context/device-context";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SnackbarProvider } from "@/context/snackbar-context";

export default function App({ Component, pageProps }: AppProps) {

  const googleCliendId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;

  return (
    <ThemeProvider>
      <DeviceProvider>
        <GoogleOAuthProvider clientId={googleCliendId}>
          <SnackbarProvider>
            <Component {...pageProps} />
          </SnackbarProvider>
        </GoogleOAuthProvider>
      </DeviceProvider>
    </ThemeProvider>
  );
}
