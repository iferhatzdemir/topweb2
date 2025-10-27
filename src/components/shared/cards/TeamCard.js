import Image from "next/image";
import Link from "next/link";
import React from "react";

const TeamCard = ({ teamSingle }) => {
  const { id, name, img, desig, duration } = teamSingle;
  return (
    <div className="ltn__team-item ltn__team-item-3">
      <div className="team-img">
        <Image src={img} alt="Image" width={400} height={400} />
      </div>
      <div className="team-info">
        <h6 className="ltn__secondary-color">
          {"//"} {desig} {"//"}
        </h6>
        <h4>
          <Link href={`/team/${id}`}>{name}</Link>
        </h4>
        <div className="ltn__social-media">
          <ul>
            <li>
              <a href="https://www.facebook.com">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="https://x.com">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com">
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
