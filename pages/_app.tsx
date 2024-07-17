import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from '../context/theme-context';
import '../config/i18n/i18n';
import { DeviceProvider } from "@/context/device-context";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <DeviceProvider>
        <GoogleOAuthProvider clientId='415197702083-j736do744e0nk9mr9kcrbcjr6iv8oa1s.apps.googleusercontent.com'>
          <Component {...pageProps} />
        </GoogleOAuthProvider>
      </DeviceProvider>
    </ThemeProvider>
  );
}
