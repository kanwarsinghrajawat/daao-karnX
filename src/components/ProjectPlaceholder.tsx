import Link from "next/link";
import React from "react";
import Text from "./ui/Text";
import Image from "next/image";

interface ProjectPlaceholderProps {
  image: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

const ProjectPlaceholder: React.FC<ProjectPlaceholderProps> = ({
  image,
  title,
  description,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="border border-divider p-6 sm:p-12 mx-auto w-full text-center bg-[#171717]">
      <div className="mb-4 flex flex-col gap-4 justify-center items-center">
        <Image
          src={image}
          alt={title}
          width={120}
          height={120}
          className="text-center"
        />
        <Text type="p" className="text-base sm:text-2xl font-bold">
          {title}
        </Text>

        <Text type="p" className="text-xs sm:text-base  text-center max-w-3xl">
          {description}
        </Text>
        {buttonText && buttonLink && (
          <Link
            href={buttonLink}
            className="inline-block bg-black text-white px-6 py-3 font-normal text-sm"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectPlaceholder;