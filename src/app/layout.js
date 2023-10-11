import Head from "next/head";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Trippian</title>
      </Head>
      <body>{children}</body>
    </html>
  );
}
