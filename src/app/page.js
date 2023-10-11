import Head from "next/head";
import React from "react";

const Home = async () => {
  return <></>;
};

export async function generateMetadata({ params, searchParams }) {
  //const { offerId } = params;
  const offerId = "64768e63da6510efa018e268";
  const authorize = ({ email, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          "https://trippian.arneca.com/api/v1/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              identity: email,
              password,
            }),
          }
        );

        const data = await response.json();
        const { result: token } = data;

        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getOffer = async ({ token, offerId }) => {
    //   const url = (window.location.href).toString();
    //   const offerId = url.split("/")[url.split("/").length - 1];

    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `https://trippian.arneca.com/api/v1/offers/${offerId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { result } = await response.json();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };

  let metaTags = {};
  await authorize({ email: "mert@mail.com", password: "12345" }).then(
    async (token) => {
      await getOffer({ token, offerId: offerId }).then((offer) => {
        const cover = offer.media.find((img) => img.isCover).url;
        metaTags = {
          title: offer.title,
          description: offer.description,
          openGraph: {
            title: offer.title,
            description: offer.description,
            url: offer.shareLink,
            content: "article",
            siteName: "Trippian",

            images: [
              {
                url: cover,
                width: 800,
                height: 600,
              },
              ...offer.media.map((img) => ({
                url: img.url,
                width: 800,
                height: 600,
              })),
            ],
          },
          twitter: {
            cardType: "summary_large_image",
            site: "@hiddengem",
            title: offer.title,
            description: offer.description,
            image: cover,
            url: offer.shareLink,
            content: "article",
            images: [
              {
                url: cover,
                width: 300,
                height: 300,
              },
            ],
          },
          robots: "follow, index",
          canonical:
            "https://hiddengem.trippian.com/offers/64768e63da6510efa018e268",
          links: [
            {
              rel: "canonical",
              href: "https://hiddengem.trippian.com/offers/64768e63da6510efa018e268",
            },
          ],
          locale: "en_US",
          type: "website",
        };
      });
    }
  );

  return metaTags;
}
export default Home;
