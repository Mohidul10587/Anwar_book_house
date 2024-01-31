import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";

function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  const images = [
    { id: 3, src: "/img1.jpeg" },
    { id: 1, src: "/img2.jpeg" },
  ];

  return (
    <div>
      <div className="flex gap-4 items-center justify-between overflow-x-hidden rounded-xl -mt-[40px] md:-mt-[52px]">
        {/* nav div  */}

        <Slider
          className=" 
           overflow-hidden"
          {...settings}
        >
          {images.map((image) => (
            <div
              className=" 
               overflow-hidden "
              key={image.id}
            >
              <div
                className="w-full md:h-[350px] h-44
                border relative md:mt-4 mt-8 md:pr-8 overflow-hidden"
              >
                <Image
                  className=" 
                   right-4"
                  fill
                  src={image.src}
                  alt=""
                />
                {/* <button className=" absolute bottom-12 left-16 font-bold  px-16 py-3 rounded-2xl bg-white text-violet-800">
                  Shop Now
                </button> */}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Banner;
