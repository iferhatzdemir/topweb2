import Image from "next/image";
import Link from "next/link";

const PortfolioCard = ({ portfolio }) => {
  const { id, title, desc, icon, img, dep, duration, path } = portfolio;
  return (
    <div className="ltn__gallery-item-inner">
      <div className="ltn__gallery-item-img">
        <Link href={path} data-rel="lightcase:myCollection">
          <Image src={img} alt="Image" width={600} height={454} />
          <span className="ltn__gallery-action-icon">{icon}</span>
        </Link>
      </div>
      <div className="ltn__gallery-item-info">
        <h4>
          <Link href={`/portfolio/${id}`}>{title} </Link>
        </h4>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default PortfolioCard;
