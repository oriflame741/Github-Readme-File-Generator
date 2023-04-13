import Container from "@/components/Container";
import "../styles/globals.css";
import ToastContainerBar from "@/provider/ToastContainerBar";
import Bot from "@/components/Bot";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Container>
          <ToastContainerBar />
          <Bot />
          {children}
        </Container>
      </body>
    </html>
  );
}