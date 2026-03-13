import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { Send, Sparkles, Loader2, Phone, Clock } from "lucide-react";

export default function ContactSection() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    description: "",
  });

  const socialLinks = [
    {
      id: "x",
      platform: "x",
      icon: "fab fa-x-twitter",
      label: "X (Twitter)",
      href: "https://x.com/HSG116K",
      color: "text-white",
      bg: "bg-black/80",
      border: "border-white/20"
    },
    {
      id: "instagram",
      platform: "instagram",
      icon: "fab fa-instagram",
      label: "Instagram",
      href: "https://www.instagram.com/hs6_new/",
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20"
    },
    {
      id: "whatsapp",
      platform: "whatsapp",
      icon: "fab fa-whatsapp",
      label: "WhatsApp",
      href: "https://wa.me/14167377776",
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/20"
    },
    {
      id: "email",
      platform: "email",
      icon: "fas fa-envelope",
      label: t("contact.email_label"),
      href: "mailto:hsg.mohammed1@gmail.com",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20"
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            project_type: formData.projectType || 'general',
            message: formData.description,
            created_at: new Date().toISOString(),
          }
        ]);

      if (error) throw error;

      toast({
        title: t("contact.success_title"),
        description: t("contact.success_desc"),
        duration: 5000,
      });

      setFormData({
        name: "",
        email: "",
        projectType: "",
        description: "",
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: t("contact.error_title"),
        description: error.message || t("contact.error_desc"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute top-0 start-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 end-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {t("contact.badge")}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500 mb-6 py-4 leading-[1.2] inline-block">
            {t("contact.heading")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/10 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 end-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -me-16 -mt-16 group-hover:bg-blue-500/20 transition-colors" />

              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                HSG Studio
                <span className="flex items-center gap-1.5 ms-auto text-[10px] uppercase tracking-widest font-bold text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
                  <span className="text-base leading-none">🇨🇦</span> Canada HQ
                </span>
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                    <i className="fas fa-map-marker-alt text-blue-400"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-1">{t("contact.company_address_title")}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      201 Lormont BLVD, Stoney Creek ON. Canada<br />
                      L8J 0K1
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-1">{t("contact.office_title")}</h4>
                    <a href="https://wa.me/14167377776" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-white hover:text-blue-400 transition-colors">
                      +1 (416) 737-7776
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-1">{t("contact.working_hours_title")}</h4>
                    <p className="text-sm text-white font-medium">{t("contact.working_hours_days")}</p>
                    <p className="text-xs text-gray-400">{t("contact.working_hours_time")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">{t("contact.why_choose_us")}</h3>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-xs">
                    01
                  </div>
                  {t("contact.feature_modern")}
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-xs">
                    02
                  </div>
                  {t("contact.feature_performance")}
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-xs">
                    03
                  </div>
                  {t("contact.feature_support")}
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border ${item.border} ${item.bg} hover:scale-105 transition-transform duration-300 group`}
                >
                  {item.platform === 'x' ? (
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white mb-2" aria-hidden="true">
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z" />
                    </svg>
                  ) : (
                    <i className={`${item.icon} text-2xl ${item.color} mb-2`}></i>
                  )}
                  <span className="text-xs font-medium text-gray-300">{item.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="bg-card/30 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    {t("contact.name_label")}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-gray-600"
                    placeholder={t("contact.name_placeholder")}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">{t("contact.email_label")}</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-gray-600"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label htmlFor="projectType" className="text-sm font-medium text-gray-300">{t("contact.project_type_label")}</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-gray-300"
                >
                  <option value="" disabled>{t("contact.project_type_placeholder")}</option>
                  <option value="website">{t("contact.project_type_website")}</option>
                  <option value="design">{t("contact.project_type_design")}</option>
                  <option value="other">{t("contact.project_type_other")}</option>
                </select>
              </div>

              <div className="space-y-2 mb-8">
                <label htmlFor="description" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  {t("contact.message_label")}
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none placeholder:text-gray-600"
                  placeholder={t("contact.message_placeholder")}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r rtl:bg-gradient-to-l from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t("contact.sending")}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 rtl:-scale-x-100" />
                    {t("contact.send")}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
