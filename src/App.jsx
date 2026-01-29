import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    Code2,
    Download,
    CircleCheck,
    GraduationCap,
    MessageSquare,
    Globe,
    Database,
    Cpu,
    Layers,
    ChevronRight,
    Menu,
    X,
    Smartphone,
    Sparkles,
    Zap,
    Award,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Calendar,
    ExternalLink,
    Send,
    Eye,
    Github,
    CheckCircle2,
    Layout,
    ArrowRight
} from 'lucide-react';

function ParticleBackground() {
    useEffect(() => {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;
        let field = [];
        const scale = 20; // Size of each cell in the flow field
        let columns, rows;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            columns = Math.floor(canvas.width / scale) + 1;
            rows = Math.floor(canvas.height / scale) + 1;
            init();
        };

        window.addEventListener('resize', resize);

        // Simple 2D Pseudo-noise function
        const getNoise = (x, y, t) => {
            return Math.sin(x * 0.002 + t * 0.0002) * Math.cos(y * 0.002 - t * 0.0001) * Math.PI * 4;
        };

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.prevX = this.x;
                this.prevY = this.y;
                this.speed = Math.random() * 1.5 + 0.5;
                this.angle = 0;

                const colors = ['#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#14b8a6'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.alpha = Math.random() * 0.3 + 0.1;
                this.life = Math.random() * 200 + 100;
            }

            update(t) {
                this.life--;
                if (this.life < 0) this.reset();

                this.prevX = this.x;
                this.prevY = this.y;

                // Get angle from noise field
                const noise = getNoise(this.x, this.y, t);
                this.angle = noise;

                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;

                // Wrap around edges
                if (this.x > canvas.width) { this.x = 0; this.prevX = 0; }
                if (this.x < 0) { this.x = canvas.width; this.prevX = canvas.width; }
                if (this.y > canvas.height) { this.y = 0; this.prevY = 0; }
                if (this.y < 0) { this.y = canvas.height; this.prevY = canvas.height; }
            }

            draw() {
                ctx.beginPath();
                ctx.moveTo(this.prevX, this.prevY);
                ctx.lineTo(this.x, this.y);
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 1;
                ctx.globalAlpha = this.alpha;
                ctx.stroke();
            }
        }

        const init = () => {
            particles = [];
            const count = Math.floor((canvas.width * canvas.height) / 8000);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        let time = 0;
        const animate = () => {
            // Trail effect: don't clear completely
            ctx.fillStyle = 'rgba(251, 251, 251, 0.05)'; // Matches --color-bg-primary
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            time += 16;
            particles.forEach(p => {
                p.update(time);
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            id="particle-canvas"
            className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-60"
        />
    );
}

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-cubic',
            offset: 50,
        });

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Update active section
            const sections = ['about', 'experience', 'education', 'skills', 'projects', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Education', href: '#education' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' }
    ];

    const projects = [
        {
            id: 'hostel',
            title: 'Hostel Management System',
            subtitle: 'Student Accommodation & Administration Platform',
            description: 'A comprehensive student lifecycle management system handling registration, admission approval, and hostel allocation. This enterprise-grade platform automates the entire administrative workflow for educational institutions.',
            image: '/images/hostel/main.png',
            tech: ['Java', 'Spring Boot', 'MySQL', 'React', 'REST API'],
            highlights: [
                'Automated room and bed allocation based on availability and student category.',
                'Interactive admin dashboard for real-time monitoring of hostel occupancy.',
                'Scalable architecture designed to handle thousands of student records efficiently.'
            ],
            status: 'Completed',
            images: ['/images/hostel/main.png']
        },
        {
            id: 'exam',
            title: 'Exam Management System',
            subtitle: 'Smart Exam Seating & Hall Allocation Platform',
            description: 'Advanced exam hall and seating allocation system designed for universities. It optimizes hall utilization and prevents malpractice through intelligent seating algorithms.',
            image: '/images/exam/main.png',
            tech: ['Java', 'Spring Boot', 'MySQL', 'React', 'Algorithm'],
            highlights: [
                'Diversity-based seating algorithm to prevent malpractice during exams.',
                'Interactive drag-and-drop interface for customized hall layout planning.',
                'Automated generation of university-standard reports including Form B.'
            ],
            status: 'Completed',
            images: ['/images/exam/main.png', '/images/exam/allocation.png']
        },
        {
            id: 'finance',
            title: 'Finance App',
            subtitle: 'Banking & Loan Management System',
            description: 'Secure full-stack banking and loan management system. Built to handle complex financial transactions, repayments, and multi-tier account security.',
            image: '/images/finace/finance.jpg',
            tech: ['PHP', 'MySQL', 'Flutter', 'Dart', 'Security'],
            highlights: [
                'Secure backend services for high-concurrency financial operations.',
                'High-performance cross-platform mobile app for seamless user experience.',
                'End-to-end encryption for all sensitive banking data transactions.'
            ],
            status: 'Completed',
            images: ['/images/finace/finance.jpg']
        },
        {
            id: 'smart-mart',
            title: 'Smart Mart',
            subtitle: 'Grocery Management App',
            description: 'Modern grocery management application with a focus on real-time inventory and delivery tracking. Optimized for quick administrative actions and user-friendly shopping.',
            image: '/images/smart_mart/smart_mart.jpg',
            tech: ['Flutter', 'Dart', 'Provider', 'Firebase'],
            highlights: [
                'Advanced state management using Provider for smooth UI interactions.',
                'Real-time delivery tracking with integrated payment processing.',
                'Role-based admin management for inventory and order history.'
            ],
            status: 'Ongoing',
            images: ['/images/smart_mart/smart_mart.jpg']
        },
        {
            id: 'hms',
            title: 'Hospital management system',
            subtitle: 'Enterprise-grade Hospital Platform',
            description: 'Comprehensive enterprise platform for hospitals, covering appointment booking, EMR, pharmacy management, and billing. Built using a custom MVC architecture.',
            image: '/images/hms/hms_1.png',
            tech: ['PHP', 'MySQL', 'JavaScript', 'Vanilla CSS', 'MVC'],
            highlights: [
                'Full-suite management: Appointment Booking, EMR, Pharmacy, and Billing.',
                'Custom-built MVC-inspired architecture for optimized performance.',
                'Premium responsive UI designed with a focus on ease of use for medical staff.'
            ],
            status: 'Ongoing',
            images: ['/images/hms/hms_1.png', '/images/hms/hms_1_1.png', '/images/hms/hms_1_2.png', '/images/hms/hms_1_3.png']
        },
        {
            id: 'elevators',
            title: 'SevenCrore Elevators Website',
            subtitle: 'Corporate Enterprise Website',
            description: 'Professional corporate presence for SevenCrore Elevators. Focuses on showcasing engineering excellence and managing client inquiries through a custom CRM module.',
            image: null,
            tech: ['ASP.NET MVC', 'SQL Server', 'SEO', 'Performance'],
            highlights: [
                'Highly optimized SEO-friendly architecture for maximum organic reach.',
                'Interactive service pages with inquiry management integration.',
                'Performance-first design ensuring sub-second load times.'
            ],
            status: 'Ongoing',
            images: []
        },
        {
            id: 'online-exam',
            title: 'PUC Online Examination System',
            subtitle: 'JEE / CET Preparation Platform',
            description: 'Modern online exam platform for PUC students. Utilizes AI to generate dynamic questions and provide comprehensive performance analytics.',
            image: null,
            tech: ['React', 'Gemini API', 'Node.js', 'Firebase'],
            highlights: [
                'AI-driven question generation using Gemini API for JEE/CET standards.',
                'Real-time auto-evaluation and personalized result analytics.',
                'Designed for high concurrency handling during peak live exams.'
            ],
            status: 'Completed',
            images: []
        }
    ];

    const education = [
        {
            title: 'Bachelor of Engineering',
            school: 'STJ Institute of Technology',
            desc: 'Electronics and Communication Engineering',
            year: '2014 - 2018',
            img: 'sjmit.jpeg',
            icon: <GraduationCap className="w-6 h-6" />
        },
        {
            title: 'Diploma in Electronics',
            school: 'STJ Polytechnic College',
            desc: 'Electronics and Communication Engineering',
            year: '2011 - 2014',
            img: 'stj_poly.jpeg',
            icon: <Cpu className="w-6 h-6" />
        },
        {
            title: 'SSLC',
            school: "St Mary's High School",
            desc: 'Secondary School Leaving Certificate',
            year: '2010',
            img: 'st_marys.jpeg',
            icon: <Globe className="w-6 h-6" />
        }
    ];

    const experience = [
        {
            role: 'Backend Developer',
            company: 'NagraVision Pvt. Ltd. & Foiwe Info Solution',
            duration: '2.5 Years',
            tech: ['Java', 'Spring Boot', 'Microservices', 'MySQL', 'REST API'],
            desc: 'Designed and implemented robust backend microservices, optimized database queries, and ensured high system availability.',
            icon: <Database className="w-6 h-6" />
        },
        {
            role: 'Full Stack Developer',
            company: 'GEM VENTURES',
            duration: '1 Year',
            tech: ['PHP', 'Laravel', 'React', 'Angular', 'Tailwind CSS'],
            desc: 'Developed end-to-end web applications, created responsive UIs, and integrated third-party APIs.',
            icon: <Layers className="w-6 h-6" />
        }
    ];

    const skills = [
        { name: 'Java', img: 'java.svg' },
        { name: 'Spring Boot', img: 'spring-boot.svg' },
        { name: 'Laravel', img: 'laravel.svg' },
        { name: 'MySQL', img: 'mysql-3.svg' },
        { name: 'PHP', img: 'php2.svg' },
        { name: 'React', img: 'JS.svg' },
        { name: 'Tailwind CSS', img: 'CSS.svg' },
        { name: 'HTML5', img: 'HTML.svg' }
    ];

    const tools = [
        { name: 'VS Code', img: 'vscode.svg' },
        { name: 'Eclipse', img: 'eclipse-11.svg' },
        { name: 'GitHub', img: 'github.svg' },
        { name: 'Figma', img: 'Figma.svg' },
        { name: 'ChatGPT', img: 'ChatGPT.svg' }
    ];

    return (
        <div className="min-h-screen bg-[hsl(var(--color-bg-primary))] text-[hsl(var(--color-text-primary))] selection:bg-[hsl(var(--color-primary))]/20 selection:text-[hsl(var(--color-text-primary))]">
            {/* Animated Particle Background */}
            <ParticleBackground />

            {/* Premium Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-[hsl(var(--color-bg-primary))]/80 backdrop-blur-2xl border-b border-white/[0.08] py-3 shadow-lg'
                : 'bg-transparent py-5'
                }`}>
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    {/* Logo */}
                    <a href="#" className="group flex items-center gap-3 z-50">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-xl group-hover:scale-110 transition-transform">
                                SB
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <div className="text-xl font-black tracking-tight">
                                Siddesh <span className="gradient-text-primary">BM</span>
                            </div>
                            <div className="text-[10px] font-semibold text-[hsl(var(--color-text-tertiary))] uppercase tracking-wider">
                                Full Stack Developer
                            </div>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${activeSection === item.href.slice(1)
                                    ? 'text-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary))]/5'
                                    : 'text-[hsl(var(--color-text-secondary))] hover:text-[hsl(var(--color-text-primary))] hover:bg-[hsl(var(--color-bg-tertiary))]'
                                    }`}
                            >
                                {item.name}
                                {activeSection === item.href.slice(1) && (
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                                )}
                            </a>
                        ))}
                        <a href="#contact" className="btn-primary ml-2">
                            <Send className="w-4 h-4" />
                            Get In Touch
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2.5 rounded-xl glass-effect hover:bg-white/[0.08] transition-all z-50"
                    >
                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden fixed inset-0 top-[72px] bg-[hsl(var(--color-bg-primary))]/95 backdrop-blur-2xl z-40 animate-fade-in">
                        <div className="flex flex-col p-8 gap-4 max-w-md mx-auto">
                            {navItems.map((item, i) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-2xl font-bold hover:text-blue-400 transition-colors animate-fade-in-up"
                                    style={{ animationDelay: `${i * 50}ms` }}
                                >
                                    {item.name}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={() => setIsMenuOpen(false)}
                                className="btn-primary w-full py-4 text-lg mt-4 animate-fade-in-up"
                                style={{ animationDelay: '250ms' }}
                            >
                                Get In Touch
                            </a>
                        </div>
                    </div>
                )}
            </nav>

            <main>
                {/* Hero Section - Redesigned */}
                <section className="relative min-h-screen flex items-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                    <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
                        {/* Hero Content */}
                        <div className="relative z-10 space-y-8" data-aos="fade-right">
                            {/* Status Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-[hsl(var(--color-accent))]/20 text-[hsl(var(--color-accent))] text-xs font-bold uppercase tracking-wider">
                                <div className="relative">
                                    <div className="w-2 h-2 bg-[hsl(var(--color-accent))] rounded-full animate-ping absolute" />
                                    <div className="w-2 h-2 bg-[hsl(var(--color-accent))] rounded-full" />
                                </div>
                                Available for New Projects
                            </div>

                            {/* Main Heading */}
                            <div className="space-y-4">
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
                                    Building Innovative Solutions
                                    <br />
                                    <span className="gradient-text-primary">for Modern Businesses</span>
                                </h1>
                            </div>

                            {/* Description */}
                            <p className="text-lg md:text-xl text-[hsl(var(--color-text-secondary))] max-w-xl leading-relaxed">
                                Hi, I'm <span className="font-semibold text-[hsl(var(--color-text-primary))]">Siddesh</span>, a Full Stack Developer specializing in enterprise-grade applications with Spring Boot, Laravel, and modern web technologies.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <a href="#contact" className="btn-primary group">
                                    <Zap className="w-5 h-5" />
                                    Start a Project
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                                <a href="/SiddeshBM_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary group">
                                    <Download className="w-5 h-5 group-hover:animate-bounce" />
                                    Download CV
                                </a>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-8 pt-6">
                                <div className="space-y-1">
                                    <div className="text-4xl font-black gradient-text-primary">3.5+</div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-text-tertiary))]">Years Experience</div>
                                </div>
                                <div className="h-12 w-px bg-white/10" />
                                <div className="space-y-1">
                                    <div className="text-4xl font-black gradient-text-accent">10+</div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-text-tertiary))]">Projects Completed</div>
                                </div>
                                <div className="h-12 w-px bg-white/10" />
                                <div className="space-y-1">
                                    <div className="text-4xl font-black text-yellow-400">100%</div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-text-tertiary))]">Client Satisfaction</div>
                                </div>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="relative" data-aos="zoom-in" data-aos-delay="200">
                            <div className="relative z-10 w-full max-w-[500px] aspect-square mx-auto">
                                {/* Decorative Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-[3rem] rotate-6 opacity-20 blur-2xl" />
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[3rem] rotate-3 transition-transform duration-500 hover:rotate-6" />

                                {/* Profile Image */}
                                <img
                                    src="/images/profile.JPG"
                                    alt="Siddesh BM - Full Stack Developer"
                                    className="absolute inset-0 w-full h-full object-cover object-top rounded-[3rem] border-4 border-[hsl(var(--color-bg-primary))] shadow-2xl transition-all hover:scale-[1.02] hover:rotate-1"
                                />

                                {/* Floating Tech Icons */}
                                <div className="absolute -top-4 -right-4 p-4 glass-effect-strong rounded-2xl float shadow-xl">
                                    <Code2 className="w-8 h-8 text-blue-400" />
                                </div>
                                <div className="absolute -bottom-4 -left-4 p-4 glass-effect-strong rounded-2xl float-delayed shadow-xl">
                                    <Database className="w-8 h-8 text-indigo-400" />
                                </div>
                                <div className="absolute top-1/2 -right-6 p-3 glass-effect-strong rounded-xl float shadow-xl" style={{ animationDelay: '-1.5s' }}>
                                    <Sparkles className="w-6 h-6 text-purple-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section - Redesigned */}
                <section id="about" className="section">
                    <div className="max-w-screen-xl mx-auto space-y-12">
                        {/* Section Header */}
                        <div className="section-header" data-aos="fade-up">
                            <span className="section-subtitle">Background</span>
                            <h2 className="section-title">About Me</h2>
                            <div className="section-divider" />
                        </div>

                        {/* Content Grid */}
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                            {/* Image */}
                            <div className="relative group" data-aos="fade-right">
                                <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all" />
                                <img
                                    src="/images/about.png"
                                    alt="About Siddesh"
                                    className="relative rounded-3xl border border-white/[0.08] shadow-2xl w-full"
                                />
                            </div>

                            {/* Text Content */}
                            <div className="space-y-8" data-aos="fade-left">
                                <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                                    Bridging the gap between{' '}
                                    <span className="gradient-text-primary">powerful backends</span>
                                    {' '}and{' '}
                                    <span className="gradient-text-accent">beautiful interfaces</span>
                                </h3>

                                <p className="text-lg text-[hsl(var(--color-text-secondary))] leading-relaxed">
                                    With over 3.5 years in the software industry, I've specialized in building scalable backend systems with Java Spring Boot and creating engaging user experiences with modern frontend frameworks.
                                </p>

                                <p className="text-lg text-[hsl(var(--color-text-secondary))] leading-relaxed">
                                    My journey from backend development to full-stack has given me a unique perspective on building complete, performant applications that users love.
                                </p>

                                {/* Skills Grid */}
                                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                                    {[
                                        { icon: <Code2 className="w-5 h-5" />, title: 'Backend', subtitle: 'Java, Spring Boot, PHP', color: 'blue' },
                                        { icon: <Layers className="w-5 h-5" />, title: 'Frontend', subtitle: 'React, Angular, Tailwind', color: 'indigo' },
                                        { icon: <Database className="w-5 h-5" />, title: 'Database', subtitle: 'MySQL, PostgreSQL', color: 'purple' },
                                        { icon: <Zap className="w-5 h-5" />, title: 'DevOps', subtitle: 'GitHub, CI/CD, Docker', color: 'cyan' }
                                    ].map((item, i) => (
                                        <div key={i} className="card-hover group/item">
                                            <div className="flex items-start gap-4">
                                                <div className={`icon-container-hover text-[hsl(var(--color-primary))]`}>
                                                    {item.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-[hsl(var(--color-text-primary))] mb-1">{item.title}</h4>
                                                    <p className="text-sm text-[hsl(var(--color-text-secondary))]">{item.subtitle}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Experience Section - Redesigned */}
                <section id="experience" className="section bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent">
                    <div className="max-w-screen-xl mx-auto space-y-12">
                        {/* Section Header */}
                        <div className="section-header" data-aos="fade-up">
                            <span className="section-subtitle">Career Journey</span>
                            <h2 className="section-title">Work Experience</h2>
                            <div className="section-divider" />
                        </div>

                        {/* Experience Timeline */}
                        <div className="space-y-8">
                            {experience.map((exp, i) => (
                                <div
                                    key={i}
                                    className="group relative"
                                    data-aos="fade-up"
                                    data-aos-delay={i * 100}
                                >
                                    <div className="card-hover p-8 md:p-10">
                                        <div className="flex flex-col lg:flex-row gap-8">
                                            {/* Left Column */}
                                            <div className="lg:w-1/3 space-y-6">
                                                {/* Icon */}
                                                <div className="inline-flex">
                                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:border-blue-500/40 transition-all">
                                                        {exp.icon}
                                                    </div>
                                                </div>

                                                {/* Role & Company */}
                                                <div className="space-y-2">
                                                    <h3 className="text-2xl font-bold">{exp.role}</h3>
                                                    <p className="text-[hsl(var(--color-text-secondary))] font-semibold flex items-center gap-2">
                                                        <Briefcase className="w-4 h-4" />
                                                        {exp.company}
                                                    </p>
                                                </div>

                                                {/* Duration Badge */}
                                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-blue-500/20 text-blue-400 text-sm font-bold">
                                                    <Calendar className="w-4 h-4" />
                                                    {exp.duration}
                                                </div>
                                            </div>

                                            {/* Right Column */}
                                            <div className="lg:w-2/3 space-y-6">
                                                {/* Description */}
                                                <p className="text-lg text-[hsl(var(--color-text-secondary))] leading-relaxed">
                                                    {exp.desc}
                                                </p>

                                                {/* Tech Stack */}
                                                <div className="space-y-3">
                                                    <h4 className="text-sm font-bold uppercase tracking-wider text-[hsl(var(--color-text-tertiary))]">
                                                        Technologies Used
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {exp.tech.map((tech, j) => (
                                                            <span
                                                                key={j}
                                                                className="px-4 py-2 rounded-xl glass-effect border border-white/[0.08] text-sm font-semibold hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Education Section - Redesigned */}
                <section id="education" className="section">
                    <div className="max-w-screen-xl mx-auto space-y-12">
                        {/* Section Header */}
                        <div className="section-header" data-aos="fade-up">
                            <span className="section-subtitle">Academic Background</span>
                            <h2 className="section-title">Education</h2>
                            <div className="section-divider" />
                        </div>

                        {/* Education Grid */}
                        <div className="grid md:grid-cols-3 gap-8">
                            {education.map((edu, i) => (
                                <div
                                    key={i}
                                    className="card-hover group/card overflow-hidden"
                                    data-aos="fade-up"
                                    data-aos-delay={i * 100}
                                >
                                    {/* Image */}
                                    <div className="relative h-56 -m-6 mb-0 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--color-bg-primary))] via-transparent to-transparent z-10" />
                                        <img
                                            src={`/images/Education/${edu.img}`}
                                            alt={edu.title}
                                            className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                                        />

                                        {/* Icon Badge */}
                                        <div className="absolute top-4 left-4 p-3 glass-effect-strong rounded-xl text-[hsl(var(--color-primary))] z-20 shadow-xl">
                                            {edu.icon}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 space-y-3">
                                        <div className="badge-primary">
                                            {edu.year}
                                        </div>
                                        <h3 className="text-xl font-bold leading-tight group-hover/card:text-[hsl(var(--color-primary))] transition-colors">
                                            {edu.title}
                                        </h3>
                                        <p className="text-sm font-semibold text-[hsl(var(--color-text-secondary))]">
                                            {edu.school}
                                        </p>
                                        <p className="text-sm text-[hsl(var(--color-text-tertiary))]">
                                            {edu.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Skills Section - Redesigned */}
                <section id="skills" className="section bg-gradient-to-b from-transparent via-indigo-500/[0.02] to-transparent">
                    <div className="max-w-screen-xl mx-auto space-y-12">
                        {/* Section Header */}
                        <div className="section-header" data-aos="fade-up">
                            <span className="section-subtitle">Expertise</span>
                            <h2 className="section-title">Skills & Tools</h2>
                            <div className="section-divider" />
                        </div>

                        {/* Skills & Tools Grid */}
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                            {/* Technical Skills */}
                            <div className="space-y-8" data-aos="fade-right">
                                <div className="space-y-3">
                                    <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                                        <Code2 className="w-8 h-8 text-[hsl(var(--color-primary))]" />
                                        Technical Stack
                                    </h3>
                                    <p className="text-[hsl(var(--color-text-secondary))]">
                                        Core technologies I use to build robust applications
                                    </p>
                                </div>

                                <div className="grid grid-cols-4 gap-6">
                                    {skills.map((skill, i) => (
                                        <div
                                            key={i}
                                            className="group/skill flex flex-col items-center gap-3"
                                            data-aos="zoom-in"
                                            data-aos-delay={i * 50}
                                        >
                                            <div className="w-20 h-20 glass-effect rounded-2xl flex items-center justify-center p-4 group-hover/skill:-translate-y-2 group-hover/skill:border-[hsl(var(--color-primary))]/30 group-hover/skill:bg-[hsl(var(--color-primary))]/5 transition-all">
                                                <img
                                                    src={`/images/skil/${skill.img}`}
                                                    alt={skill.name}
                                                    className="w-full h-full object-contain grayscale group-hover/skill:grayscale-0 transition-all"
                                                />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--color-text-tertiary))] group-hover/skill:text-[hsl(var(--color-primary))] transition-colors text-center">
                                                {skill.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tools & Software */}
                            <div className="space-y-8" data-aos="fade-left">
                                <div className="space-y-3">
                                    <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                                        <Zap className="w-8 h-8 text-[hsl(var(--color-secondary))]" />
                                        Tools & Software
                                    </h3>
                                    <p className="text-[hsl(var(--color-text-secondary))]">
                                        Development tools that power my workflow
                                    </p>
                                </div>

                                <div className="grid grid-cols-5 gap-4">
                                    {tools.map((tool, i) => (
                                        <div
                                            key={i}
                                            className="group/tool relative"
                                            data-aos="zoom-in"
                                            data-aos-delay={i * 50}
                                        >
                                            <div className="aspect-square glass-effect rounded-2xl flex items-center justify-center p-3 group-hover/tool:scale-110 group-hover/tool:border-[hsl(var(--color-secondary))]/30 group-hover/tool:bg-[hsl(var(--color-secondary))]/5 transition-all cursor-pointer">
                                                <img
                                                    src={`/images/tools/${tool.img}`}
                                                    alt={tool.name}
                                                    title={tool.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Quote Card */}
                                <div className="card-hover p-6 mt-8" data-aos="fade-up">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-2xl font-black flex-shrink-0">
                                            "
                                        </div>
                                        <p className="text-[hsl(var(--color-text-secondary))] italic leading-relaxed pt-2">
                                            Constantly learning and integrating new tools to optimize performance and create exceptional developer experiences.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Section - Premium Showcase */}
                <section id="projects" className="section bg-gradient-to-b from-transparent via-[hsl(var(--color-primary))]/[0.02] to-transparent">
                    <div className="max-w-screen-xl mx-auto space-y-12">
                        {/* Section Header */}
                        <div className="section-header" data-aos="fade-up">
                            <span className="section-subtitle">Portfolio</span>
                            <h2 className="section-title">Featured Projects</h2>
                            <div className="section-divider" />
                            <p className="text-lg text-[hsl(var(--color-text-secondary))] max-w-2xl mt-4">
                                A showcase of enterprise-grade applications, scalable backend systems, and modern full-stack solutions.
                            </p>
                        </div>

                        {/* Projects Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project, i) => (
                                <div
                                    key={project.id}
                                    className="project-card group"
                                    data-aos="fade-up"
                                    data-aos-delay={i * 100}
                                >
                                    {/* Project Image Container */}
                                    <div className="project-image-container">
                                        {/* Status Badge */}
                                        <div className={`project-badge ${project.status === 'Ongoing' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                            {project.status}
                                        </div>

                                        {project.image ? (
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="project-image"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-[hsl(var(--color-bg-tertiary))] to-[hsl(var(--color-bg-secondary))] flex items-center justify-center p-12">
                                                <div className="text-center space-y-4">
                                                    <div className="w-16 h-16 mx-auto rounded-2xl bg-[hsl(var(--color-primary))]/10 flex items-center justify-center text-[hsl(var(--color-primary))]">
                                                        <Layout className="w-8 h-8" />
                                                    </div>
                                                    <p className="text-sm font-bold text-[hsl(var(--color-text-tertiary))] uppercase tracking-widest animate-pulse">Design in Progress</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Hover Overlay */}
                                        <div className="project-overlay">
                                            <div className="project-buttons">
                                                <button
                                                    onClick={() => setSelectedProject(project)}
                                                    className="w-full btn-primary py-3 text-sm flex items-center justify-center gap-2 group/btn-view"
                                                >
                                                    <Eye className="w-4 h-4 group-hover/btn-view:scale-110 transition-transform" />
                                                    View Case Study
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Project Info */}
                                    <div className="p-6 space-y-4">
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-bold text-[hsl(var(--color-text-primary))] group-hover:text-[hsl(var(--color-primary))] transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-sm font-semibold text-[hsl(var(--color-primary))] uppercase tracking-wider">
                                                {project.subtitle}
                                            </p>
                                        </div>

                                        <p className="text-sm text-[hsl(var(--color-text-secondary))] line-clamp-2">
                                            {project.description}
                                        </p>

                                        {/* Tech Stack Chips */}
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {project.tech.slice(0, 4).map((t, idx) => (
                                                <span key={idx} className="text-[10px] px-2 py-1 bg-[hsl(var(--color-bg-tertiary))] border border-[hsl(var(--color-border))] rounded-md font-bold text-[hsl(var(--color-text-tertiary))] uppercase">
                                                    {t}
                                                </span>
                                            ))}
                                            {project.tech.length > 4 && (
                                                <span className="text-[10px] px-2 py-1 text-[hsl(var(--color-text-muted))] font-bold uppercase">
                                                    +{project.tech.length - 4}
                                                </span>
                                            )}
                                        </div>

                                        <div className="pt-4 border-t border-[hsl(var(--color-border))] flex items-center justify-between">
                                            <button
                                                onClick={() => setSelectedProject(project)}
                                                className="text-xs font-bold text-[hsl(var(--color-primary))] hover:translate-x-1 transition-transform flex items-center gap-1 group/btn"
                                            >
                                                Learn More
                                                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                            <div className="flex gap-2">
                                                <Github className="w-4 h-4 text-[hsl(var(--color-text-tertiary))] hover:text-[hsl(var(--color-text-primary))] cursor-pointer transition-colors" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Project Details Modal */}
                {selectedProject && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
                            onClick={() => setSelectedProject(null)}
                        />

                        {/* Modal Content */}
                        <div
                            className="relative w-full max-w-5xl max-h-[90vh] bg-[hsl(var(--color-bg-primary))] rounded-3xl shadow-2xl overflow-hidden border border-white/[0.08] flex flex-col md:flex-row animate-scale-in"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Left Side: Images */}
                            <div className="md:w-3/5 bg-[hsl(var(--color-bg-tertiary))] relative group">
                                {selectedProject.image ? (
                                    <div className="w-full h-full overflow-y-auto custom-scrollbar p-1">
                                        <div className="space-y-4">
                                            {selectedProject.images.map((img, idx) => (
                                                <img
                                                    key={idx}
                                                    src={img}
                                                    alt={`${selectedProject.title} ${idx + 1}`}
                                                    className="w-full rounded-2xl shadow-lg border border-white/5"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center space-y-6 p-12">
                                        <div className="w-24 h-24 rounded-3xl bg-[hsl(var(--color-primary))]/10 flex items-center justify-center text-[hsl(var(--color-primary))] animate-bounce">
                                            <Layout className="w-12 h-12" />
                                        </div>
                                        <div className="text-center space-y-2">
                                            <h3 className="text-xl font-bold">Visuals Incoming</h3>
                                            <p className="text-sm text-[hsl(var(--color-text-secondary))] max-w-xs">We are currently perfecting the UI design for this product. Stay tuned for a rich visual presentation.</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Right Side: Details */}
                            <div className="md:w-2/5 p-8 md:p-12 overflow-y-auto flex flex-col space-y-8 border-l border-[hsl(var(--color-border))]">
                                <div className="space-y-2">
                                    <div className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${selectedProject.status === 'Ongoing' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-[hsl(var(--color-accent))]/10 border-[hsl(var(--color-accent))]/20 text-[hsl(var(--color-accent))]'}`}>
                                        {selectedProject.status}
                                    </div>
                                    <h2 className="text-3xl font-black text-[hsl(var(--color-text-primary))]">{selectedProject.title}</h2>
                                    <p className="text-sm font-bold text-[hsl(var(--color-primary))] uppercase tracking-widest">{selectedProject.subtitle}</p>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-[hsl(var(--color-text-muted))]">Full Overview</h4>
                                    <p className="text-[hsl(var(--color-text-secondary))] leading-relaxed text-sm">
                                        {selectedProject.description}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-[hsl(var(--color-text-muted))]">Project Highlights</h4>
                                    <ul className="space-y-3">
                                        {selectedProject.highlights.map((h, idx) => (
                                            <li key={idx} className="flex gap-3 text-sm text-[hsl(var(--color-text-secondary))]">
                                                <CheckCircle2 className="w-5 h-5 text-[hsl(var(--color-accent))] flex-shrink-0" />
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-[hsl(var(--color-text-muted))]">Technology Stack</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.tech.map((t, idx) => (
                                            <span key={idx} className="px-3 py-1.5 bg-[hsl(var(--color-bg-tertiary))] border border-[hsl(var(--color-border))] rounded-lg text-xs font-bold text-[hsl(var(--color-text-primary))]">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6 mt-auto border-t border-[hsl(var(--color-border))] flex justify-end">
                                    <a href="#" onClick={(e) => e.preventDefault()} className="p-3 bg-[hsl(var(--color-bg-tertiary))] border border-[hsl(var(--color-border))] rounded-xl hover:bg-[hsl(var(--color-border))] transition-colors group/modal-git" title="View Source on GitHub">
                                        <Github className="w-5 h-5 group-hover/modal-git:text-[hsl(var(--color-primary))]" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Contact Section - Redesigned */}
                <section id="contact" className="section relative overflow-hidden">
                    <div className="max-w-screen-xl mx-auto">
                        {/* Section Header */}
                        <div className="section-header mb-16" data-aos="fade-up">
                            <span className="section-subtitle">Get In Touch</span>
                            <h2 className="section-title">
                                Let's Create Something
                                <br />
                                <span className="gradient-text-primary">Significant Together</span>
                            </h2>
                            <div className="section-divider" />
                            <p className="text-lg text-[hsl(var(--color-text-secondary))] max-w-2xl mt-4">
                                Whether you have a project in mind or just want to chat about technology, I'm always open to new opportunities and conversations.
                            </p>
                        </div>

                        {/* Contact Grid */}
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                            {/* Contact Info */}
                            <div className="space-y-8" data-aos="fade-right">
                                {/* Contact Cards */}
                                <div className="space-y-4">
                                    {[
                                        {
                                            icon: <Mail className="w-6 h-6" />,
                                            label: 'Email',
                                            value: 'siddeshbm9964@gmail.com',
                                            href: 'mailto:siddeshbm9964@gmail.com',
                                            color: 'blue'
                                        },
                                        {
                                            icon: <Phone className="w-6 h-6" />,
                                            label: 'Phone',
                                            value: '+91-9964573467',
                                            href: 'tel:+919964573467',
                                            color: 'emerald'
                                        }
                                    ].map((item, i) => (
                                        <a
                                            key={i}
                                            href={item.href}
                                            className="card-hover group/contact"
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className={`w-14 h-14 rounded-2xl bg-${item.color}-500/10 border border-${item.color}-500/20 flex items-center justify-center text-${item.color}-400 group-hover/contact:scale-110 group-hover/contact:bg-${item.color}-500 group-hover/contact:text-white transition-all`}>
                                                    {item.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-text-tertiary))] mb-1">
                                                        {item.label}
                                                    </p>
                                                    <p className="text-lg font-bold group-hover/contact:text-[hsl(var(--color-primary))] transition-colors text-[hsl(var(--color-text-primary))]">
                                                        {item.value}
                                                    </p>
                                                </div>
                                                <ExternalLink className="w-5 h-5 text-[hsl(var(--color-text-tertiary))] group-hover/contact:text-[hsl(var(--color-primary))] transition-colors" />
                                            </div>
                                        </a>
                                    ))}
                                </div>

                                {/* WhatsApp CTA */}
                                <a
                                    href="https://wa.me/919964573467"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-8 py-5 bg-[#25D366] hover:bg-[#20BA5A] rounded-2xl font-bold text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
                                >
                                    <Globe className="w-6 h-6" />
                                    <span>Connect on WhatsApp</span>
                                    <ChevronRight className="w-5 h-5" />
                                </a>

                                {/* Social Links */}
                                <div className="pt-8">
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-[hsl(var(--color-text-tertiary))] mb-4">
                                        Follow Me
                                    </h4>
                                    <div className="flex gap-3">
                                        {['GitHub', 'LinkedIn', 'Twitter'].map((platform, i) => (
                                            <a
                                                key={i}
                                                href="#"
                                                className="w-12 h-12 rounded-xl glass-effect flex items-center justify-center hover:bg-blue-500/10 hover:border-blue-500/30 transition-all"
                                                title={platform}
                                            >
                                                <span className="text-sm font-bold">{platform[0]}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="relative" data-aos="fade-left">
                                <div className="card-hover p-8 md:p-10">
                                    {/* Robot Avatar */}
                                    <div className="flex justify-center -mt-20 mb-8">
                                        <div className="circle-bg shadow-2xl shadow-blue-500/20 ring-4 ring-blue-500/10">
                                            <div className="robot-ear left" />
                                            <div className="robot-head">
                                                <div className="robot-face">
                                                    <div className="eyes left" />
                                                    <div className="eyes right" />
                                                    <div className="mouth" />
                                                </div>
                                            </div>
                                            <div className="robot-ear right" />
                                            <div className="robot-body" />
                                        </div>
                                    </div>

                                    {/* Form */}
                                    <form className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-text-secondary))] ml-1">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="John Doe"
                                                className="input"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-text-tertiary))] ml-1">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="john@example.com"
                                                className="input"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-text-tertiary))] ml-1">
                                                Message
                                            </label>
                                            <textarea
                                                rows="5"
                                                placeholder="Tell me about your project..."
                                                className="textarea"
                                            />
                                        </div>

                                        <button type="submit" className="btn-primary w-full py-4 text-base">
                                            <Send className="w-5 h-5" />
                                            Send Message
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Premium Footer */}
            <footer className="py-16 px-6 border-t border-white/[0.08] relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col items-center gap-8">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border border-blue-500/20 rounded-2xl flex items-center justify-center font-black text-xl">
                                SB
                            </div>
                            <div>
                                <div className="text-lg font-black">Siddesh BM</div>
                                <div className="text-xs text-[hsl(var(--color-text-tertiary))]">Full Stack Developer</div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-[hsl(var(--color-text-secondary))] hover:text-white transition-colors"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        {/* Copyright */}
                        <div className="text-center space-y-2">
                            <p className="text-sm text-[hsl(var(--color-text-tertiary))]">
                                © 2026 Siddesh BM. All rights reserved.
                            </p>
                            <p className="text-xs text-[hsl(var(--color-text-muted))]">
                                Crafted with <span className="text-red-500">❤</span> and <span className="text-blue-400">React</span>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
