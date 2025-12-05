import Image from 'next/image';
import { Innovator } from '@/types/innovator';

interface InnovatorCardProps {
  innovator: Innovator;
}

export function InnovatorCard({ innovator }: InnovatorCardProps) {
  return (
    <div className="flex flex-col backdrop-blur-md justify-between bg-gray-dark-1/35 rounded-3xl p-10 border border-gray-dark-3 gap-4 relative h-full">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-6 flex-1">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#E1E1E1] shrink-0">
            <Image
              src={innovator.image}
              alt={innovator.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-white">{innovator.name}</p>
            <p className="text-base font-regular text-gray-light-5">{innovator.company}</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-2.5 px-6 rounded-full bg-gray-dark-3 border border-gray-dark-3 shrink-0">
          <p className="text-base text-white font-regular whitespace-nowrap">{innovator.position}</p>
        </div>
      </div>

      <hr className="border-gray-light-9" />

      <div className="flex flex-col justify-start gap-4 min-h-28">
        <p className="text-base font-medium text-white">{innovator.testimonialTitle}</p>
        <p className="text-base font-regular text-gray-light-5">{innovator.testimonialText}</p>
      </div>

      <hr className="border-gray-light-9" />

      <div className="flex flex-row items-center justify-between">
        <Image src="/logos/Logo-Dark-Mode.png" alt="Penguin" width={48} height={48} className="object-contain" />
        <p className="text-base font-medium text-white">{innovator.date}</p>
      </div>
    </div>
  );
}