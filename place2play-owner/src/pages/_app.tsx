import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from '../context/theme-context';
import '../config/i18n/i18n';
import { DeviceProvider } from "@/context/device-context";
import { SnackbarProvider } from "@/context/snackbar-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <DeviceProvider>
        <SnackbarProvider>
          <Component {...pageProps} />
        </SnackbarProvider>
      </DeviceProvider>
    </ThemeProvider>
  );
}
