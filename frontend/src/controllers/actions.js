export const UploadImage = (imageSrc, navigate) => {
  fetch("http://localhost:5000/upload", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ file: imageSrc }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        console.log("Please add a photograph");
      } else {
        // Navigate to face details page with detected data
        navigate("/face-details", { state: { data } });
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const putForm = (features, currType, currTone, navigate) => {
  console.log(features, currType, currTone, navigate);
  fetch("http://localhost:5000/recommend", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      features: features,
      type: currType,
      tone: currTone,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        console.log("Error");
      } else {
        navigate("/recs", { state: { data } });
        console.log(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
