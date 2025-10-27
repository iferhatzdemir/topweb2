import allBlogs from "@/../public/fakedata/blogs.json";
import allComments from "@/../public/fakedata/blogComments.json";
const blogImage1 = "/img/blog/1.jpg";
const blogImage2 = "/img/blog/2.jpg";
const blogImage3 = "/img/blog/3.jpg";
const blogImage4 = "/img/blog/4.jpg";
const blogImage5 = "/img/blog/5.jpg";
const blogImage6 = "/img/blog/6.jpg";
const blogImage7 = "/img/blog/7.jpg";
const blogImage8 = "/img/blog/8.jpg";
const blogImage31 = "/img/blog/31.jpg";
const blogImage32 = "/img/blog/32.jpg";
const blogImage33 = "/img/blog/33.jpg";
const blogImage34 = "/img/blog/34.jpg";
const blogAuthorImage1 = "/img/team/1.jpg";
const blogAuthorImage2 = "/img/team/2.jpg";
const blogAuthorImage3 = "/img/team/3.jpg";
const blogAuthorImage4 = "/img/team/4.jpg";
const blogAuthorImage5 = "/img/team/5.jpg";
const blogAuthorImage6 = "/img/team/6.jpg";
const blogAuthorImage7 = "/img/team/7.jpg";
const blogAuthorImage8 = "/img/team/8.jpg";
const blogAuthorImage9 = "/img/team/2.jpg";

const getAllBlogs = () => {
  const largeImages = [
    blogImage31,
    blogImage32,
    blogImage33,
    blogImage34,
    null,
    blogImage3,
    blogImage2,
    blogImage33,
    blogImage31,
    blogImage32,
    blogImage33,
    null,
    blogImage34,
    blogImage31,
    blogImage32,
    blogImage33,
    blogImage31,
    blogImage32,
    blogImage33,
    null,
    blogImage31,
    blogImage34,
    blogImage33,
    blogImage31,
    blogImage32,
    blogImage33,
    null,
    blogImage34,
    blogImage31,
    blogImage32,
    blogImage33,
  ];
  const images = [
    blogImage1,
    blogImage2,
    blogImage3,
    blogImage4,
    blogImage5,
    blogImage6,
    blogImage7,
    blogImage8,
    blogImage1,
    blogImage2,
    blogImage3,
    blogImage4,
    blogImage5,
    blogImage6,
    blogImage7,
    blogImage8,
    blogImage1,
    blogImage2,
    blogImage3,
    blogImage4,
    blogImage5,
    blogImage6,
    blogImage7,
    blogImage8,
    blogImage1,
    blogImage2,
    blogImage3,
  ];
  const authorimages = [
    blogAuthorImage1,
    blogAuthorImage2,
    blogAuthorImage3,
    blogAuthorImage4,
    blogAuthorImage5,
    blogAuthorImage6,
    blogAuthorImage7,
    blogAuthorImage8,
    blogAuthorImage9,
    blogAuthorImage1,
    blogAuthorImage2,
    blogAuthorImage3,
    blogAuthorImage4,
    blogAuthorImage5,
    blogAuthorImage6,
    blogAuthorImage7,
    blogAuthorImage8,
    blogAuthorImage9,
    blogAuthorImage1,
    blogAuthorImage2,
    blogAuthorImage3,
    blogAuthorImage4,
    blogAuthorImage5,
    blogAuthorImage6,
    blogAuthorImage7,
    blogAuthorImage8,
    blogAuthorImage9,
    ,
  ];

  const blogs = [...allBlogs]?.map((blog, idx) => ({
    ...blog,
    author: {
      ...blog?.author,
      image: authorimages[idx],
    },
    image: images[idx],
    imageLarge: largeImages[idx],
    comments: allComments?.filter(({ blogId }) => blogId === blog?.id),
  }));
  return blogs;
};

export default getAllBlogs;
