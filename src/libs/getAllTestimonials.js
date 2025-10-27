import allTestimonials from "@/../public/fakedata/testimonials.json";
const testImage1 = "/img/blog/1.jpg";
const testImage2 = "/img/blog/2.jpg";
const testImage3 = "/img/blog/3.jpg";
const testImage4 = "/img/blog/4.jpg";
const testImage5 = "/img/blog/5.jpg";
const testImage6 = "/img/blog/6.jpg";
const testImage7 = "/img/testimonial/3.jpg";
const testImage8 = "/img/testimonial/4.jpg";
const testImage9 = "/img/testimonial/6.jpg";
const testImage10 = "/img/testimonial/1.jpg";
const testImage12 = "/img/testimonial/2.jpg";
const testImage13 = "/img/testimonial/5.jpg";
const testImage14 = "/img/testimonial/6.jpg";
const testImage15 = "/img/testimonial/7.jpg";
const testSmallImage1 = "/img/testimonial/1.jpg";

const getAllTestimonials = () => {
  const images = [
    testImage1,
    testImage2,
    testImage3,
    testImage4,
    testImage5,
    testImage6,
    testImage7,
    testImage8,
    testImage9,
    testImage10,
    testImage15,
    testImage14,
    testImage13,
    testImage12,
    testImage10,
  ];
  const smallImages = [
    testSmallImage1,
    testSmallImage1,
    testSmallImage1,
    testSmallImage1,
    testSmallImage1,
    testSmallImage1,
    testSmallImage1,
    testSmallImage1,
    testSmallImage1,
    testSmallImage1,
    testSmallImage1,
    testSmallImage1,
    testSmallImage1,
    testSmallImage1,
    testSmallImage1,
  ];

  const testimonials = [...allTestimonials]?.map((testimonial, idx) => ({
    ...testimonial,
    image: images[idx],
    imageSmall: smallImages[idx],
  }));

  return testimonials;
};

export default getAllTestimonials;
