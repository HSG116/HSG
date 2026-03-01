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
import { Link as LinkIcon, Share2, CheckCircle2, Circle } from "lucide-react";

interface Message {
    id: number;
    name: string;
    email: string;
    project_type: string;
    message: string;
    created_at: string;
}

interface SocialLink {
    id: number;
    platform: string;
    url: string;
    is_active: boolean;
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
    const [activeTab, setActiveTab] = useState<'messages' | 'projects' | 'analytics' | 'social'>('messages');

    // Data States
    const [messages, setMessages] = useState<Message[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ totalMessages: 0, totalProjects: 0, lastActivity: "" });

    // UI States
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [showAddProject, setShowAddProject] = useState(false);
    const { toast } = useToast();

    // Form State
    const [newProject, setNewProject] = useState({
        name_en: "",
        description_en: "",
        url: "",
        image_url: "",
        category: "web",
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
        await Promise.all([fetchMessages(), fetchProjects(), fetchSocialLinks()]);
        setLoading(false);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const adminPass = import.meta.env.VITE_X_3;
        if (passwordInput === adminPass) {
            setIsAuthenticated(true);
            toast({
                title: "Identity Verified",
                description: "Welcome back to the Cyber Control Center",
            });
        } else {
            toast({
                title: "Access Failed",
                description: "Incorrect security code",
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
        }
    };

    const fetchSocialLinks = async () => {
        try {
            const { data, error } = await supabase
                .from('social_links')
                .select('*')
                .order('id', { ascending: true });

            if (error) throw error;
            setSocialLinks(data || []);
        } catch (error: any) {
            console.error('Error fetching social links:', error);
        }
    };

    const toggleSocialLink = async (id: number, currentStatus: boolean) => {
        const activeCount = socialLinks.filter(l => l.is_active).length;
        if (!currentStatus && activeCount >= 4) {
            toast({ title: "Warning", description: "You can enable a maximum of 4 links for display", variant: "destructive" });
            return;
        }

        try {
            const { error } = await supabase.from('social_links').update({ is_active: !currentStatus }).eq('id', id);
            if (error) throw error;
            setSocialLinks(socialLinks.map(link => link.id === id ? { ...link, is_active: !currentStatus } : link));
        } catch (error: any) {
            toast({ title: "Error", description: "Failed to update link status", variant: "destructive" });
        }
    };

    const updateSocialUrl = async (id: number, url: string) => {
        try {
            const { error } = await supabase.from('social_links').update({ url }).eq('id', id);
            if (error) throw error;
            setSocialLinks(socialLinks.map(link => link.id === id ? { ...link, url } : link));
            toast({ title: "Saved", description: "Link updated successfully" });
        } catch (error: any) {
            toast({ title: "Error", description: "Failed to update link", variant: "destructive" });
        }
    };

    const deleteMessage = async (id: number) => {
        try {
            const { error } = await supabase.from('messages').delete().eq('id', id);
            if (error) throw error;
            setMessages(messages.filter(m => m.id !== id));
            toast({ title: "Purged", description: "Message removed from the system" });
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete message", variant: "destructive" });
        }
    };

    const deleteProject = async (id: number) => {
        try {
            const { error } = await supabase.from('site_projects').delete().eq('id', id);
            if (error) throw error;
            setProjects(projects.filter(p => p.id !== id));
            toast({ title: "Deleted", description: "Entity removed successfully" });
        } catch (error) {
            toast({ title: "Error", description: "Failed to remove entity", variant: "destructive" });
        }
    };

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const technologies = [newProject.tech1, newProject.tech2, newProject.tech3].filter(t => t.trim() !== "");

            const { data, error } = await supabase.from('site_projects').insert([{
                name_ar: newProject.name_en,
                name_en: newProject.name_en,
                description_ar: newProject.description_en,
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
                    name_en: "", description_en: "",
                    url: "", image_url: "", category: "web",
                    tech1: "", tech2: "", tech3: ""
                });
                toast({ title: "Created", description: "New project deployed successfully" });
            }
        } catch (error: any) {
            console.error(error);
            toast({ title: "Technical Error", description: error.message || "Data sync failed", variant: "destructive" });
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-CA', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
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
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Access Terminal</h1>
                        <p className="text-gray-400 text-center">Enter authorized security code to proceed</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                            <input
                                type="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-600"
                                placeholder="Security Code"
                                autoFocus
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-900/40 active:scale-[0.98]"
                        >
                            Verify Identity
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
        <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row font-outfit" dir="ltr">
            <aside className="w-full md:w-80 bg-black/40 border-r border-white/5 backdrop-blur-xl z-50 p-6 md:sticky md:top-0 md:h-screen flex flex-col">
                <div className="flex items-center gap-4 mb-10 px-2">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-neon-blue">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-xl tracking-tight">HSG Console</h1>
                        <div className="flex items-center gap-2 text-green-500 text-[10px] font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            System Online
                        </div>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    <SidebarLink
                        active={activeTab === 'messages'}
                        icon={<MessageSquare className="w-5 h-5" />}
                        label="Inbox"
                        count={messages.length}
                        onClick={() => setActiveTab('messages')}
                    />
                    <SidebarLink
                        active={activeTab === 'projects'}
                        icon={<Layers className="w-5 h-5" />}
                        label="Project Manager"
                        count={projects.length}
                        onClick={() => setActiveTab('projects')}
                    />
                    <SidebarLink
                        active={activeTab === 'social'}
                        icon={<Share2 className="w-5 h-5" />}
                        label="Social Links"
                        onClick={() => setActiveTab('social')}
                    />
                    <SidebarLink
                        active={activeTab === 'analytics'}
                        icon={<Activity className="w-5 h-5" />}
                        label="Analytics"
                        onClick={() => setActiveTab('analytics')}
                    />
                </nav>

                <div className="mt-auto pt-6 space-y-4">
                    <div className="glass-dark p-4 rounded-2xl border-white/5">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-gray-500">Server Health</span>
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
                        <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {activeTab === 'messages' && "Customer Messages"}
                            {activeTab === 'projects' && "Project Catalog"}
                            {activeTab === 'social' && "Social Media"}
                            {activeTab === 'analytics' && "Data Center"}
                        </h2>
                        <p className="text-gray-500">Welcome back, Admin HSG</p>
                    </div>

                    <div className="flex gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                            <input
                                className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-all w-64"
                                placeholder="Search system..."
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
                            <p className="text-gray-500 font-bold animate-pulse">Syncing data from cloud...</p>
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
                                            No incoming messages
                                        </div>
                                    ) : (
                                        messages.map((message) => (
                                            <motion.div
                                                layout
                                                key={message.id}
                                                className="glass-dark border-white/5 rounded-2xl p-6 hover:border-blue-500/30 transition-all group relative overflow-hidden"
                                            >
                                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                                        <p className="text-gray-500">Managing all published portfolio entities</p>
                                        <button
                                            onClick={() => setShowAddProject(true)}
                                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-900/40 font-bold active:scale-[0.98]"
                                        >
                                            <Plus className="w-5 h-5" />
                                            Add Project Entity
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {projects.map((project) => (
                                            <motion.div
                                                key={project.id}
                                                className="glass-dark border-white/5 rounded-3xl overflow-hidden group hover:border-blue-500/30 transition-all"
                                            >
                                                <div className="relative h-56 overflow-hidden">
                                                    <img src={project.image_url || '/placeholder.png'} alt={project.name_en} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                                    <div className="absolute top-4 right-4 flex gap-2">
                                                        <button
                                                            onClick={() => deleteProject(project.id)}
                                                            className="p-3 bg-red-500 rounded-xl text-white shadow-xl hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <div className="absolute bottom-4 left-4">
                                                        <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-600/90 backdrop-blur px-3 py-1.5 rounded-lg text-white">
                                                            {project.category}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="font-bold text-xl mb-3">{project.name_en}</h3>
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
                                                            Live Preview
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

                            {activeTab === 'social' && (
                                <div className="space-y-8">
                                    <div className="flex justify-between items-center mb-8">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-2">Social Hub</h3>
                                            <p className="text-gray-500 text-sm">Configure your public social endpoints. <strong className="text-blue-400">Max 4 active links supported.</strong></p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {socialLinks.map((link) => {
                                            const getIcon = (platform: string) => {
                                                switch (platform) {
                                                    case 'tiktok': return { icon: "fab fa-tiktok", color: "text-pink-500", label: "TikTok" };
                                                    case 'instagram': return { icon: "fab fa-instagram", color: "text-rose-500", label: "Instagram" };
                                                    case 'facebook': return { icon: "fab fa-facebook-f", color: "text-blue-600", label: "Facebook" };
                                                    case 'youtube': return { icon: "fab fa-youtube", color: "text-red-500", label: "YouTube" };
                                                    case 'whatsapp': return { icon: "fab fa-whatsapp", color: "text-green-500", label: "WhatsApp" };
                                                    case 'email': return { icon: "fas fa-envelope", color: "text-blue-400", label: "Email" };
                                                    default: return { icon: "fas fa-link", color: "text-gray-400", label: platform };
                                                }
                                            };
                                            const platformInfo = getIcon(link.platform);
                                            return (
                                                <SocialLinkEditor
                                                    key={link.id}
                                                    link={link}
                                                    platformInfo={platformInfo}
                                                    onToggle={() => toggleSocialLink(link.id, link.is_active)}
                                                    onSave={(newUrl) => updateSocialUrl(link.id, newUrl)}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'analytics' && (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <StatCard icon={<Users className="w-6 h-6" />} label="Daily Reach" value="1,284" color="blue" />
                                        <StatCard icon={<MessageSquare className="w-6 h-6" />} label="Total Inquiries" value={stats.totalMessages} color="purple" />
                                        <StatCard icon={<Layers className="w-6 h-6" />} label="Active Projects" value={stats.totalProjects} color="green" />
                                        <StatCard icon={<Activity className="w-6 h-6" />} label="Avg. Uptime" value="99.9%" color="blue" />
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        <div className="lg:col-span-2 glass-dark p-8 rounded-[35px] border-white/5">
                                            <div className="flex items-center justify-between mb-8">
                                                <h3 className="text-xl font-bold flex items-center gap-3">
                                                    <Activity className="w-6 h-6 text-blue-400" />
                                                    Live Activity Log
                                                </h3>
                                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg">Real-time Feed</span>
                                            </div>

                                            <div className="space-y-4 font-mono text-xs">
                                                <ActivityLogItem
                                                    time="12:45:02"
                                                    action="PROJECT_DEPLOYED"
                                                    detail="New project 'Smart Home AI' successfully synchronized."
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
                                                    detail="Optimization protocol: Vacuumed system records."
                                                    status="success"
                                                />
                                                <ActivityLogItem
                                                    time="08:12:00"
                                                    action="MESSAGE_RECEIVED"
                                                    detail="New secure communication packet intercepted."
                                                    status="info"
                                                />
                                            </div>
                                        </div>

                                        <div className="glass-dark p-8 rounded-[35px] border-white/5 space-y-8">
                                            <h3 className="text-xl font-bold">Performance Metrics</h3>

                                            <MetricItem label="Database Latency" percentage={98} value="42ms" color="blue" />
                                            <MetricItem label="CDN Load Speed" percentage={92} value="0.8s" color="purple" />
                                            <MetricItem label="SEO Index Score" percentage={95} value="Rank: A" color="green" />
                                            <MetricItem label="Initial Cache" percentage={88} value="1.2GB" color="blue" />
                                        </div>
                                    </div>

                                    <div className="glass-dark p-10 rounded-3xl border-white/5 text-center mt-8">
                                        <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Layers className="w-10 h-10 text-blue-500 animate-pulse" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Advanced Analytics Matrix</h3>
                                        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
                                            Configuring comprehensive analytics core. This module will soon provide access to deep behavioral insights and heatmaps via GA4.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

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
                                        <h2 className="text-2xl font-bold">Register New Project</h2>
                                        <p className="text-xs text-gray-500">Provide entity data for external deployment</p>
                                    </div>
                                </div>
                                <button onClick={() => setShowAddProject(false)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            <div className="p-8 overflow-y-auto max-h-[calc(90vh-100px)] custom-scrollbar">
                                <form onSubmit={handleCreateProject} className="space-y-10">
                                    <div className="grid grid-cols-1 gap-10">
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-2 text-purple-400 font-bold border-b border-purple-500/10 pb-4 uppercase tracking-widest">
                                                <span className="w-2 h-6 bg-purple-500 rounded-full" />
                                                Entity Metadata
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">PROJECT TITLE</label>
                                                <input
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-purple-500 outline-none transition-all placeholder:text-gray-700 font-outfit"
                                                    value={newProject.name_en}
                                                    onChange={e => setNewProject({ ...newProject, name_en: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">SHORT DESCRIPTION</label>
                                                <textarea
                                                    rows={4}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-purple-500 outline-none transition-all resize-none placeholder:text-gray-700 font-outfit"
                                                    value={newProject.description_en}
                                                    onChange={e => setNewProject({ ...newProject, description_en: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/5">
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-500 font-bold flex items-center gap-2 uppercase">
                                                <Globe className="w-3.5 h-3.5" /> DEPLOYMENT URL
                                            </label>
                                            <input
                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-blue-500 outline-none font-outfit"
                                                placeholder="https://example.com"
                                                value={newProject.url}
                                                onChange={e => setNewProject({ ...newProject, url: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-xs text-gray-500 font-bold flex items-center gap-2 uppercase">
                                                <ImageIcon className="w-3.5 h-3.5" /> ASSET URL (CDN)
                                            </label>
                                            <input
                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-blue-500 outline-none font-outfit"
                                                placeholder="https://images.unsplash.com/..."
                                                value={newProject.image_url}
                                                onChange={e => setNewProject({ ...newProject, image_url: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-500 font-bold flex items-center gap-2 uppercase tracking-widest">
                                                <Layout className="w-3.5 h-3.5" /> TECH CLASSIFICATION
                                            </label>
                                            <select
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-blue-500 outline-none appearance-none cursor-pointer font-outfit"
                                                value={newProject.category}
                                                onChange={e => setNewProject({ ...newProject, category: e.target.value })}
                                            >
                                                <option value="web" className="bg-black">Web Development</option>
                                                <option value="ai" className="bg-black">Artificial Intelligence (AI)</option>
                                                <option value="islamic" className="bg-black">Islamic Applications</option>
                                                <option value="tools" className="bg-black">Utility Tools</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-500 font-bold flex items-center gap-2 uppercase tracking-widest">
                                                <Code className="w-3.5 h-3.5" /> TECHNOLOGY STACK
                                            </label>
                                            <div className="grid grid-cols-3 gap-3">
                                                <TechInput placeholder="Tech 1" value={newProject.tech1} onChange={v => setNewProject({ ...newProject, tech1: v })} />
                                                <TechInput placeholder="Tech 2" value={newProject.tech2} onChange={v => setNewProject({ ...newProject, tech2: v })} />
                                                <TechInput placeholder="Tech 3" value={newProject.tech3} onChange={v => setNewProject({ ...newProject, tech3: v })} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-8">
                                        <button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-blue-600 to-blue-900 hover:from-blue-500 hover:to-blue-800 text-white font-bold py-5 rounded-[22px] transition-all shadow-[0_20px_40px_rgba(37,99,235,0.2)] active:scale-[0.99] flex items-center justify-center gap-3 uppercase tracking-widest"
                                        >
                                            <Plus className="w-6 h-6" />
                                            Confirm and Deploy to Production
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
            <p className="text-gray-500 text-sm font-bold mb-1 uppercase tracking-wider">{label}</p>
            <h3 className="text-4xl font-black tracking-tight">{value}</h3>
        </div>
    );
}

function TechInput({ placeholder, value, onChange }: { placeholder: string, value: string, onChange: (v: string) => void }) {
    return (
        <input
            placeholder={placeholder}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs focus:border-purple-500 outline-none transition-all text-center tracking-wider font-outfit"
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
        <div className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 font-outfit">
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
        <div className="space-y-3 font-outfit">
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

function SocialLinkEditor({ link, platformInfo, onToggle, onSave }: { link: SocialLink, platformInfo: any, onToggle: () => void, onSave: (url: string) => void }) {
    const [localUrl, setLocalUrl] = useState(link.url);
    const hasChanges = localUrl !== link.url;

    return (
        <div className={`glass-dark p-6 rounded-[28px] border transition-all ${link.is_active ? 'border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'border-white/5 opacity-80 shrink-0'}`}>
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                        <i className={`${platformInfo.icon} text-2xl ${platformInfo.color}`}></i>
                    </div>
                    <span className="font-bold text-lg">{platformInfo.label}</span>
                </div>
                <button
                    onClick={onToggle}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${link.is_active ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'}`}
                >
                    {link.is_active ? <><CheckCircle2 className="w-4 h-4" /> Active</> : <><Circle className="w-4 h-4" /> Disabled</>}
                </button>
            </div>
            <div className="space-y-3">
                <div className="relative group">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                    <input
                        value={localUrl}
                        onChange={(e) => setLocalUrl(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all font-mono"
                        placeholder="https://..."
                    />
                </div>
                {hasChanges && (
                    <button
                        onClick={() => onSave(localUrl)}
                        className="w-full bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white border border-green-500/20 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg"
                    >
                        Save Changes
                    </button>
                )}
            </div>
        </div>
    );
}
