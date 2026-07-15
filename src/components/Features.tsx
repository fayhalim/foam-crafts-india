import { Sparkles, Maximize, Tag, Truck, Boxes, MapPin } from 'lucide-react';

const features = [
  { icon: Sparkles, title: 'Premium Quality Materials', desc: 'Crafted with precision using the finest orthopedic and memory foams.' },
  { icon: Maximize, title: 'Custom Size & Thickness', desc: 'Tailored perfectly to your bed frame and comfort requirements.' },
  { icon: Tag, title: 'Factory Direct Pricing', desc: 'Eliminating middlemen to give you the best value for your investment.' },
  { icon: Truck, title: 'Fast & Reliable Delivery', desc: 'Ensuring your new mattress reaches you safely and promptly.' },
  { icon: Boxes, title: 'Wholesale & Bulk Supply', desc: 'Trusted partner for hotels, hospitals, and institutional buyers.' },
  { icon: MapPin, title: 'Made in India', desc: 'Proudly manufactured in Varanasi, serving customers nationwide.' },
];

export default function Features() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Foam Crafts India?</h2>
          <p className="text-lg text-slate-600">
            Every mattress is crafted with precision and undergoes strict quality checks to ensure lasting comfort, durability, and excellent value.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100/50 transition-all group">
                <div className="w-14 h-14 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
