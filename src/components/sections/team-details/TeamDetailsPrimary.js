"use client";
import FeatureCard2 from "@/components/shared/cards/FeatureCard2";
import getAllFeatues from "@/libs/getAllFeatues";
import getTeamMembers from "@/libs/getTeamMembers";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const TeamDetailsPrimary = () => {
  const { id: currentId } = useParams();
  const currentMember = getTeamMembers()?.find(
    ({ id }) => id === parseInt(currentId)
  );
  const { name, img, desig } = currentMember ? currentMember : {};
  const features = getAllFeatues()?.filter(({ id }) => id > 3 && id < 7);
  return (
    <div className="ltn__team-details-area mb-90">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="ltn__team-details-member-info text-center mb-40">
              <div className="team-details-img">
                <Image
                  src={img}
                  alt="Team Member Image"
                  width={400}
                  height={400}
                />
              </div>
              <h2>{name}</h2>
              <h6 className="text-uppercase ltn__secondary-color">{desig}</h6>
              <div className="ltn__social-media-3">
                <ul>
                  <li>
                    <Link href="https://www.facebook.com" title="Facebook">
                      <i className="fab fa-facebook-f"></i>
                    </Link>
                  </li>{" "}
                  <li>
                    <Link href="https://x.com" title="Twitter">
                      <i className="fab fa-twitter"></i>
                    </Link>
                  </li>{" "}
                  <li>
                    <Link href="https://www.linkedin.com" title="Linkedin">
                      <i className="fab fa-linkedin"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="ltn__team-details-member-info-details">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
              <div className="row">
                <div className="col-lg-6">
                  <div className="ltn__team-details-member-about">
                    <ul>
                      <li>
                        <strong>Positions:</strong> Senior Technician
                      </li>
                      <li>
                        <strong>Experience:</strong> 10+ Years
                      </li>
                      <li>
                        <strong>Location:</strong> 13/A, NYC
                      </li>
                      <li>
                        <strong>Practice Area:</strong> Car Repair
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="ltn__team-details-member-about">
                    <ul>
                      <li>
                        <strong>Email:</strong> example@example.com
                      </li>
                      <li>
                        <strong>Fax:</strong> +0123-456 789
                      </li>
                      <li>
                        <strong>Phone:</strong> +0123-456 789
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <hr />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia consequu
                ntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit, sed quia non numquam eius modi
                tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem.
              </p>

              <div className="row ltn__custom-gutter mt-50 mb-20">
                {features?.map((feature, idx) => (
                  <div key={idx} className="col-xl-4 col-sm-6 col-12">
                    <FeatureCard2 feature={feature} idx={idx} />
                  </div>
                ))}
              </div>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia consequu
                ntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit, sed quia non numquam eius modi
                tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetailsPrimary;
