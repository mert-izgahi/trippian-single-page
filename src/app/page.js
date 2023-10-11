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
        metaTags = {
          title: offer.title,
          description: offer.description,
          openGraph: {
            title: offer.title,
            description: offer.description,
            images: [
              {
                url: "https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg",
                width: 300,
                height: 300,
              },
            ],
          },
          twitter: {
            cardType: "summary_large_image",
            site: "@hiddengem",
            title: offer.title,
            description: offer.description,
            image:
              "https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg",

            images: [
              {
                url: "https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg",
                width: 300,
                height: 300,
              },
            ],
          },
          whatsapp: {
            title: offer.title,
            description: offer.description,
            image:
              "https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg",
          },
          type: "website",
          robots: "follow, index",
          canonical:
            "https://hiddengem.trippian.com/offers/64768e63da6510efa018e268",
          links: [
            {
              rel: "canonical",
              href: "https://hiddengem.trippian.com/offers/64768e63da6510efa018e268",
            },
          ],
        };
      });
    }
  );

  return metaTags;
}
export default Home;
