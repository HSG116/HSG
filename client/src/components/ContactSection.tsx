
import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { Send, Sparkles, Loader2, Phone, Mail, Clock } from "lucide-react";

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

  const contactItems = [
    {
      icon: "fab fa-tiktok",
      label: "TikTok",
      href: "https://tiktok.com/@hsg-new",
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      border: "border-pink-500/20"
    },
    {
      icon: "fab fa-youtube",
      label: "YouTube",
      href: "https://youtube.com/@hsgmohammed",
      color: "text-red-500",
      bg: "bg-red-500/10",
      border: "border-red-500/20"
    },
    {
      icon: "fab fa-whatsapp",
      label: "WhatsApp",
      href: "https://wa.me/972592311460",
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/20"
    },
    {
      icon: "fas fa-envelope",
      label: "Email",
      href: "mailto:hsg.mohammed1@gmail.com",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
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
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

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
          <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-100 via-white to-blue-100 mb-6 font-cairo pb-2 inline-block">
            {t("contact.heading")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Visual Side & Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Info Card */}
            <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">{t("contact.why_choose_us")}</h3>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                    1
                  </div>
                  {t("contact.feature_modern")}
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                    2
                  </div>
                  {t("contact.feature_performance")}
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                    3
                  </div>
                  {t("contact.feature_support")}
                </li>
              </ul>
            </div>

            {/* Social Links Grid */}
            <div className="grid grid-cols-2 gap-3">
              {contactItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border ${item.border} ${item.bg} hover:scale-105 transition-transform duration-300 group`}
                >
                  <i className={`${item.icon} text-2xl ${item.color} mb-2`}></i>
                  <span className="text-xs font-medium text-gray-300">{item.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form Side */}
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
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t("contact.sending")}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
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
