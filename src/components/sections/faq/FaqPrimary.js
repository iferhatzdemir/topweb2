/* eslint-disable jsx-a11y/role-supports-aria-props */
import SidebarBanner from "@/components/shared/sidebars/widgets/SidebarBanner";
import SidebarNewsletter from "@/components/shared/sidebars/widgets/SidebarNewsletter";
import getAllFaq from "@/libs/getAllFaq";
import Image from "next/image";
import Link from "next/link";

const FaqPrimary = () => {
  const allFaq = getAllFaq();
  return (
    <div className="ltn__faq-area mb-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="ltn__faq-inner ltn__faq-inner-2">
              <div id="accordion_2">
                {/* <!-- card --> */}
                {allFaq?.map(
                  ({ question, ans, img, isVideo, videoUrl }, idx) => (
                    <div key={idx} className="card">
                      <h6
                        className="ltn__card-title"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq-item-2-${idx + 1}`}
                        aria-expanded={idx === 1 ? true : false}
                      >
                        {question}
                      </h6>
                      <div
                        id={`faq-item-2-${idx + 1}`}
                        className={`collapse  ${idx === 1 ? "show" : ""}`}
                        data-bs-parent="#accordion_2"
                      >
                        <div className="card-body">
                          {isVideo ? (
                            <div className="ltn__video-img alignleft">
                              <Image
                                src={img}
                                alt="video popup bg image"
                                width={220}
                                height={140}
                              />
                              <Link
                                className="ltn__video-icon-2 ltn__video-icon-2-small "
                                href={videoUrl}
                                data-rel="lightcase:myCollection"
                              >
                                <i className="fa fa-play"></i>
                              </Link>
                            </div>
                          ) : (
                            ""
                          )}
                          <p>{ans}</p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="need-support text-center mt-100">
                <h2>Still need help? Reach out to support 24/7:</h2>
                <div className="btn-wrapper mb-30">
                  <Link href="/contact" className="theme-btn-1 btn">
                    Contact Us
                  </Link>
                </div>
                <h3>
                  <i className="fas fa-phone"></i> +0123-456-789
                </h3>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <aside className="sidebar-area ltn__right-sidebar">
              {/* <!-- Newsletter Widget --> */}
              <SidebarNewsletter />

              {/* <!-- Banner Widget --> */}
              <SidebarBanner />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPrimary;
