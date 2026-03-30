import { InfiniteSlider } from '../components/ui/infinite-slider';

const collaborators = [
  { label: 'Nike' },
  { label: 'Aesop' },
  { label: 'Tencent 腾讯' },
  { label: 'Supbase' },
  { label: 'Veethy' },
  { label: 'Meridian Studio' },
  { label: 'Maison Verite' },
  { label: 'Forma Collective' },
  { label: 'Sable FW' },
  { label: 'Epoch Hospitality' },
] as const;

export default function Testimonials() {
  return (
    <div className="border-b border-stone-100 bg-white py-7">
      <InfiniteSlider gap={72} duration={50} durationOnHover={100} className="w-full">
        {collaborators.map((item) => (
          <div key={item.label} className="flex shrink-0 items-center gap-16">
            <span className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-stone-400 transition-colors duration-300 hover:text-stone-700">
              {item.label}
            </span>
            <span className="select-none text-xs text-stone-200">·</span>
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}
