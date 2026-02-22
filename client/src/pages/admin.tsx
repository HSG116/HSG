import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import {
    Trash2, Eye, Mail, Calendar, MessageSquare,
    Loader2, Lock, Plus, Globe, Code,
    Image as ImageIcon, Layout, X,
    Shield, LogOut, Activity, Users,
    Settings, Search, RefreshCw, Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: number;
    name: string;
    email: string;
    project_type: string;
    message: string;
    created_at: string;
}

interface Project {
    id: number;
    name_ar: string;
    name_en: string;
    description_ar: string;
    description_en: string;
    url: string;
    image_url: string;
    category: string;
    technologies: string[];
    created_at: string;
}

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [activeTab, setActiveTab] = useState<'messages' | 'projects' | 'analytics'>('messages');

    // Data States
    const [messages, setMessages] = useState<Message[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ totalMessages: 0, totalProjects: 0, lastActivity: "" });

    // UI States
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [showAddProject, setShowAddProject] = useState(false);
    const { toast } = useToast();

    // Form State
    const [newProject, setNewProject] = useState({
        name_ar: "",
        name_en: "",
        description_ar: "",
        description_en: "",
        url: "",
        image_url: "",
        category: "general",
        tech1: "",
        tech2: "",
        tech3: ""
    });

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated]);

    const fetchData = async () => {
        setLoading(true);
        await Promise.all([fetchMessages(), fetchProjects()]);
        setLoading(false);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const adminPass = import.meta.env.VITE_APP_ENTRY;
        if (passwordInput === adminPass) {
            setIsAuthenticated(true);
            toast({
                title: "تم التحقق من الكيان",
                description: "مرحباً بك في مركز التحكم السيبراني",
            });
        } else {
            toast({
                title: "فشل الوصول",
                description: "كلمة المرور غير صحيحة",
                variant: "destructive",
            });
        }
    };


    const fetchMessages = async () => {
        try {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setMessages(data || []);
            setStats(prev => ({ ...prev, totalMessages: data?.length || 0 }));
        } catch (error: any) {
            console.error('Error fetching messages:', error);
        }
    };

    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase
                .from('site_projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProjects(data || []);
            setStats(prev => ({ ...prev, totalProjects: data?.length || 0 }));
        } catch (error: any) {
            console.error('Error fetching projects:', error);
        } finally {
            // setLoading(false); // This is now handled by fetchData
        }
    };

    const deleteMessage = async (id: number) => {
        try {
            const { error } = await supabase.from('messages').delete().eq('id', id);
            if (error) throw error;
            setMessages(messages.filter(m => m.id !== id));
            toast({ title: "تم الحذف", description: "تم تطهير الرسالة من النظام" });
        } catch (error) {
            toast({ title: "خطأ", description: "فشل في عملية الحذف", variant: "destructive" });
        }
    };

    const deleteProject = async (id: number) => {
        try {
            const { error } = await supabase.from('site_projects').delete().eq('id', id);
            if (error) throw error;
            setProjects(projects.filter(p => p.id !== id));
            toast({ title: "تم الحذف", description: "تمت إزالة الكيان بنجاح" });
        } catch (error) {
            toast({ title: "خطأ", description: "فشل في عملية الإزالة", variant: "destructive" });
        }
    };

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const technologies = [newProject.tech1, newProject.tech2, newProject.tech3].filter(t => t.trim() !== "");

            const { data, error } = await supabase.from('site_projects').insert([{
                name_ar: newProject.name_ar,
                name_en: newProject.name_en,
                description_ar: newProject.description_ar,
                description_en: newProject.description_en,
                url: newProject.url,
                image_url: newProject.image_url,
                category: newProject.category,
                technologies: technologies
            }]).select();

            if (error) throw error;

            if (data) {
                setProjects([data[0], ...projects]);
                setShowAddProject(false);
                setNewProject({
                    name_ar: "", name_en: "", description_ar: "", description_en: "",
                    url: "", image_url: "", category: "general",
                    tech1: "", tech2: "", tech3: ""
                });
                toast({ title: "تم الإنشاء", description: "تم نشر المشروع الجديد بنجاح" });
            }
        } catch (error: any) {
            console.error(error);
            toast({ title: "خطأ فني", description: error.message || "فشل مزامنة البيانات", variant: "destructive" });
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ar-EG', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
                {/* Security patterns */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-dark border-blue-500/20 rounded-3xl p-10 max-w-md w-full relative z-10"
                >
                    <div className="flex flex-col items-center mb-8">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 shadow-neon-blue"
                        >
                            <Shield className="w-10 h-10 text-blue-400" />
                        </motion.div>
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">مركز التحكم الآمن</h1>
                        <p className="text-gray-400 text-center">الرجاء إدخال رمز الوصول المصرح به للمتابعة</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                            <input
                                type="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-600"
                                placeholder="رمز الدخول السري"
                                autoFocus
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-900/40 active:scale-[0.98]"
                        >
                            تأكيد الهوية
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <span className="text-xs text-blue-500/50 uppercase tracking-[.2em]">Security Protocol v4.0.2</span>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row font-cairo" dir="rtl">
            {/* Sidebar Command Bar */}
            <aside className="w-full md:w-80 bg-black/40 border-l border-white/5 backdrop-blur-xl z-50 p-6 md:sticky md:top-0 md:h-screen flex flex-col">
                <div className="flex items-center gap-4 mb-10 px-2">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-neon-blue">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-xl tracking-tight">إدارة فخام</h1>
                        <div className="flex items-center gap-2 text-green-500 text-[10px] font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            متصل بالنظام
                        </div>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    <SidebarLink
                        active={activeTab === 'messages'}
                        icon={<MessageSquare className="w-5 h-5" />}
                        label="صندوق الرسائل"
                        count={messages.length}
                        onClick={() => setActiveTab('messages')}
                    />
                    <SidebarLink
                        active={activeTab === 'projects'}
                        icon={<Layers className="w-5 h-5" />}
                        label="إدارة المشاريع"
                        count={projects.length}
                        onClick={() => setActiveTab('projects')}
                    />
                    <SidebarLink
                        active={activeTab === 'analytics'}
                        icon={<Activity className="w-5 h-5" />}
                        label="الإحصائيات"
                        onClick={() => setActiveTab('analytics')}
                    />
                </nav>

                <div className="mt-auto pt-6 space-y-4">
                    <div className="glass-dark p-4 rounded-2xl border-white/5">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-gray-500">حالة السيرفر</span>
                            <span className="text-xs text-blue-400 font-bold">99.9%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[99.9%]" />
                        </div>
                    </div>

                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all group"
                    >
                        <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>تسجيل الخروج</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {activeTab === 'messages' && "رسائل العملاء"}
                            {activeTab === 'projects' && "كتالوج المشاريع"}
                            {activeTab === 'analytics' && "مركز البيانات"}
                        </h2>
                        <p className="text-gray-500">مرحباً بعودتك، المسؤول HSG</p>
                    </div>

                    <div className="flex gap-4">
                        <div className="relative group">
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                            <input
                                className="bg-white/5 border border-white/10 rounded-xl pr-10 pl-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-all w-64"
                                placeholder="ابحث في النظام..."
                            />
                        </div>
                        <button
                            onClick={fetchData}
                            className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-40"
                        >
                            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                            <p className="text-gray-500 font-bold animate-pulse">جاري جلب البيانات من السحابة...</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            {activeTab === 'messages' && (
                                <div className="space-y-4">
                                    {messages.length === 0 ? (
                                        <div className="glass-dark rounded-3xl p-20 text-center text-gray-500 border-dashed border-2 border-white/5">
                                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Mail className="w-8 h-8 opacity-20" />
                                            </div>
                                            لا توجد رسائل واردة حالياً
                                        </div>
                                    ) : (
                                        messages.map((message) => (
                                            <motion.div
                                                layout
                                                key={message.id}
                                                className="glass-dark border-white/5 rounded-2xl p-6 hover:border-blue-500/30 transition-all group relative overflow-hidden"
                                            >
                                                <div className="absolute top-0 right-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold">
                                                                {message.name[0]}
                                                            </div>
                                                            <div>
                                                                <h3 className="font-bold text-lg">{message.name}</h3>
                                                                <p className="text-sm text-gray-500 font-mono">{message.email}</p>
                                                            </div>
                                                        </div>
                                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300 leading-relaxed mb-4">
                                                            {message.message}
                                                        </div>
                                                        <div className="flex items-center gap-4 text-xs">
                                                            <span className="flex items-center gap-1.5 text-blue-400/70 bg-blue-400/5 px-3 py-1.5 rounded-full border border-blue-400/10">
                                                                <Layout className="w-3.5 h-3.5" />
                                                                {message.project_type}
                                                            </span>
                                                            <span className="flex items-center gap-1.5 text-gray-500">
                                                                <Calendar className="w-3.5 h-3.5" />
                                                                {formatDate(message.created_at)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => deleteMessage(message.id)}
                                                        className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </div>
                            )}

                            {activeTab === 'projects' && (
                                <div className="space-y-8">
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-500">عرض جميع المشاريع المنشورة في البورتفوليو</p>
                                        <button
                                            onClick={() => setShowAddProject(true)}
                                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-900/40 font-bold active:scale-[0.98]"
                                        >
                                            <Plus className="w-5 h-5" />
                                            إضافة وحدة مشروع
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {projects.map((project) => (
                                            <motion.div
                                                key={project.id}
                                                className="glass-dark border-white/5 rounded-3xl overflow-hidden group hover:border-blue-500/30 transition-all"
                                            >
                                                <div className="relative h-56 overflow-hidden">
                                                    <img src={project.image_url || '/placeholder.png'} alt={project.name_ar} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                                    <div className="absolute top-4 right-4 flex gap-2">
                                                        <button
                                                            onClick={() => deleteProject(project.id)}
                                                            className="p-3 bg-red-500 rounded-xl text-white shadow-xl hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <div className="absolute bottom-4 right-4">
                                                        <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-600/90 backdrop-blur px-3 py-1.5 rounded-lg text-white">
                                                            {project.category}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="font-bold text-xl mb-3">{project.name_ar}</h3>
                                                    <div className="flex gap-2 flex-wrap min-h-[3.5rem]">
                                                        {project.technologies?.map((tech, i) => (
                                                            <span key={i} className="text-[10px] font-bold bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-lg text-gray-400">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                                                        <a
                                                            href={project.url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors underline decoration-blue-500/30"
                                                        >
                                                            <Globe className="w-3.5 h-3.5" />
                                                            معاينة حية
                                                        </a>
                                                        <span className="text-[10px] text-gray-600 font-mono">
                                                            ID: #{project.id.toString().padStart(4, '0')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'analytics' && (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <StatCard icon={<Users className="w-6 h-6" />} label="الزيارات اليومية" value="1,284" color="blue" />
                                        <StatCard icon={<MessageSquare className="w-6 h-6" />} label="إجمالي الرسائل" value={stats.totalMessages} color="purple" />
                                        <StatCard icon={<Layers className="w-6 h-6" />} label="المشاريع المنشورة" value={stats.totalProjects} color="green" />
                                        <StatCard icon={<Activity className="w-6 h-6" />} label="وقت التشغيل" value="99.9%" color="blue" />
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        <div className="lg:col-span-2 glass-dark p-8 rounded-[35px] border-white/5">
                                            <div className="flex items-center justify-between mb-8">
                                                <h3 className="text-xl font-bold flex items-center gap-3">
                                                    <Activity className="w-6 h-6 text-blue-400" />
                                                    سجل نشاط النظام الأخير
                                                </h3>
                                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg">Real-time Feed</span>
                                            </div>

                                            <div className="space-y-4 font-mono text-xs">
                                                <ActivityLogItem
                                                    time="12:45:02"
                                                    action="PROJECT_DEPLOYED"
                                                    detail="New project 'Smart Home AI' successfully synchronized with Supabase."
                                                    status="success"
                                                />
                                                <ActivityLogItem
                                                    time="11:20:15"
                                                    action="AUTH_VERIFIED"
                                                    detail="Admin session established from secure entity terminal."
                                                    status="info"
                                                />
                                                <ActivityLogItem
                                                    time="09:05:44"
                                                    action="DATABASE_QUERY"
                                                    detail="Optimization protocol: Vacuumed site_projects table records."
                                                    status="success"
                                                />
                                                <ActivityLogItem
                                                    time="08:12:00"
                                                    action="MESSAGE_RECEIVED"
                                                    detail="New secure communication packet intercepted from user: Omar K."
                                                    status="info"
                                                />
                                            </div>
                                        </div>

                                        <div className="glass-dark p-8 rounded-[35px] border-white/5 space-y-8">
                                            <h3 className="text-xl font-bold">أداء الخادم</h3>

                                            <MetricItem label="استجابة قاعدة البيانات" percentage={98} value="42ms" color="blue" />
                                            <MetricItem label="سرعة تحميل الصور" percentage={92} value="0.8s" color="purple" />
                                            <MetricItem label="أرشفة المحرك (SEO)" percentage={95} value="Rank: A" color="green" />
                                            <MetricItem label="تخزين الكاش الأولي" percentage={88} value="1.2GB" color="blue" />
                                        </div>
                                    </div>

                                    <div className="glass-dark p-10 rounded-3xl border-white/5 text-center mt-8">
                                        <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Layers className="w-10 h-10 text-blue-500 animate-pulse" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">نظام تحليل البيانات المتقدم</h3>
                                        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
                                            يتم حالياً تكوين مصفوفة التحليلات الشاملة. سيتيح هذا القسم قريباً الوصول إلى خرائط النقاط الساخنة (Heatmaps) وسلوك المستخدمين المتقدم عبر Google Analytics 4.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Redesigned Add Project Modal */}
            <AnimatePresence>
                {showAddProject && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            onClick={() => setShowAddProject(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="glass-dark border-white/10 rounded-[35px] w-full max-w-5xl max-h-[90vh] overflow-hidden relative z-10"
                        >
                            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
                                        <Plus className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">تسجيل مشروع جديد</h2>
                                        <p className="text-xs text-gray-500">املأ البيانات لنشر المشروع على الموقع الرئيسي</p>
                                    </div>
                                </div>
                                <button onClick={() => setShowAddProject(false)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            <div className="p-8 overflow-y-auto max-h-[calc(90vh-100px)] custom-scrollbar">
                                <form onSubmit={handleCreateProject} className="space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        {/* Arabic Info */}
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-2 text-blue-400 font-bold border-b border-blue-500/10 pb-4">
                                                <span className="w-2 h-6 bg-blue-500 rounded-full" />
                                                المحتوى العربي الرقمي
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs text-gray-500 font-bold uppercase tracking-wider pr-1">اسم الموقع</label>
                                                <input
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-blue-500 outline-none transition-all placeholder:text-gray-700"
                                                    value={newProject.name_ar}
                                                    onChange={e => setNewProject({ ...newProject, name_ar: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs text-gray-500 font-bold uppercase tracking-wider pr-1">وصف مقتضب</label>
                                                <textarea
                                                    required
                                                    rows={4}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-blue-500 outline-none transition-all resize-none placeholder:text-gray-700"
                                                    value={newProject.description_ar}
                                                    onChange={e => setNewProject({ ...newProject, description_ar: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        {/* English Info */}
                                        <div className="space-y-6" dir="ltr">
                                            <div className="flex items-center gap-2 text-purple-400 font-bold border-b border-purple-500/10 pb-4">
                                                <span className="w-2 h-6 bg-purple-500 rounded-full" />
                                                ENGLISH DEPLOYMENT DATA
                                            </div>
                                            <div className="space-y-2 text-left">
                                                <label className="text-xs text-gray-500 font-bold uppercase tracking-wider pl-1">SITE NAME</label>
                                                <input
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-purple-500 outline-none transition-all placeholder:text-gray-700"
                                                    value={newProject.name_en}
                                                    onChange={e => setNewProject({ ...newProject, name_en: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2 text-left">
                                                <label className="text-xs text-gray-500 font-bold uppercase tracking-wider pl-1">SHORT DESCRIPTION</label>
                                                <textarea
                                                    rows={4}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-purple-500 outline-none transition-all resize-none placeholder:text-gray-700"
                                                    value={newProject.description_en}
                                                    onChange={e => setNewProject({ ...newProject, description_en: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/5">
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-500 font-bold flex items-center gap-2">
                                                <Globe className="w-3.5 h-3.5" /> رابط الوصول
                                            </label>
                                            <input
                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-blue-500 outline-none"
                                                dir="ltr"
                                                placeholder="https://example.com"
                                                value={newProject.url}
                                                onChange={e => setNewProject({ ...newProject, url: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-xs text-gray-500 font-bold flex items-center gap-2">
                                                <ImageIcon className="w-3.5 h-3.5" /> رابط الصورة (CDN)
                                            </label>
                                            <input
                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-blue-500 outline-none"
                                                dir="ltr"
                                                placeholder="https://images.unsplash.com/..."
                                                value={newProject.image_url}
                                                onChange={e => setNewProject({ ...newProject, image_url: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-500 font-bold flex items-center gap-2 uppercase tracking-widest pr-1">
                                                <Layout className="w-3.5 h-3.5" /> تصنيف التقنية
                                            </label>
                                            <select
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-blue-500 outline-none appearance-none cursor-pointer"
                                                value={newProject.category}
                                                onChange={e => setNewProject({ ...newProject, category: e.target.value })}
                                            >
                                                <option value="general" className="bg-black">عام (General)</option>
                                                <option value="web" className="bg-black">تطبيقات ويب (Web Apps)</option>
                                                <option value="mobile" className="bg-black">تطبيقات جوال (Mobile Apps)</option>
                                                <option value="design" className="bg-black">تصميم (UI/UX)</option>
                                                <option value="ai" className="bg-black">ذكاء اصطناعي (AI)</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-500 font-bold flex items-center gap-2 uppercase tracking-widest pl-1" dir="ltr">
                                                <Code className="w-3.5 h-3.5" /> TECHNOLOGIES STACK
                                            </label>
                                            <div className="grid grid-cols-3 gap-3" dir="ltr">
                                                <TechInput placeholder="Tech 1" value={newProject.tech1} onChange={v => setNewProject({ ...newProject, tech1: v })} />
                                                <TechInput placeholder="Tech 2" value={newProject.tech2} onChange={v => setNewProject({ ...newProject, tech2: v })} />
                                                <TechInput placeholder="Tech 3" value={newProject.tech3} onChange={v => setNewProject({ ...newProject, tech3: v })} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-8">
                                        <button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-blue-600 to-blue-900 hover:from-blue-500 hover:to-blue-800 text-white font-bold py-5 rounded-[22px] transition-all shadow-[0_20px_40px_rgba(37,99,235,0.2)] active:scale-[0.99] flex items-center justify-center gap-3"
                                        >
                                            <Plus className="w-6 h-6" />
                                            اعتماد ونشر المشروع في النظام
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Sub-components for cleaner code
function SidebarLink({ active, icon, label, count, onClick }: { active: boolean, icon: any, label: string, count?: number, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 group ${active
                ? 'bg-blue-600 text-white shadow-neon-blue'
                : 'text-gray-500 hover:bg-white/5 hover:text-white'
                }`}
        >
            <div className="flex items-center gap-4">
                <div className={`${active ? 'text-white' : 'text-gray-500 group-hover:text-blue-400'} transition-colors`}>
                    {icon}
                </div>
                <span className="font-bold text-sm tracking-tight">{label}</span>
            </div>
            {count !== undefined && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-500'
                    }`}>
                    {count}
                </span>
            )}
        </button>
    );
}

function StatCard({ icon, label, value, color }: { icon: any, label: string, value: any, color: 'blue' | 'purple' | 'green' }) {
    const colorClasses = {
        blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20 shadow-blue-500/10',
        purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20 shadow-purple-500/10',
        green: 'text-green-400 bg-green-500/10 border-green-500/20 shadow-green-500/10',
    };

    return (
        <div className="glass-dark border-white/5 p-6 rounded-[28px] group hover:border-blue-500/20 transition-all">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border shadow-sm ${colorClasses[color]}`}>
                {icon}
            </div>
            <p className="text-gray-500 text-sm font-bold mb-1">{label}</p>
            <h3 className="text-4xl font-black tracking-tight">{value}</h3>
        </div>
    );
}

function TechInput({ placeholder, value, onChange }: { placeholder: string, value: string, onChange: (v: string) => void }) {
    return (
        <input
            placeholder={placeholder}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs focus:border-purple-500 outline-none transition-all text-center tracking-wider"
            value={value}
            onChange={e => onChange(e.target.value)}
        />
    );
}

function ActivityLogItem({ time, action, detail, status }: { time: string, action: string, detail: string, status: 'success' | 'info' | 'warning' }) {
    const statusColors = {
        success: 'text-green-500',
        info: 'text-blue-400',
        warning: 'text-yellow-500'
    };

    return (
        <div className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
            <span className="text-gray-600 font-bold whitespace-nowrap">[{time}]</span>
            <div>
                <span className={`font-bold mr-2 ${statusColors[status]}`}>{action}:</span>
                <span className="text-gray-400">{detail}</span>
            </div>
        </div>
    );
}

function MetricItem({ label, percentage, value, color }: { label: string, percentage: number, value: string, color: 'blue' | 'purple' | 'green' }) {
    const colors = {
        blue: 'bg-blue-500',
        purple: 'bg-purple-500',
        green: 'bg-green-500'
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-gray-400 uppercase tracking-widest">{label}</span>
                <span className="text-white bg-white/5 px-2 py-0.5 rounded-lg">{value}</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full ${colors[color]}`}
                />
            </div>
        </div>
    );
}
