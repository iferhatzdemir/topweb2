"use client";
import BlogSidebar from "@/components/shared/sidebars/BlogSidebar";
import getAllBlogs from "@/libs/getAllBlogs";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import makePath from "@/libs/makePath";
import BlogCard4 from "@/components/shared/cards/BlogCard4";
import CommonContext from "@/providers/CommonContext";
import useSearch from "@/hooks/useSearch";
import modifyNumber from "@/libs/modifyNumber";
import countCommentLength from "@/libs/countCommentLength";
import sliceText from "@/libs/sliceText";

const BlogDetailsPrimary = () => {
  const { id: currentId } = useParams();
  const blogs = getAllBlogs();
  // get searched blogs
  const {
    searchedItems,
    isShowSearch,
    handleSearch,
    handleSearchString,
    startSearch,
    closeSearch,
    isShowQuickSearchResult,
    setIsShowQuickSearchResult,
  } = useSearch(blogs, `/blogs`);

  const blog = blogs?.find(({ id }) => id === parseInt(currentId));
  const {
    title,
    image,
    id,
    publishDate,
    desc,
    author,
    category,
    comments,
    tags,
  } = blog ? blog : {};
  const pervBlog = blogs.find(({ id }) => id === parseInt(currentId) - 1);
  const nextBlog = blogs.find(({ id }) => id === parseInt(currentId) + 1);
  const { title: prevTitle, id: prevId } = pervBlog ? pervBlog : {};
  const { title: nextTitle, id: nextId } = nextBlog ? nextBlog : {};
  const relatedBlogs = blogs
    ?.filter(({ athor: author2 }) => author2?.name === author?.name)
    ?.slice(0, 2);
  const totalBlogs = blogs?.length;
  const commentsLength = countCommentLength(comments);
  const totalComments = modifyNumber(commentsLength);
  return (
    <div className="ltn__page-details-area ltn__blog-details-area mb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="ltn__blog-details-wrap">
              <div className="ltn__page-details-inner ltn__blog-details-inner">
                <div className="ltn__blog-meta">
                  <ul>
                    <li className="ltn__blog-category">
                      <Link href={`/blogs?category=${makePath(category)}`}>
                        {category}
                      </Link>
                    </li>
                  </ul>
                </div>
                <h2 className="ltn__blog-title">{title}</h2>
                <div className="ltn__blog-meta">
                  <ul>
                    <li className="ltn__blog-author">
                      <Link href={`/blogs?author=${makePath(author?.name)}`}>
                        <Image
                          src={author?.image}
                          alt="#"
                          width={2000}
                          height={1000}
                        />
                        By: {author?.name}
                      </Link>
                    </li>
                    <li className="ltn__blog-date">
                      <i className="far fa-calendar-alt"></i>
                      {publishDate}
                    </li>
                    <li>
                      <Link href="#comments">
                        <i className="far fa-comments"></i>
                        {totalComments} Comments
                      </Link>
                    </li>
                  </ul>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Sed ut perspiciatis unde omnis
                  iste natus error sit voluptatem accusantium doloremque
                  laudantium, totam rem aperiam, eaque ipsa quae ab illo
                  inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                  aspernatur aut odit aut fugit, sed quia consequuntur magni
                  dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                  quisquam est, qui dolorem ipsum quia dolor sit amet,
                  consectetur, adipisci velit, sed quia non numquam eius modi
                  tempora incidunt ut labore et dolore magnam aliquam quaerat
                  voluptatem.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt.
                </p>
                <Image src={image} alt="Image" width={800} height={478} />
                <h2>A cleansing hot shower or bath</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia.{" "}
                </p>
                <hr />
                <h2>Setting the mood with incense</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia.{" "}
                </p>
                <hr />
                <h2>Setting the mood with incense</h2>
                <div className="list-item-with-icon-2">
                  <ul>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do
                    </li>
                  </ul>
                </div>
                <blockquote>
                  <h6 className="ltn__secondary-color mt-0">BY HETMAYAR</h6>
                  Viral dreamcatcher keytar typewriter, aest hetic offal umami.
                  Aesthetic polaroid pug pitchfork post-ironic.
                </blockquote>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Sed ut perspiciatis unde omnis
                  iste natus error sit voluptatem accusantium.{" "}
                </p>

                <Image
                  className="alignleft"
                  src="/img/blog/blog-details/1.jpg"
                  alt="Image"
                  width={255}
                  height={278}
                />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Sed ut perspiciatis unde omnis
                  iste natus
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Sed ut perspiciatis unde omnis
                  iste natus error sit voluptatem.{" "}
                </p>

                <h4>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Consectetur expedita velit laboriosam est sint laborum eos
                  assumenda, quam voluptatem adipisci, reprehenderit ut nobis
                  blanditiis perspiciatis!
                </p>
                <div className="row">
                  <div className="col-lg-6">
                    <Image
                      src="/img/service/31.jpg"
                      alt="Image"
                      width={600}
                      height={600}
                    />
                    <label>Image Caption Here</label>
                  </div>
                  <div className="col-lg-6">
                    <Image
                      src="/img/service/32.jpg"
                      alt="Image"
                      width={600}
                      height={600}
                    />
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Culpa, amet, fuga omnis eligendi sed cupiditate molestias enim
                  autem animi est tempore ipsa corporis. Recusandae, quia.
                </p>
              </div>
              {/* <!-- blog-tags-social-media --> */}
              <div className="ltn__blog-tags-social-media mt-80 row">
                {tags?.length ? (
                  <div className="ltn__tagcloud-widget col-lg-8">
                    <h4>Releted Tags</h4>
                    <ul>
                      {tags?.map((tag, idx) => (
                        <li key={idx}>
                          <Link href={`/blogs?tag=${makePath(tag)}`}>
                            {tag}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  ""
                )}
                <div className="ltn__social-media text-right text-end col-lg-4">
                  <h4>Social Share</h4>
                  <ul>
                    <li>
                      <Link href="https://www.facebook.com" title="Facebook">
                        <i className="fab fa-facebook-f"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://X.com" title="Twitter">
                        <i className="fab fa-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.linkedin.com" title="Linkedin">
                        <i className="fab fa-linkedin"></i>
                      </Link>
                    </li>

                    <li>
                      <Link href="https://www.youtube.com" title="Youtube">
                        <i className="fab fa-youtube"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <hr />
              {/* <!-- prev-next-btn --> */}
              <div className="ltn__prev-next-btn row mb-50">
                <div
                  className="blog-prev col-lg-6"
                  style={{ visibility: !prevId ? "hidden" : "visible" }}
                >
                  <h6>Prev Post</h6>
                  <h3 className="ltn__blog-title">
                    <Link href={`/blogs/${prevId ? prevId : 1}`}>
                      {prevTitle
                        ? sliceText(prevTitle, 12, true)
                        : "Tips On Minimalist"}
                    </Link>
                  </h3>
                </div>
                <div
                  className="blog-prev blog-next text-right text-end col-lg-6"
                  style={{
                    visibility: !nextId ? "hidden" : "visible",
                  }}
                >
                  <h6>Next Post</h6>
                  <h3 className="ltn__blog-title">
                    <Link href={`/blogs/${nextId ? nextId : totalBlogs}`}>
                      {nextTitle
                        ? sliceText(nextTitle, 12, true)
                        : "Less Is More"}
                    </Link>
                  </h3>
                </div>
              </div>
              <hr />
              {/* <!-- related-post --> */}
              {relatedBlogs?.length ? (
                <div className="related-post-area mb-50">
                  <h4 className="title-2">Related Post</h4>
                  <div className="row">
                    {relatedBlogs?.map((blog) => (
                      <div key={idx} className="col-md-6">
                        <BlogCard4 blog={blog} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}
              {/* <!-- comment-area --> */}
              <div className="ltn__comment-area mb-50" id="comments">
                <div className="ltn-author-introducing clearfix">
                  <div className="author-img">
                    <Image
                      src={author?.image}
                      alt="Author Image"
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="author-info">
                    <h6>Written by</h6>
                    <h1>{author?.name}</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      is enougn for today.
                    </p>
                  </div>
                </div>
                <h4 className="title-2">{totalComments} Comments</h4>
                {commentsLength ? (
                  <div className="ltn__comment-inner">
                    <ul>
                      {comments?.map(
                        ({ author, desc, publishDate, replies }, idx) => (
                          <li key={idx}>
                            <div className="ltn__comment-item clearfix">
                              <div className="ltn__commenter-img">
                                <Image
                                  src={author?.image}
                                  alt="Image"
                                  width={400}
                                  height={400}
                                />
                              </div>
                              <div className="ltn__commenter-comment">
                                <h6>
                                  <Link href={"#"}>{author?.name}</Link>
                                </h6>
                                <span className="comment-date">
                                  {publishDate}
                                </span>
                                <p>{desc}</p>
                                <Link
                                  href="#comment_form"
                                  className="ltn__comment-reply-btn"
                                >
                                  <i className="icon-reply-1"></i>Reply
                                </Link>
                              </div>
                            </div>
                            {replies?.length ? (
                              <ul>
                                {replies?.map(
                                  ({ author, desc, publishDate }, idx1) => (
                                    <li key={idx1 + 1000}>
                                      <div className="ltn__comment-item clearfix">
                                        <div className="ltn__commenter-img">
                                          <Image
                                            src={author?.image}
                                            alt="Image"
                                            width={400}
                                            height={400}
                                          />
                                        </div>
                                        <div className="ltn__commenter-comment">
                                          <h6>
                                            <Link href="#">{author?.name}</Link>
                                          </h6>
                                          <span className="comment-date">
                                            {publishDate}
                                          </span>
                                          <p>{desc}</p>
                                          <Link
                                            href="#comment_form"
                                            className="ltn__comment-reply-btn"
                                          >
                                            <i className="icon-reply-1"></i>
                                            Reply
                                          </Link>
                                        </div>
                                      </div>
                                    </li>
                                  )
                                )}
                              </ul>
                            ) : (
                              ""
                            )}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <hr />
              {/* <!-- comment-reply --> */}
              <div
                className="ltn__comment-reply-area ltn__form-box "
                id="comment_form"
              >
                <h4 className="title-2">Post Comment</h4>
                <form action="">
                  <div className="input-item input-item-textarea ltn__custom-icon">
                    <textarea placeholder="Type your comments...." />
                  </div>
                  <div className="input-item input-item-name ltn__custom-icon">
                    <input type="text" placeholder="Type your name...." />
                  </div>
                  <div className="input-item input-item-email ltn__custom-icon">
                    <input type="email" placeholder="Type your email...." />
                  </div>
                  <div className="input-item input-item-website ltn__custom-icon">
                    <input
                      type="text"
                      name="website"
                      placeholder="Type your website...."
                    />
                  </div>
                  <label className="mb-0 input-info-save">
                    <input type="checkbox" name="agree" /> Save my name, email,
                    and website in this browser for the next time I comment.
                  </label>
                  <div className="btn-wrapper">
                    <button
                      className="btn theme-btn-1 btn-effect-1 text-uppercase"
                      type="submit"
                    >
                      <i className="far fa-comments"></i> Post Comment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <CommonContext
              value={{
                author,
                searchedItems,
                handleSearch,
                handleSearchString,
                startSearch,
                closeSearch,
                isShowSearch,
                isShowQuickSearchResult,
                setIsShowQuickSearchResult,
              }}
            >
              <BlogSidebar />
            </CommonContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPrimary;
