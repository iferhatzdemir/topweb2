import allFaq from "@/../public/fakedata/faq.json";
const getAllFaq = () => {
  const questions = allFaq.map((faq) => ({
    ...faq,
    img: faq.isVideo ? "/img/bg/17.jpg" : null,
  }));
  return questions;
};

export default getAllFaq;
