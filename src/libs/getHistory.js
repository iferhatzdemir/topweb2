import allHistory from "@/../public/fakedata/history.json";
const historyImage1 = "/img/service/history-1.jpg";
const historyImage2 = "/img/img-slide/12.jpg";
const historyImage3 = "/img/img-slide/11.jpg";
const historyImage4 = "/img/img-slide/13.jpg";
const historyImage5 = "/img/img-slide/12.jpg";
const historyImage6 = "/img/img-slide/11.jpg";

const getHistory = () => {
  const images = [
    historyImage1,
    historyImage1,
    historyImage1,
    historyImage1,
    historyImage1,
    historyImage2,
    historyImage3,
    historyImage4,
    historyImage5,
    historyImage6,
  ];
  const badgeImages = {
    0: <i className="fas fa-award"></i>,
    1: <i className="fas fa-award"></i>,
    2: <i className="fas fa-award"></i>,
    3: <i className="fas fa-award"></i>,
    4: <i className="fas fa-award"></i>,
    5: <i className="fas fa-award"></i>,
    6: <i className="icon-award"></i>,
    7: <i className="fas fa-medal"></i>,
    8: <i className="icon-award"></i>,
    9: <i className="fas fa-trophy"></i>,
  };
  const history = [...allHistory]?.map((hisorySingle, idx) => ({
    ...hisorySingle,

    image: images[idx],
    badgeImage: badgeImages[idx],
  }));

  return history;
};

export default getHistory;
