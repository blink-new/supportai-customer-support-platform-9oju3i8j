import { useState, useEffect } from 'react'
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { Badge } from './components/ui/badge'
import Aurora from './components/Aurora'
import { 
  Zap, 
  Shield, 
  BarChart3, 
  Clock, 
  Users, 
  Star,
  Check,
  Menu,
  X,
  ChevronRight,
  Globe,
  Lock,
  TrendingUp,
  Headphones,
  Bot
} from 'lucide-react'

// Mock chat messages for demo
const chatMessages = [
  { type: 'user', message: 'Hi, I need help with my account' },
  { type: 'bot', message: 'I\'d be happy to help! Can you tell me more about the issue you\'re experiencing?' },
  { type: 'user', message: 'I can\'t access my dashboard' },
  { type: 'bot', message: 'I see you\'re having trouble accessing your dashboard. Let me check your account status...' }
]

// Live typing effect hook
function useTypingEffect(text: string, speed: number = 50) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    } else {
      // Reset after completion
      const resetTimeout = setTimeout(() => {
        setDisplayText('')
        setCurrentIndex(0)
      }, 2000)
      return () => clearTimeout(resetTimeout)
    }
  }, [currentIndex, text, speed])

  return displayText
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentMetric, setCurrentMetric] = useState(0)
  
  const typingText = useTypingEffect("Perfect! I've reset your password. You should now be able to access your dashboard.")
  
  const metrics = [
    { label: 'Response Time', value: '12 seconds', icon: Clock },
    { label: 'Customer Satisfaction', value: '96%', icon: Star },
    { label: 'Cost Savings', value: '$40k annually', icon: TrendingUp }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Aurora Background */}
      <div className="fixed inset-0 w-full h-screen z-0">
        <Aurora
          colorStops={["#2D1B69", "#0891B2", "#2D1B69"]}
          amplitude={1.2}
          blend={0.6}
          speed={0.8}
        />
      </div>
      
      {/* Extended background for scrolling */}
      <div 
        className="absolute inset-0 z-0 w-full"
        style={{
          background: 'linear-gradient(135deg, #2D1B69 0%, #0891B2 50%, #2D1B69 100%)',
          minHeight: '100%'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#1a223a]/30 border-b border-teal-400/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="font-display font-bold text-xl text-white">SupportAI</span>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-white/80 hover:text-white transition-colors font-medium">Product</a>
                <a href="#pricing" className="text-white/80 hover:text-white transition-colors font-medium">Pricing</a>
                <a href="#enterprise" className="text-white/80 hover:text-white transition-colors font-medium">Enterprise</a>
                <Button className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300">
                  Login
                </Button>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden backdrop-blur-xl bg-[#1a223a]/80 border-t border-teal-400/30">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#features" className="block px-3 py-2 text-white/80 hover:text-white font-medium">Product</a>
                <a href="#pricing" className="block px-3 py-2 text-white/80 hover:text-white font-medium">Pricing</a>
                <a href="#enterprise" className="block px-3 py-2 text-white/80 hover:text-white font-medium">Enterprise</a>
                <div className="px-3 py-2">
                  <Button className="w-full bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300">
                    Login
                  </Button>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Content */}
              <div className="text-center lg:text-left">
                <h1 className="font-display text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  Resolve <span className="text-green-400 font-extrabold">87%</span> of Support Tickets<br />
                  <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">Instantly with AI</span>
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl font-medium leading-relaxed">
                  Transform your customer support with intelligent automation that learns from every interaction
                </p>
                
                {/* Live Metrics */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                  {metrics.map((metric, index) => {
                    const Icon = metric.icon
                    return (
                      <div 
                        key={metric.label}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-500 ${
                          index === currentMetric 
                            ? 'bg-green-500/20 border border-green-400/30' 
                            : 'bg-white/10 border border-white/20'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${index === currentMetric ? 'text-green-400' : 'text-white/60'}`} />
                        <span className={`text-sm font-medium ${index === currentMetric ? 'text-green-400' : 'text-white/80'}`}>
                          {metric.label}: {metric.value}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 shadow-lg shadow-green-500/25 transition-all duration-300 hover:scale-105">
                    Start Free Trial
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button size="lg" className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 hover:border-white/50 font-medium px-8 transition-all duration-300 hover:scale-105">
                    Schedule Demo
                  </Button>
                </div>
              </div>

              {/* Right Side - Live Demo */}
              <div className="lg:pl-8">
                <div className="grid gap-6">
                  {/* Chat Widget Demo */}
                  <Card className="bg-[#1a223a]/40 backdrop-blur-2xl border-teal-400/40 shadow-lg p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-white font-medium">Live Chat Demo</span>
                    </div>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {chatMessages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs px-4 py-2 rounded-lg ${
                            msg.type === 'user' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-white/20 text-white border border-white/20'
                          }`}>
                            <p className="text-sm">{msg.message}</p>
                          </div>
                        </div>
                      ))}
                      {typingText && (
                        <div className="flex justify-start">
                          <div className="max-w-xs px-4 py-2 rounded-lg bg-white/20 text-white border border-white/20">
                            <p className="text-sm">{typingText}<span className="animate-pulse">|</span></p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* Analytics Dashboard Demo */}
                  <Card className="bg-[#1a223a]/40 backdrop-blur-2xl border-teal-400/40 shadow-lg p-6">
                    <h3 className="text-white font-semibold mb-4">Real-time Analytics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-[#1a223a]/30 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">156</div>
                        <div className="text-xs text-white/60">Tickets Resolved</div>
                      </div>
                      <div className="text-center p-3 bg-[#1a223a]/30 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400">12s</div>
                        <div className="text-xs text-white/60">Avg Response</div>
                      </div>
                      <div className="text-center p-3 bg-[#1a223a]/30 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-400">96%</div>
                        <div className="text-xs text-white/60">Satisfaction</div>
                      </div>
                      <div className="text-center p-3 bg-[#1a223a]/30 rounded-lg">
                        <div className="text-2xl font-bold text-purple-400">$3.2k</div>
                        <div className="text-xs text-white/60">Cost Saved</div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
                Enterprise-Grade AI Support
              </h2>
              <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto font-medium">
                Powerful features designed to handle your support workload while maintaining the human touch your customers love
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'Lightning Fast Responses',
                  description: 'Average response time of 12 seconds with AI-powered instant resolution for common queries'
                },
                {
                  icon: Shield,
                  title: 'Enterprise Security',
                  description: 'SOC2 Type II compliant with end-to-end encryption and GDPR-ready data handling'
                },
                {
                  icon: BarChart3,
                  title: 'Advanced Analytics',
                  description: 'Real-time insights into support performance, customer satisfaction, and cost savings'
                },
                {
                  icon: Users,
                  title: 'Team Collaboration',
                  description: 'Seamless handoffs between AI and human agents with full conversation context'
                },
                {
                  icon: Globe,
                  title: 'Multi-Channel Support',
                  description: 'Chat, email, social media, and phone support unified in one intelligent platform'
                },
                {
                  icon: Headphones,
                  title: '24/7 Availability',
                  description: 'Round-the-clock AI support that never sleeps, with human escalation when needed'
                }
              ].map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card 
                    key={index} 
                    className="bg-[#1a223a]/40 backdrop-blur-2xl border-teal-400/40 shadow-lg p-6 hover:bg-[#0891B2]/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-teal-400/10"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/70">{feature.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl lg:text-2xl text-white/80 font-medium">
                Choose the plan that fits your team size and support volume
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: 'Essential',
                  price: '$49',
                  period: 'per month',
                  description: 'Perfect for small teams',
                  features: [
                    'Up to 1,000 tickets/month',
                    'Basic AI responses',
                    'Email & chat support',
                    'Standard analytics',
                    '5 team members'
                  ],
                  popular: false
                },
                {
                  name: 'Professional',
                  price: '$149',
                  period: 'per month',
                  description: 'Most popular for growing businesses',
                  features: [
                    'Up to 10,000 tickets/month',
                    'Advanced AI + ML learning',
                    'Multi-channel support',
                    'Advanced analytics',
                    'Unlimited team members',
                    'Custom integrations'
                  ],
                  popular: true
                },
                {
                  name: 'Enterprise',
                  price: '$299',
                  period: 'per month',
                  description: 'For large organizations',
                  features: [
                    'Unlimited tickets',
                    'Custom AI training',
                    'White-label options',
                    'Priority support',
                    'Dedicated account manager',
                    'SLA guarantees'
                  ],
                  popular: false
                }
              ].map((plan, index) => (
                <Card 
                  key={index}
                  className={`relative p-8 ${
                    plan.popular 
                      ? 'bg-[#0891B2]/30 border-teal-400/60 backdrop-blur-2xl scale-105' 
                      : 'bg-[#1a223a]/40 backdrop-blur-2xl border-teal-400/40'
                  } hover:scale-110 transition-all duration-300`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white">
                      Most Popular
                    </Badge>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="font-display text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-white/60 mb-4">{plan.description}</p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-white/60 ml-2">{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-white/80">
                        <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full font-semibold transition-all duration-300 hover:scale-105 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/25' 
                        : 'bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 hover:border-white/50'
                    }`}
                  >
                    {plan.popular ? 'Start Free Trial' : 'Get Started'}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
                Trusted by Leading Companies
              </h2>
              <p className="text-lg text-white/70 font-medium">Join thousands of teams already using SupportAI</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              {['TechCorp', 'GlobalServices', 'InnovateInc', 'DataFlow'].map((company, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white font-display">{company}</div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="mt-16 max-w-4xl mx-auto">
              <Card className="bg-[#1a223a]/40 backdrop-blur-2xl border-teal-400/40 shadow-lg p-8 lg:p-12 text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl lg:text-2xl text-white/90 mb-8 font-medium leading-relaxed">
                  "SupportAI reduced our response time by 75% and increased customer satisfaction scores. 
                  The ROI was evident within the first month."
                </blockquote>
                <div className="text-white/80">
                  <div className="font-semibold text-lg">Sarah Johnson</div>
                  <div className="text-white/60 font-medium">VP of Customer Success, TechCorp</div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-teal-400/30 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-display font-bold text-xl text-white">SupportAI</span>
                </div>
                <p className="text-white/60">
                  AI-powered customer support that never stops learning
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Product</h4>
                <ul className="space-y-2 text-white/60">
                  <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-white/60">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Security</h4>
                <div className="flex space-x-4 mb-4">
                  <Badge variant="secondary" className="bg-[#0891B2]/30 text-white border-teal-400/40">
                    <Lock className="w-3 h-3 mr-1" />
                    SOC2
                  </Badge>
                  <Badge variant="secondary" className="bg-[#2D1B69]/30 text-white border-purple-400/40">
                    <Shield className="w-3 h-3 mr-1" />
                    GDPR
                  </Badge>
                </div>
                <p className="text-sm text-white/60">
                  Enterprise-grade security you can trust
                </p>
              </div>
            </div>
            
            <div className="border-t border-teal-400/30 mt-8 pt-8 text-center text-white/60">
              <p>&copy; 2024 SupportAI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App