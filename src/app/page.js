import React from "react";

const Home = async () => {
  return <></>;
};

export async function generateMetadata({ params, searchParams }) {
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

  const offer = {
    _id: "64768e63da6510efa018e268",
    title: "Bishop Arts District ",
    places: [
      {
        type: "Place",
        address: null,
        isFoursquare: true,
        _id: "9bd2ae1a03ad106fc5c08cfe",
        latitude: 32.80698921876519,
        longitude: -96.7935683612704,
        name: "",
      },
      {
        type: "Place",
        address: null,
        isFoursquare: true,
        _id: "6477d724da6510efa019d66e",
        latitude: 32.80695469564253,
        longitude: -96.79353736165152,
        name: "",
      },
    ],
    media: [
      {
        type: "Media",
        isCover: true,
        _id: "6477d724da6510efa019d66b",
        width: 400,
        mimetype: "image/png",
        height: 400,
        url: "https://trippian.sfo3.digitaloceanspaces.com/de7500d20956ef4b.png",
      },
      {
        type: "Media",
        isCover: false,
        _id: "6477d724da6510efa019d66c",
        width: 400,
        mimetype: "image/png",
        height: 400,
        url: "https://trippian.sfo3.digitaloceanspaces.com/e0ac29345476daa2.png",
      },
    ],
    interests: [
      {
        _id: "6311010c581338880f7147f7",
        title: "shopping",
      },
      {
        _id: "64768e27da6510efa018e215",
        title: "fun",
      },
      {
        _id: "62fe6693c32ef3a01af2852a",
        title: "food",
      },
      {
        _id: "64768e2eda6510efa018e230",
        title: "bars",
      },
      {
        _id: "62f285d67f0caef8ad00920c",
        title: "coffee",
      },
      {
        _id: "64768e3ada6510efa018e248",
        title: "clothes",
      },
      {
        _id: "64768e3fda6510efa018e251",
        title: "dallas",
      },
      {
        _id: "64768e43da6510efa018e25a",
        title: "texas",
      },
      {
        _id: "64768e4bda6510efa018e263",
        title: "outside",
      },
    ],
    averageRating: 4.2,
    description:
      "The Bishop Arts District is a great place to shop, eat and explore! You can park somewhere on the street or in a parking lot and walk everywhere you are wanting to go. There are so many stores with different things such as clothes, hair accessories, gifts for friends/family, and so much more! There are plenty of restaurants and coffee shops to stop and recharge. I highly recommend!",
    createdAt: "2023-05-31T00:01:39.803Z",
    shareLink: "https://hiddengem.trippian.com/offers/64768e63da6510efa018e268",
    inMyFavouriteList: false,
    commentsCount: 1,
    creator: {
      _id: "646390531fe0b0c8a0b72b99",
      firstName: "Melody",
      lastName: "Rutherford",
      photo: {
        type: "Media",
        thumb:
          "https://lh3.googleusercontent.com/a/AGNmyxbHkCk2Y2CAfmeOTBpE0ncXlzVHRKtjHCKfA098Ww=s96-c",
        url: "https://lh3.googleusercontent.com/a/AGNmyxbHkCk2Y2CAfmeOTBpE0ncXlzVHRKtjHCKfA098Ww=s96-c",
        width: 64,
        height: 64,
        mimetype: "image/png",
      },
      bio: "Hi, my name is Melody!",
      offers: 4,
      friendsCount: 3,
      parseId: "BRP9wwdfP4",
    },
  };

  return {
    title:offer.title,
    description: offer.description,
    openGraph: {
      title: offer.title,
      description: offer.description,
      images: [
        {
          url: offer.media[0].url,
          width: 400,
          height: 400,
        },
      ],
    },
    twitter: {
      cardType: "summary_large_image",
    },
    type:"website",
    robots: "follow, index",
    canonical:"https://hiddengem.trippian.com/offers/64768e63da6510efa018e268",
    links: [
      {
        rel: "canonical",
        href: "https://hiddengem.trippian.com/offers/64768e63da6510efa018e268",
      },
    ],

  };
}
export default Home;
