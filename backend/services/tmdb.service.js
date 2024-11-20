import axios from "axios";

export const fetchFromTMDB = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NGEyMTY3ODMyYWQ1NzA0MjMyYTU3ZDRiOThmNDc4YyIsIm5iZiI6MTczMjA3MDQ4MC45NDQ3MTUzLCJzdWIiOiI2NzNkNGJhYTc1N2IyODQyZDlkOGE0MDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.2Fz6GX9sUKEyMKB5T_tFWIiUM1ZFztPbF4K-fhv14Pg",
    },
  };

  const res = await axios.get(url, options);

  if (res.status !== 200) {
    throw new Error("Failed to fetch data from TMDB: " + res.statusText);
  }
  return res.data;
};
