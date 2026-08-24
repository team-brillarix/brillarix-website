import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/constants/blogs';
import { Heading } from '@/components/ui/Heading';

interface BlogCardProps {
  blog: BlogPost;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${blog.id}`}
      className="bg-gray-dark-1 rounded-3xl h-full flex flex-col p-4 lg:p-6 border border-gray-dark-3 gap-6 transition-colors cursor-pointer hover:border-gray-dark-5"
    >
      {/* Image */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col grow gap-3">
        {/* Title */}
        <Heading
          variant="h6"
          scale="compact"
          align="left"
          weight="medium"        >
          {blog.title}
        </Heading>

        {/* Description */}
        <p className="text-gray-light-5 text-sm md:text-base line-clamp-2 grow">
          {blog.description}
        </p>

        {/* Footer with Date and Learn More */}
        <div className="flex items-center justify-between mt-auto text-gray-light-1 ">
          <span className="underline font-bold">
            Learn More
          </span>
          <span className="text-sm font-medium">
            {blog.date}
          </span>
        </div>
      </div>
    </Link>
  );
}

