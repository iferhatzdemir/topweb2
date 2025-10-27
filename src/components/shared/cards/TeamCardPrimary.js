import Image from "next/image";
import Link from "next/link";
import React from "react";

const TeamCardPrimary = ({ teamSingle, isPrimary }) => {
  const { id, name, img, desig, duration } = teamSingle;
  return (
    <div className="ltn__team-item">
      <div className="team-img">
        <Image src={img} alt="Image" width={400} height={400} />
      </div>
      <div className="team-info">
        <h6 className="ltn__secondary-color">
          {isPrimary ? (
            desig
          ) : (
            <>
              {" "}
              {"//"} {desig} {"//"}
            </>
          )}
        </h6>
        <h4>
          <Link href={`/team/${id}`}>{name}</Link>
        </h4>
        <div className="ltn__social-media">
          <ul>
            <li>
              <Link href="https://www.facebook.com">
                <i className="fab fa-facebook-f"></i>
              </Link>
            </li>
            <li>
              <Link href="https://x.com">
                <i className="fab fa-twitter"></i>
              </Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com">
                <i className="fab fa-linkedin"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamCardPrimary;
